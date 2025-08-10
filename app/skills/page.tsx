"use client"
import { NavBarHeader } from "@/components/common/nav-bar-header";
import { PageContent } from "@/components/common/page-content";
import { SkillBadge } from "@/components/skills/skill-badge";
import { Separator } from "@/components/ui/separator";
import { programming_languages, web_dev, ai_ml, dev_tools, creative_tools } from "@/lib/data/skills";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
    const [morphing, setMorphing] = useState<boolean>(false)
    
    return (
        <main className="flex flex-col mx-4 md:mx-8 mb-16"> 
            <NavBarHeader
                selected="skills"
                setMorphing={setMorphing}
            />
            <PageContent
                morphing={morphing}
                flexDirection="col"
            >
            {/* PROGRAMMING LANGUAGES */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Programming Languages</h2>
                <div className="flex flex-row gap-2 flex-wrap mt-4">
                {programming_languages.map((skill, index) => {
                    return <SkillBadge
                    key={index}
                    name={skill.name}
                    description={skill.description}
                    icon={skill.icon}
                    />
                })}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <Separator className="bg-foreground"/>
            </motion.div>
            {/* AI & ML */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">AI & ML</h2>
                <div className="flex flex-row gap-2 flex-wrap mt-4">
                {ai_ml.map((skill, index) => {
                    return <SkillBadge
                    key={index}
                    name={skill.name}
                    description={skill.description}
                    icon={skill.icon}
                    />
                })}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <Separator className="bg-foreground"/>
            </motion.div>
            {/* Web dev */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Web development</h2>
                <div className="flex flex-row gap-2 flex-wrap mt-4">
                {web_dev.map((skill, index) => {
                    return <SkillBadge
                    key={index}
                    name={skill.name}
                    description={skill.description}
                    icon={skill.icon}
                    />
                })}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
            >
                <Separator className="bg-foreground"/>
            </motion.div>
            {/* Dev tools */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Dev tools</h2>
                <div className="flex flex-row gap-2 flex-wrap mt-4">
                {dev_tools.map((skill, index) => {
                    return <SkillBadge
                    key={index}
                    name={skill.name}
                    description={skill.description}
                    icon={skill.icon}
                    />
                })}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
            >
                <Separator className="bg-foreground"/>
            </motion.div>
            {/* Creative Tools */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
            >
                <h2 className="text-2xl md:text-3xl xl:text-5xl font-medium">Creative tools</h2>
                <div className="flex flex-row gap-2 flex-wrap mt-4">
                {creative_tools.map((skill, index) => {
                    return <SkillBadge
                    key={index}
                    name={skill.name}
                    description={skill.description}
                    icon={skill.icon}
                    />
                })}
                </div>
            </motion.div>
            </PageContent>
        </main>

    )
}