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
    SiPostman,
    SiShadcnui,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { BiSolidPiano } from "react-icons/bi";

export const programming_languages = [
   {
       name: "TypeScript",
       description: "Statically typed superset of JavaScript that enhances code reliability and developer productivity. Provides excellent IntelliSense, compile-time error checking, and improved refactoring capabilities for large-scale applications.",
       icon: SiTypescript
   },
   {
       name: "Python",
       description: "Versatile, high-level programming language ideal for backend development, automation, data analysis, and AI/ML projects. Known for its clean syntax, extensive library ecosystem, and rapid development capabilities.",
       icon: SiPython
   },
   {
       name: "Java",
       description: "Robust, object-oriented programming language widely used for enterprise applications, Android development, and large-scale systems. Offers platform independence, strong memory management, and excellent performance.",
       icon: FaJava
   }
];

export const web_dev = [
   {
       name: "Next.js",
       description: "React-based full-stack framework featuring server-side rendering, static site generation, and API routes. Provides excellent performance optimization, SEO capabilities, and seamless deployment solutions.",
       icon: SiNextdotjs
   },
   {
       name: "React",
       description: "Component-based JavaScript library for building interactive user interfaces. Features virtual DOM, hooks, and a rich ecosystem of tools for creating scalable, maintainable web applications.",
       icon: FaReact
   },
   {
       name: "Tailwind CSS",
       description: "Utility-first CSS framework that enables rapid UI development through pre-built classes. Promotes consistent design systems, responsive layouts, and highly customizable styling without writing custom CSS.",
       icon: SiTailwindcss
   },
   {
       name: "FastAPI",
       description: "Modern, high-performance Python web framework for building APIs with automatic interactive documentation. Features type hints, async support, and excellent developer experience for rapid API development.",
       icon: SiFastapi
   },
   {
       name: "Django",
       description: "High-level Python web framework that follows the model-view-template pattern. Includes built-in admin interface, ORM, authentication, and security features for rapid web application development.",
       icon: SiDjango
   },
   {
       name: "Spring Boot",
       description: "Opinionated Java framework that simplifies enterprise application development. Provides auto-configuration, embedded servers, and production-ready features like metrics, health checks, and externalized configuration.",
       icon: SiSpringboot
   },
   {
       name: "PostgreSQL",
       description: "Advanced open-source relational database with strong ACID compliance, JSON support, and extensibility. Offers powerful querying capabilities, full-text search, and excellent performance for complex applications.",
       icon: SiPostgresql
   },
   {
       name: "Firebase",
       description: "Google's Backend-as-a-Service platform providing real-time databases, authentication, hosting, and cloud functions. Enables rapid application development with seamless scaling and comprehensive analytics.",
       icon: SiFirebase
   },
   {
       name: "SQLite",
       description: "Self-contained, serverless SQL database engine perfect for embedded applications and development. Offers ACID transactions, zero-configuration setup, and cross-platform compatibility in a single file.",
       icon: SiSqlite
   },
   {
       name: "shadcn/ui",
       description: "This isnt really a skill, but i love using this library<3",
       icon: SiShadcnui
   }
];

export const ai_ml = [
   {
       name: "PyTorch",
       description: "Dynamic deep learning framework with intuitive Python interface and eager execution. Provides flexible neural network building, automatic differentiation, and excellent support for research and production deployment.",
       icon: SiPytorch
   },
   {
       name: "TensorFlow",
       description: "Comprehensive machine learning platform for building and deploying ML models at scale. Features high-level APIs, distributed training capabilities, and deployment options across mobile, web, and edge devices.",
       icon: SiTensorflow
   },
   {
       name: "scikit-learn",
       description: "User-friendly machine learning library built on NumPy and SciPy. Provides efficient implementations of classification, regression, clustering, and dimensionality reduction algorithms with consistent APIs.",
       icon: SiScikitlearn
   },
   {
       name: "LangChain",
       description: "Framework for developing applications powered by large language models. Simplifies LLM integration, provides prompt management, memory systems, and tools for building complex AI-powered applications.",
       icon: SiLangchain
   }
];

