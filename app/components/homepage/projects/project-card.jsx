// @flow strict
import * as React from 'react';

function ProjectCard({ project }) {
  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-2xl border bg-gradient-to-r to-[#0a0d37] w-full h-full flex flex-col">

      {/* top gradient lines */}
      <div className="flex flex-row flex-shrink-0">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600" />
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent" />
      </div>

      {/* title bar */}
      <div className="px-4 lg:px-7 py-3 relative flex-shrink-0">
        <div className="flex flex-row space-x-1.5 absolute top-1/2 -translate-y-1/2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-orange-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-300" />
        </div>
        <p className="text-center text-[#16f2b3] text-sm lg:text-base font-bold tracking-wider truncate ml-10">
          {project.name}
        </p>
      </div>

      {/* code block — scrollable so card never clips */}
      <div className="overflow-y-auto overflow-x-hidden border-t-[2px] border-indigo-900 px-4 lg:px-7 py-5 flex-1
        [&::-webkit-scrollbar]:w-[3px]
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-violet-700/40
        [&::-webkit-scrollbar-thumb]:rounded-full">
        <code className="font-mono text-[11px] md:text-xs lg:text-sm leading-relaxed">
          <div>
            <span className="text-pink-500">const </span>
            <span className="text-white">project </span>
            <span className="text-pink-500">= </span>
            <span className="text-gray-400">{'{'}</span>
          </div>

          <div className="pl-4 lg:pl-6">
            <span className="text-white">name: </span>
            <span className="text-gray-400">'</span>
            <span className="text-amber-300">{project.name}</span>
            <span className="text-gray-400">',</span>
          </div>

          <div className="pl-4 lg:pl-6">
            <span className="text-white">tools: </span>
            <span className="text-gray-400">['</span>
            {(project.tools || []).map((tag, i) => (
              <React.Fragment key={i}>
                <span className="text-amber-300">{tag}</span>
                {i < project.tools.length - 1 && <span className="text-gray-400">',&nbsp;'</span>}
              </React.Fragment>
            ))}
            <span className="text-gray-400">'],</span>
          </div>

          {project.role && (
            <div className="pl-4 lg:pl-6">
              <span className="text-white">myRole: </span>
              <span className="text-orange-400">'{project.role}'</span>
              <span className="text-gray-400">,</span>
            </div>
          )}

          <div className="pl-4 lg:pl-6">
            <span className="text-white">description: </span>
            <span className="text-cyan-400">'{project.description}'</span>
            <span className="text-gray-400">,</span>
          </div>

          {project.demo && (
            <div className="pl-4 lg:pl-6">
              <span className="text-white">demo: </span>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-[#16f2b3] hover:underline break-all"
              >
                '{project.demo}'
              </a>
              <span className="text-gray-400">,</span>
            </div>
          )}

          {project.code && (
            <div className="pl-4 lg:pl-6">
              <span className="text-white">github: </span>
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-violet-400 hover:underline break-all"
              >
                '{project.code}'
              </a>
              <span className="text-gray-400">,</span>
            </div>
          )}

          <div><span className="text-gray-400">{'};'}</span></div>
        </code>
      </div>
    </div>
  );
}

export default ProjectCard;