import { BackBar } from "@/components/common/back-bar";
import { BackgroundGradientHome } from "@/components/home/background-gradient-home";
import { SkillBadge } from "@/components/skills/skill-badge";
import { Separator } from "@/components/ui/separator";
import { skillsMap } from "@/lib/data/skills";
import { FaLink } from "react-icons/fa6";

const projects = [
    {
        name: "MuZero-knockoff",
        description: "Made a Python implementation of Google DeepMind's MuZero algorithm using PyTorch, featuring model-based reinforcement learning for arcade-style games. The system combines Monte Carlo Tree Search (u-MCTS) with three interconnected neural networks (representation, dynamics, and prediction) to learn optimal game strategies without prior knowledge of game rules.",
        link: "https://youtu.be/51_9J9dxlZM",
        link_text: "Link to video",
        technologies: [
            skillsMap.python,
            skillsMap.pytorch
        ]
    },
    {
        name: "SnackOverflow display",
        description: "A real-time dashboard application for tracking and displaying student kiosk purchases with an interactive leaderboard system. Built to enhance the student experience by gamifying snack purchases and providing transparent spending insights for the campus community. Features live purchase feeds, top spender rankings, and seamless integration with the Zettle API for secure payment processing. The responsive web interface creates an engaging community experience that increased student interaction with the kiosk system while providing valuable insights into purchasing patterns and popular items. Code available on my Github",
        link: "https://snack-overflow-display.web.app/info-view",
        link_text: "Link to site",
        technologies: [
            skillsMap.nextjs,
            skillsMap.typescript,
            skillsMap.tailwindcss,
            skillsMap.firebase,
            skillsMap.shadcn
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
            skillsMap.docker,
            skillsMap.shadcn
        ]
    },
    {
        name: "This portfolio",
        description: "You're looking at it. This is actually my second attempt at a portfolio, went for a more minimalistic approach this time. Still built with modern web tech, but this time i included a healthy dose of \"maybe I don't need to stack 3 animations components on top of each other\". The most recursive project in my collection.",
        link: "https://github.com/tobiaslborning/personal-website",
        link_text: "Link to Github",
        technologies: [
            skillsMap.nextjs,
            skillsMap.typescript,
            skillsMap.tailwindcss,
            skillsMap.firebase,
            skillsMap.shadcn
        ]
    },
    {
        name: "Cookbook",
        description: "My introduction to proper software development during 3rd semester. Built a simple cookbook app using Java and FXML with a Spring Boot REST API - my first time working with APIs and discovering Postman. While the app itself isn't winning any design awards, this project taught me the fundamentals that actually matter. Used Maven, JUnit for testing, and GitLab for collaboration. The real learning was developing good Git habits - meaningful commits, code reviews, merge requests, and working with others on the same codebase.",
        link: "https://github.com/TobiasBorning/Cookbook",
        link_text: "Link to Github",
        technologies: [
            skillsMap.java,
            skillsMap.springboot,
            skillsMap.gitlab,
            skillsMap.postman
        ]

    },
    {
        name: "Sudoku",
        description: "Built during 2nd semester, this Sudoku app was where I first tackled creating algorithms from scratch. The app has Standard mode (prevents invalid moves) and Advanced mode that automatically solves puzzles and highlights errors. The best part was figuring out how to solve Sudoku algorithmically without Googling existing solutions - had to think through the logic myself, which was a proper brain workout. Built with JavaFX and styled with CSS.",
        link: "https://github.com/TobiasBorning/Sudoku",
        link_text: "Link to Github",
        technologies: [
            skillsMap.java,
        ]
    },
    {
        name: "Flashcards for TDT4237 - Software Securtity and Data Privacy",
        description: "This was vibe coded in a hurry, so its more of a resource for those that want to practise :)",
        link: "/progsik",
        link_text: "Link to flashcards",
        technologies: []
    },
]

export default async function Page() {

    return (
        <main className="flex flex-col gap-4 lg:gap-8  mt-8 mx-4 lg:mx-8 mb-16">
        <div>
            <h1 className="text-3xl md:text-5xl xl:text-7xl font-semibold">{"Projects"}</h1>
        </div>
        <BackBar />
        <div className="flex justify-between flex-col lg:flex-row">
            <div className="flex flex-col gap-4 lg:gap-8 w-full lg:w-2/3 2xl:w-1/2">
            {
            projects.map((project, index) => {
            return (
                <div key={index} className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">{project.name}</h2>
                    <p className="text-sm md:text-lg xl:text-xl font-light">{project.description}</p>
                    {project.link && <a className="w-fit flex hover:underline text-sm md:text-lg xl:text-xl font-regular italic" href={project.link}>
                            {project.link_text}
                            <FaLink className="md:mt-1 ml-1 size-4 md:size-6"/>
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
                containerClassName="hidden lg:block overflow-hidden max-w-1/3 2xl:max-w-1/2 sticky rounded-b-full -translate-y-8 animate-fade-in-5s"
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