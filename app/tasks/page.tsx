import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { TaskList } from "./components/task-list"
import { TaskForm } from "./components/task-form"
import { TaskFilters } from "./components/task-filters"

export default async function TasksPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Daily Tasks</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <TaskFilters />
          <TaskList userId={session.user.id} />
        </div>

        <div>
          <div className="sticky top-24">
            <TaskForm userId={session.user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

