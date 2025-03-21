import { AuroraBackground } from "@/components/aurora-background";

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-b from-background to-background/80 transition-colors duration-500">
      <AuroraBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 transition-colors duration-300">
              About Me
            </h1>

            <div className="bg-foreground/5 backdrop-blur-sm rounded-xl p-6 md:p-8 transition-colors duration-300 mb-8">
              <p className="text-foreground/80 mb-6 text-lg transition-colors duration-300">
                A lazy developer, waifu enthusiast, and creative drifter
                crafting digital experiences with a focus on tech, games, and
                curiosity.
              </p>

              <p className="text-foreground/80 mb-6 text-lg transition-colors duration-300">
                I like to explore random things from tinkering with code at odd
                hours, to diving deep into anime worlds, and occasionally
                pushing pixels just to see what breaks. My work leans towards
                blending functionality with a touch of "I did this because I
                felt like it."
              </p>

              <p className="text-foreground/80 mb-6 text-lg transition-colors duration-300">
                When I'm not busy procrastinating, you'll probably find me
                messing around with new frameworks, playing games, or lost in a
                rabbit hole of creative experiments. I'm not here to change the
                world, just here to vibe and build cool stuff along the way.
              </p>

              <p className="text-foreground/80 text-lg transition-colors duration-300">
                In short, I code, I chill, I get inspired by anime waifus, and
                somehow, it all turns into quirky projects that reflect both my
                love for tech and my laid-back mindset.
              </p>
            </div>

            <div className="text-right">
              <p className="text-foreground/60 italic text-lg transition-colors duration-300">
                by AkihikoIzura
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
