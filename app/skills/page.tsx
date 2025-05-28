"use server"
import { SkillBadge } from "@/components/skills/skill-badge";
import { Separator } from "@/components/ui/separator";
import { programming_languages, web_dev, ai_ml, dev_tools, creative_tools } from "@/lib/data/skills";

export default async function Page() {


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
        <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Programming Languages</h2>
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
        <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Web development</h2>
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
        <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">AI & ML</h2>
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
        <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Dev tools</h2>
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
        <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Creative tools</h2>
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