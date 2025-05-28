import { BackgroundGradientHome } from "@/components/home/background-gradient-home";
import { SkillBadge } from "@/components/skills/skill-badge";
import { Separator } from "@/components/ui/separator";
import { skillsMap } from "@/lib/data/skills";
import { FaLink } from "react-icons/fa6";

const projects = [
    {
        name: "MuZero-knockoff",
        description: "Made a Python implementation of Google DeepMind's MuZero algorithm using PyTorch, featuring model-based reinforcement learning for arcade-style games. The system combines Monte Carlo Tree Search (u-MCTS) with three interconnected neural networks (representation, dynamics, and prediction) to learn optimal game strategies without prior knowledge of game rules.",
        link: "/",
        link_text: "Link to video",
        technologies: [
            skillsMap.python,
            skillsMap.pytorch
        ]
    },
    {
        name: "SnackOverflow display",
        description: "A real-time dashboard application for tracking and displaying student kiosk purchases with an interactive leaderboard system. Built to enhance the student experience by gamifying snack purchases and providing transparent spending insights for the campus community. Features live purchase feeds, top spender rankings, and seamless integration with the Zettle API for secure payment processing. The responsive web interface creates an engaging community experience that increased student interaction with the kiosk system while providing valuable insights into purchasing patterns and popular items.",
        link: "https://snack-overflow-display.web.app/info-view",
        link_text: "Link to site",
        technologies: [
            skillsMap.nextjs,
            skillsMap.typescript,
            skillsMap.tailwindcss,
            skillsMap.firebase
        ]
    },
    {
        name: "Snapper Strategist AI",
        description: "Built a large-scale application from scratch as part of a small two-person dev team, collaborating closely with two product owners on the biggest project I've worked on to date. The experience taught me a lot about handling complex system integrations, making architectural decisions on the fly, and adapting to changing requirements throughout development. This project gave me invaluable hands-on experience with enterprise-level development, working in a small team environment, and building systems that actually need to scale and perform in the real world. Im not able to disclose too much information about the project. ",
        link: undefined,
        link_text: "Link to site",
        technologies: [
            skillsMap.nextjs,
            skillsMap.typescript,
            skillsMap.tailwindcss,
            skillsMap.python,
            skillsMap.fastapi,
            skillsMap.postgresql,
            skillsMap.langchain,
            skillsMap.azure,
            skillsMap.docker
        ]
    }
]

export default async function Page() {

    return (
        <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8 mb-16">
        <div>
            <div className="text-3xl md:text-5xl xl:text-7xl font-semibold">
            <span>{"Projects"}</span>
            </div>
            <div className="text-xl md:text-2xl xl:text-4xl  font-regular">
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <Separator className="bg-foreground"/>
            <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/">{"< Back"}</a>
            <Separator className="bg-foreground"/>
        </div>
        <div className="flex justify-between flex-col lg:flex-row">
            <div className="flex flex-col gap-8 w-full lg:w-2/3">
            {
            projects.map((project, index) => {
            return (
                <div key={index} className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-3xl xl:text-5xl font-medium">{project.name}</h2>
                    <p className="text-sm md:text-lg xl:text-xl font-light">{project.description}</p>
                    {project.link && <a className="w-fit flex hover:underline text-xl italic" href={project.link}>
                            {project.link_text}
                            <FaLink className="mt-1 ml-1"/>
                        </a>}
                    <div className="flex flex-row gap-2 flex-wrap">
                        {project.technologies.map((skill, index) => {
                            return <SkillBadge
                            key={index}
                            name={skill.name}
                            description={skill.description}
                            icon={skill.icon}
                            />
                        })}
                    </div>
                    <Separator className="bg-foreground mt-4"/>
                </div>
            )
            })
            }
            </div>
            <BackgroundGradientHome 
                containerClassName="hidden lg:block overflow-hidden max-w-1/3 sticky rounded-b-full -translate-y-8 animate-fade-in-5s"
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