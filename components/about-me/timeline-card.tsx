"use client"
import { IconType } from "react-icons/lib";
import { SkillBadge } from "../skills/skill-badge";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface TimelineCardProps {
    data: {
        title : string
        period : string
        link : string
        place : string
        description : string
        skills? : {name : string, description : string, icon : IconType}[]
    }
}

export const TimelineCard: React.FC<TimelineCardProps> = ( { data }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return  <motion.div 
        className="flex flex-col hover:text-background hover:bg-primary px-4 py-2 rounded-lg transition-colors"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
        <div className="flex justify-between">
            <p>{data.title}</p>
            <p className="font-semibold">{data.period}</p>
        </div>
        <div className="flex justify-between">
            <a href={data.link} className="italic hover:cursor-pointer">{"@" + data.place}</a>
            {data.skills && <div className="flex flex-row gap-2 flex-wrap">
                {data.skills.map((skill, index) => {
                    return <SkillBadge
                    key={index}
                    name={skill.name}
                    description={skill.description}
                    icon={skill.icon}
                    compact={true}
                    />
                })}
            </div>}
        </div>
        
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30,
                        opacity: { duration: 0.2 }
                    }}
                    className="overflow-hidden"
                >
                    <Separator className="mb-3 bg-background" />
                    <p className="text-sm leading-relaxed">{data.description}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
}