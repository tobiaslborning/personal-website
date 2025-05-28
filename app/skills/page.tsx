import { SkillBadge } from "@/components/skills/skill-badge";
import { Separator } from "@/components/ui/separator";
import { 
    FaDocker, 
    FaReact,  
    FaGitAlt, 
    FaJava,
    FaGithub,
    FaGitlab,
} from "react-icons/fa6";
import { 
    SiTypescript, 
    SiPostgresql, 
    SiTailwindcss,
    SiNextdotjs,
    SiPytorch,
    SiLangchain,
    SiScikitlearn,
    SiTensorflow,
    SiFastapi,
    SiDjango,
    SiSpringboot,
    SiFirebase,
    SiSqlite,
    SiApachemaven,
    SiPython,
    SiFigma,
    SiAdobepremierepro,
    SiAdobephotoshop,
    SiAdobelightroom,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { BiSolidPiano } from "react-icons/bi";

export default function Page() {

    const programming_languages = [
        {
            name: "TypeScript",
            description: "Type-safe JavaScript development",
            icon: SiTypescript
        },
        {
            name: "Python",
            description: "Backend development, scripting and AI/ML",
            icon: SiPython
        },
        {
            name: "Java",
            description: "Enterprise application development",
            icon: FaJava
        }
    ];

    const web_dev = [
        {
            name: "Next.js",
            description: "Full-stack React framework",
            icon: SiNextdotjs
        },
        {
            name: "React",
            description: "Component-based UI development",
            icon: FaReact
        },
        {
            name: "Tailwind CSS",
            description: "Utility-first CSS framework",
            icon: SiTailwindcss
        },
        {
            name: "FastAPI",
            description: "Modern Python web framework",
            icon: SiFastapi
        },
        {
            name: "Django",
            description: "Python web framework",
            icon: SiDjango
        },
        {
            name: "Spring Boot",
            description: "Java application framework",
            icon: SiSpringboot
        },
        {
            name: "PostgreSQL",
            description: "Relational database management",
            icon: SiPostgresql
        },
        {
            name: "Firebase",
            description: "Backend-as-a-Service platform",
            icon: SiFirebase
        },
        {
            name: "SQLite",
            description: "Lightweight database engine",
            icon: SiSqlite
        }
    ];

    const ai_ml = [
        {
            name: "PyTorch",
            description: "",
            icon: SiPytorch
        },
        {
            name: "TensorFlow",
            description: "Machine learning platform",
            icon: SiTensorflow
        },
        {
            name: "scikit-learn",
            description: "Machine learning library",
            icon: SiScikitlearn
        },
        {
            name: "LangChain",
            description: "LLM application framework",
            icon: SiLangchain
        }
    ];

    const dev_tools = [
        {
            name: "Docker",
            description: "Containerization platform",
            icon: FaDocker
        },
        {
            name: "Azure",
            description: "Cloud services",
            icon: VscAzure
        },
        {
            name: "Git",
            description: "Version control system",
            icon: FaGitAlt
        },
        {
            name: "GitHub",
            description: "Code hosting and collaboration",
            icon: FaGithub
        },
        {
            name: "GitLab",
            description: "Code hosting and collaboration",
            icon: FaGitlab
        },
        {
            name: "Maven",
            description: "",
            icon: SiApachemaven
        },
    ];
    
    const creative_tools = [
        {
            name: "Figma",
            description: "UI/UX design and prototyping",
            icon: SiFigma
        },
        {
            name: "Premiere Pro",
            description: "Video editing and production",
            icon: SiAdobepremierepro
        },
        {
            name: "Photoshop",
            description: "Photo editing and graphic design",
            icon: SiAdobephotoshop
        },
        {
            name: "Lightroom",
            description: "Photo editing and organization",
            icon: SiAdobelightroom
        },
        {
            name: "FL Studio",
            description: "Digital audio workstation",
            icon: BiSolidPiano
        },
    ];


    return (
        <main className="flex flex-col gap-8 mt-8 mx-4 lg:mx-8 mb-16">
        <div>
            <div className="text-3xl md:text-5xl xl:text-7xl font-semibold">
            <span>{"Skills"}</span>
            </div>
            <div className="text-xl md:text-2xl xl:text-4xl  font-regular">
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <Separator className="bg-foreground"/>
            <a className="hover:italic text-md md:text-xl xl:text-2xl w-fit pr-2" href="/">{"< Back"}</a>
            <Separator className="bg-foreground"/>
        </div>
        {/* PROGRAMMING LANGUAGES */}
        <h2 className="text-xl md:text-2xl xl:text-4xl font-regular">Programming Languages</h2>
        <div className="flex flex-row gap-2 flex-wrap">
        {programming_languages.map((skill, index) => {
            return <SkillBadge
            key={index}
            name={skill.name}
            description={skill.description}
            icon={skill.icon}
            />
        })}
        </div>
        <Separator className="bg-foreground"/>
        {/* Web dev */}
        <h2 className="text-xl md:text-2xl xl:text-4xl font-regular">Web dev</h2>
        <div className="flex flex-row gap-2 flex-wrap">
        {web_dev.map((skill, index) => {
            return <SkillBadge
            key={index}
            name={skill.name}
            description={skill.description}
            icon={skill.icon}
            />
        })}
        </div>
        <Separator className="bg-foreground"/>
        {/* AI & ML */}
        <h2 className="text-xl md:text-2xl xl:text-4xl font-regular">AI & ML</h2>
        <div className="flex flex-row gap-2 flex-wrap">
        {ai_ml.map((skill, index) => {
            return <SkillBadge
            key={index}
            name={skill.name}
            description={skill.description}
            icon={skill.icon}
            />
        })}
        </div>
        <Separator className="bg-foreground"/>
        {/* Dev tools */}
        <h2 className="text-xl md:text-2xl xl:text-4xl font-regular">Dev tools</h2>
        <div className="flex flex-row gap-2 flex-wrap">
        {dev_tools.map((skill, index) => {
            return <SkillBadge
            key={index}
            name={skill.name}
            description={skill.description}
            icon={skill.icon}
            />
        })}
        </div>
        <Separator className="bg-foreground"/>
        {/* Creative Tools */}
        <h2 className="text-xl md:text-2xl xl:text-4xl font-regular">Creative tools</h2>
        <div className="flex flex-row gap-2 flex-wrap">
        {creative_tools.map((skill, index) => {
            return <SkillBadge
            key={index}
            name={skill.name}
            description={skill.description}
            icon={skill.icon}
            />
        })}
        </div>
        </main>
    )
}