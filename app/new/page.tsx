import { GradientCanvas } from "@/components/ui/gradient-canvas";
import { Separator } from "@/components/ui/separator";

function NavigationContent() {
  return (
    <div className="flex flex-col mt-8 gap-4 mx-4 md:mx-8">
      <div>
        <div className="text-3xl md:text-5xl xl:text-7xl font-semibold">
          <span>{"Hi, I'm "}</span>
          <span className="hover:italic">{"Tobias"}</span>
        </div>
        <div className="text-2xl md:text-3xl xl:text-5xl font-regular">
          <p>{"CS Student & AI/ML Engineer"}</p> 
          {/* <p>{"I write code, take photos and build things."}</p> */}
        </div>
      </div>
      <Separator className="bg-foreground"/>
      {/* Navigation links */}
      <div className="flex flex-col md:flex-row flex-wrap gap-2 justify-between text-xl xl:text-2xl font-regular">
        <a className="hover:underline" href="projects">
          Projects
        </a>
        <a className="hover:underline" href="gallery">
          Image Gallery
        </a>
        <a className="hover:underline" href="skills">
          Skills
        </a>
        <a className="hover:underline" href="about-me">
          About me
        </a>
        <div className="flex">
          <a className="hover:underline" href="https://www.github.com/tobiaslborning">
            {"Github "}
          </a>
          <span>{"/"}</span>
          <a className="hover:underline" href="https://www.linkedin.com/in/tobias-borning">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="h-screen overflow-hidden"> 
      <NavigationContent />
      <div className="
        animate-fade-in-5s mt-4 mx-4 md:mx-8 mb-8 overflow-hidden rounded-2xl block 
        xl:h-[calc(100vh-theme(spacing.4)-theme(spacing.8)-216px)]
        md:h-[calc(100vh-theme(spacing.4)-theme(spacing.8)-174px)]
      ">
        <GradientCanvas 
          containerClassName="w-full h-full"
        />
      </div>
    </main>
  )
}

