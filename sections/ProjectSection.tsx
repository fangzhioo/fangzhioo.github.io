import Image from "next/image";
import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

import terminalPortfolio from "public/projects/terminal-portfolio.png";
import haruFashion from "public/projects/haru-fashion.png";
import haruApi from "public/projects/haru-api.png";
import astroPaper from "public/projects/astro-paper.png";

const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for project section
  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [projectSection]);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">最近项目</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
        “没有代码，说个JJ”? <br />
        下面是是我的项目代码
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16">
        其他的项目经历在{" "}
        <a
          href="https://github.com/fangzhioo"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
        >
          我的Github主页
        </a>
      </div>
    </section>
  );
};

const projects = [
  {
    title: "项目1",
    type: "前端应用",
    image: (
      <Image
        src={terminalPortfolio}
        layout="fill"
        alt="项目1"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "项目1的描述",
    tags: ["React", "TypeScript", "Styled-Components"],
    liveUrl: "#",
    codeUrl: "#",
    bgColor: "bg-[#B4BEE0]",
  },
  {
    title: "项目2",
    type: "前端应用",
    image: (
      <Image
        src={haruFashion}
        layout="fill"
        alt="项目2"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "项目2",
    tags: ["NextJS", "TypeScript", "TailwindCSS", "ContextAPI"],
    liveUrl: "#",
    codeUrl: "#",
    bgColor: "bg-[#A6CECE]",
  },
  {
    title: "项目3",
    type: "后端应用",
    image: (
      <Image
        src={haruApi}
        layout="fill"
        alt="项目3"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "项目3",
    tags: ["ExpressJS", "TypeScript", "PostgreSQL", "Prisma"],
    liveUrl: "#",
    codeUrl: "#",
    bgColor: "bg-[#C5E4E7]",
  },
  {
    title: "项目4",
    type: "前端应用",
    image: (
      <Image
        src={astroPaper}
        layout="fill"
        alt="项目4"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "一个小巧、响应速度快、SEO友好的博客主题。这个主题写的是TypeScript和React。这个主题包括模糊搜索、分页等。",
    tags: ["TypeScript", "React", "TailwindCSS"],
    liveUrl: "#",
    codeUrl: "#",
    bgColor: "bg-[#9FD0E3]",
  },
];

export default ProjectSection;
