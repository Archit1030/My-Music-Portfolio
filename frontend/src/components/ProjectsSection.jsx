import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Layers } from 'lucide-react';
import { Card } from './ui/card';
import { projects } from '../mock';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-cyan-500/50 transition-all duration-500 interactive cursor-pointer">
        {/* Project Thumbnail */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6 }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Hover Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.5
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-semibold">
              {project.category}
            </div>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-gray-700 rounded-full text-xs text-gray-400">
              {project.year}
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-full text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Animated Border Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg" />
        </motion.div>
      </Card>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section className="relative min-h-screen py-24 px-6 bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-semibold tracking-wider">PORTFOLIO</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            CREATIVE PROJECTS
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experimental web experiences and interactive installations where music meets code
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-full text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 interactive cursor-pointer">
            <Code className="w-5 h-5" />
            <span>View more on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
