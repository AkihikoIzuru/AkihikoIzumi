import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/aurora-background";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-background/80 transition-colors duration-500">
      <AuroraBackground />
      <div className="relative z-10">
        <main className="container mx-auto px-4">
          <section className="flex flex-col items-center justify-center py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 transition-colors duration-300">
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AkihikoIzumi
              </span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mb-8 transition-colors duration-300">
              Lazy Dev.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="border-foreground/20 text-foreground hover:bg-foreground/10 transition-colors duration-300"
              >
                View My Work
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90">
                Get in Touch
              </Button>
            </div>
          </section>

          <section id="projects" className="py-20">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center transition-colors duration-300">
              My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((project) => (
                <div
                  key={project}
                  className="bg-foreground/5 backdrop-blur-sm rounded-xl p-6 transition-all hover:bg-foreground/10 duration-300"
                >
                  <div className="h-40 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={`/project-${project}.png`} // ganti sesuai path image kamu
                      alt={`Project ${project}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 transition-colors duration-300">
                    Project {project}
                  </h3>
                  <p className="text-foreground/70 mb-4 transition-colors duration-300">
                    Website Project with NextJS
                  </p>
                  <Button
                    variant="link"
                    className="text-cyan-500 dark:text-cyan-400 p-0 h-auto font-normal transition-colors duration-300"
                  >
                    View Project →
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-20">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center transition-colors duration-300">
              Get In Touch
            </h2>
            <div className="bg-foreground/5 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-2xl mx-auto transition-colors duration-300">
              <p className="text-foreground/80 mb-6 text-center transition-colors duration-300">
                Talk with me on Discord or interested in my work on GitHub? Feel
                free to reach out through any of the platforms below.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://discord.gg/xqSecMsNVr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300"
                >
                  <MessageSquare className="h-6 w-6" />
                  <span className="sr-only">Discord</span>
                </a>
                <a
                  href="https://github.com/AkihikoIzuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-foreground transition-colors duration-300"
                >
                  <GithubIcon className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="container mx-auto px-4 py-8 border-t border-foreground/10 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm transition-colors duration-300">
              © {new Date().getFullYear()} AkihikoIzumi. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
