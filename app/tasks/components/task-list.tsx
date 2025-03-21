"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { format, isPast, isToday } from "date-fns"
import { useSearchParams } from "next/navigation"
import { TaskDialog } from "./task-dialog"

type Task = {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  due_date: string | null
  created_at: string | null
}

export function TaskList({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const status = searchParams.get("status")
  const priority = searchParams.get("priority")
  const dateFilter = searchParams.get("date")

  const fetchTasks = async () => {
    setLoading(true)

    try {
      let query = supabase.from("tasks").select("*").eq("user_id", userId).order("due_date", { ascending: true })

      // Apply filters
      if (status && status !== "all") {
        query = query.eq("status", status)
      }

      if (priority && priority !== "all") {
        query = query.eq("priority", priority)
      }

      if (dateFilter) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (dateFilter === "today") {
          query = query.gte("due_date", today.toISOString()).lt("due_date", tomorrow.toISOString())
        } else if (dateFilter === "overdue") {
          query = query.lt("due_date", today.toISOString()).not("status", "eq", "completed")
        }
      }

      const { data, error } = await query

      if (error) {
        throw error
      }

      setTasks(data || [])
    } catch (error: any) {
      toast({
        title: "Error fetching tasks",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()

    // Set up realtime subscription
    const channel = supabase
      .channel("tasks_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchTasks()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, status, priority, dateFilter])

  const updateTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed"

    try {
      const { error } = await supabase
        .from("tasks")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (error) {
        throw error
      }

      // Optimistic update
      setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)))

      toast({
        title: `Task ${newStatus === "completed" ? "completed" : "marked as pending"}`,
        description: "Task status updated successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id)

      if (error) {
        throw error
      }

      // Optimistic update
      setTasks(tasks.filter((task) => task.id !== id))

      toast({
        title: "Task deleted",
        description: "Task has been removed successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (task: Task) => {
    setEditTask(task)
    setIsDialogOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 hover:bg-red-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No tasks found. Create a new task to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task) => {
          const dueDate = task.due_date ? new Date(task.due_date) : null
          const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate) && task.status !== "completed"

          return (
            <Card key={task.id} className={`transition-colors ${task.status === "completed" ? "bg-muted/50" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={task.status === "completed"}
                    onCheckedChange={() => updateTaskStatus(task.id, task.status)}
                    className="mt-1"
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                      >
                        {task.title}
                      </h3>

                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>
                    </div>

                    {task.description && (
                      <p className={`text-sm ${task.status === "completed" ? "text-muted-foreground" : ""}`}>
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      {dueDate && (
                        <div
                          className={`flex items-center text-xs gap-1 ${
                            isOverdue ? "text-red-500" : "text-muted-foreground"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          <span>
                            {isToday(dueDate) ? "Today" : format(dueDate, "PPP")} at {format(dueDate, "p")}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(task)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={editTask}
        userId={userId}
        onSuccess={() => {
          setEditTask(null)
          fetchTasks()
        }}
      />
    </>
  )
}