export const dev_tools = [
   {
       name: "Docker",
       description: "Containerization platform that packages applications with their dependencies into portable containers. Ensures consistent environments across development, testing, and production while simplifying deployment and scaling.",
       icon: FaDocker
   },
   {
       name: "Azure",
       description: "Microsoft's comprehensive cloud computing platform offering IaaS, PaaS, and SaaS solutions. Provides virtual machines, databases, AI services, and DevOps tools for scalable application development and deployment.",
       icon: VscAzure
   },
   {
       name: "Git",
       description: "Distributed version control system for tracking code changes and collaboration. Features branching, merging, and distributed workflows that enable multiple developers to work efficiently on shared codebases.",
       icon: FaGitAlt
   },
   {
       name: "GitHub",
       description: "Web-based Git repository hosting service with collaboration features, issue tracking, and CI/CD workflows. Provides code review tools, project management, and integration with development tools and services.",
       icon: FaGithub
   },
   {
       name: "GitLab",
       description: "Complete DevOps platform combining Git repository management with CI/CD pipelines, issue tracking, and deployment tools. Offers both cloud-hosted and self-managed solutions for end-to-end development workflows.",
       icon: FaGitlab
   },
   {
       name: "Maven",
       description: "Build automation and dependency management tool for Java projects. Provides standardized project structure, lifecycle management, and plugin ecosystem for compiling, testing, and packaging applications.",
       icon: SiApachemaven
   },
   {
       name: "Postman",
       description: "API development and testing platform that simplifies building, testing, and documenting REST APIs. Provides intuitive interface for sending HTTP requests, organizing collections, and collaborating on API development.",
       icon: SiPostman
   },
];

export const creative_tools = [
   {
       name: "Figma",
       description: "Collaborative interface design tool for creating user interfaces, prototypes, and design systems. Features real-time collaboration, component libraries, and developer handoff tools for streamlined design-to-development workflows.",
       icon: SiFigma
   },
   {
       name: "Premiere Pro",
       description: "Professional video editing software for creating films, TV shows, and web content. Offers advanced editing tools, color grading, audio mixing, and integration with other Adobe Creative Suite applications.",
       icon: SiAdobepremierepro
   },
   {
       name: "Photoshop",
       description: "Industry-standard raster graphics editor for photo manipulation, digital art, and graphic design. Provides advanced selection tools, layer-based editing, and extensive filter and effect libraries.",
       icon: SiAdobephotoshop
   },
   {
       name: "Lightroom",
       description: "Photo editing and organization software designed for photographers and digital artists. Features non-destructive editing, batch processing, and cloud synchronization for managing large photo libraries.",
       icon: SiAdobelightroom
   },
   {
       name: "FL Studio",
       description: "Digital audio workstation for music production, recording, and composition. Offers lifetime free updates, step sequencer, piano roll, and extensive plugin support for creating professional music tracks.",
       icon: BiSolidPiano
   },
];

// Export individual skills for easy lookup
export const skillsMap = {
  // Programming Languages
  typescript: programming_languages[0],
  python: programming_languages[1], 
  java: programming_languages[2],
  
  // Web Dev
  nextjs: web_dev[0],
  react: web_dev[1],
  tailwindcss: web_dev[2],
  fastapi: web_dev[3],
  django: web_dev[4],
  springboot: web_dev[5],
  postgresql: web_dev[6],
  firebase: web_dev[7],
  sqlite: web_dev[8],
  shadcn: web_dev[9],
  
  // AI/ML
  pytorch: ai_ml[0],
  tensorflow: ai_ml[1],
  scikitlearn: ai_ml[2],
  langchain: ai_ml[3],
  
  // Dev Tools
  docker: dev_tools[0],
  azure: dev_tools[1],
  git: dev_tools[2],
  github: dev_tools[3],
  gitlab: dev_tools[4],
  maven: dev_tools[5],
  postman: dev_tools[6],
  
  // Creative Tools
  figma: creative_tools[0],
  premierepro: creative_tools[1],
  photoshop: creative_tools[2],
  lightroom: creative_tools[3],
  flstudio: creative_tools[4],
};