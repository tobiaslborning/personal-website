"use client"
import { BackBar } from "@/components/common/back-bar";
import { BackgroundGradientHome } from "@/components/home/background-gradient-home";
import { Separator } from "@/components/ui/separator";
import { TimelineCard } from "@/components/about-me/timeline-card";
import { skillsMap } from "@/lib/data/skills";

const timelinedata = [
    {
      title: "M.Sc Computer Science",
      place: "NTNU",
      link: "https://www.ntnu.edu/studies/mtdt",
      description: "M.Sc program covering programming fundamentals, algorithms, and operating system architecture, with specialization in artificial intelligence and machine learning. Coursework spans diverse AI topics from computer vision and natural language processing to reinforcement learning, with hands-on projects ranging from low-level system programming to advanced neural network implementations like my MuZero project.",
      period: "2022-2027",
      skills: [
        skillsMap.python,
        skillsMap.pytorch,
        skillsMap.java,
        skillsMap.maven,
        skillsMap.springboot,
        skillsMap.scikitlearn,
        skillsMap.tensorflow,
        skillsMap.xgboost,
        skillsMap.django,
        skillsMap.git,
      ]
    },
    {
      title: "Data & Analysis Intern",
      place: "Bekk",
      link: "https://www.bekk.no",
      description: "Built an AI content moderation system for Spleis, Sparebank 1’s crowdfunding platform using ensemble ML methods (XGBoost, computer vision models, LLMs). Reduced manual review workloadfrom 60% to 10%, and implemented automated training & trakcing of modles using MLflow.",
      period: "2025",
      skills: [
        skillsMap.python,
        skillsMap.xgboost,
        skillsMap.langchain,
        skillsMap.aws,
        skillsMap.docker,
        skillsMap.pydantic,
        skillsMap.mlflow,
        skillsMap.githubactions
      ]
    },
    {
      title: "Software Developer",
      place: "Snapper NET Solutions",
      link: "https://www.snapper.no",
      description: "Developed an AI-powered competence strategy builder using Next.js, FastAPI, and LangChain, learning iterative development, stakeholder communication, and AI product design. Gained experience with full-stack development patterns, from crafting user interfaces to handling asynchronous operations and cloud deployment with Docker on Azure",
      period: "2024-2025",
      skills: [
          skillsMap.nextjs,
          skillsMap.typescript,
          skillsMap.tailwindcss,
          skillsMap.python,
          skillsMap.fastapi,
          skillsMap.postgresql,
          skillsMap.langchain,
          skillsMap.azure,
          skillsMap.docker,
          skillsMap.shadcn,
          skillsMap.pydantic
      ]
    },
    {
      title: "Teaching Assistant",
      place: "NTNU",
      link: "https://www.ntnu.no/studier/studieplan#programmeCode=MTDT&year=2022",
      description: "Helped other students with both Python (TDT4109) and Java (TDT4100)",
      period: "2023-2024",
      skills: [
          skillsMap.python,
          skillsMap.java
      ]
    }
]

export default function Page() {
  return (
    <main className="flex flex-col gap-4 lg:gap-8 mt-8 mx-4 lg:mx-8">
      <div>
          <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">{"Hi, I'm still Tobias"}</h1>
          <h2 className="text-2xl md:text-3xl xl:text-5xl font-regular">{"Here is a litte bit about me"}</h2> 
      </div>
      <BackBar />
      {/* Content */}
      <div className="flex justify-between flex-col lg:flex-row">
        <div className="flex flex-col gap-4 lg:gap-8 lg:max-w-1/2 mb-16">
          {/* WORK */}
          <div className="flex w-full flex-col">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Work & Education</h2>
            <div className="mt-4 mr-2 flex flex-col gap-4 font-light text-sm md:text-lg xl:text-xl">
              {timelinedata.map((card, idx) => {
                return <div key={idx}>
                  <TimelineCard 
                    data={card}
                  />
                </div>
              })}
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Abakus */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Abakus</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
                I've been involved with <a href="https://abakus.no" className="font-medium italic hover:underline">Abakus</a> (the CS student association at NTNU) as both a member and leader of <span className="font-medium">Kontor- og Sosialkomiteen</span> where I led a team of about 18 people. 
                It's been a rewarding experience organizing social events and managing office activities for the student community. 
                Leading the committee taught me a lot about coordinating teams and creating engaging experiences for fellow students, while also being part of a larger organization that connects students with industry and each other.
              </p>
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Creative stuff */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Creative stuff</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
                I try to pick up new skills here and there, because I enjoy learning them. 
                Over the years I've gotten into <span className="font-medium">photography and editing</span>, <span className="font-medium">music production</span>, <span className="font-medium">video editing</span>, and <span className="font-medium">graphic design</span>. 
                I like how these areas overlap and connect with each other. There's something satisfying about figuring out a new tool or discovering a workflow that just clicks. I tend to dive pretty deep into whatever I'm working on.
              </p>
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Away from work */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Away from work</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
              When I'm not working or studying, you'll hopefully find me in the mountains - whether that's ski touring, freeriding, hiking, or running. 
              I actually spent two years skiing before starting university, and the mountains are still my favorite place to spend free time.
              </p>
            </div>
          </div>
          <Separator className="bg-foreground"/>
          {/* Contact */}
          <div className="flex w-full flex-col pr-8">
            <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Contact</h2>
            <div className="mt-2 font-light text-sm md:text-lg xl:text-xl">
              <p>
              Feel free to send me a mail at <a href="mailto:tobias.borning@gmail.com" className="font-semibold italic">tobias.borning@gmail.com</a>, 
              or a message on <a className="font-semibold italic" href="https://www.linkedin.com/in/tobias-borning">LinkedIn.</a>
              </p>
            </div>
          </div>
        </div>
        <BackgroundGradientHome 
          containerClassName="hidden lg:block overflow-hidden max-w-1/2 sticky -translate-y-8 rounded-b-full bg-background animate-fade-in-5s"
          firstColor="primary"
          secondColor="primary"
          thirdColor="primary" //181, 240, 177 darkmode
          pointerColor="primary"
          interactive={false}
          size="80%"
        />
      </div>
    </main>
  )
}

