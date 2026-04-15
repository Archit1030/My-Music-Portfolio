import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Headphones, Sparkles, TrendingUp } from 'lucide-react';
import { aboutData } from '../mock';

const StatCard = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group w-48"
  >
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 group-hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          {stat.value}
        </div>
        <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
      </div>
    </div>
  </motion.div>
);

const SkillTag = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="inline-block"
  >
    <div className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-500/50 rounded-full text-sm text-gray-300 hover:text-cyan-400 transition-all duration-300 interactive cursor-default">
      {skill}
    </div>
  </motion.div>
);

const AboutSection = () => {
  return (
    <section className="relative min-h-screen py-24 px-6 bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-orange-400 font-semibold tracking-wider">ABOUT ME</span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          >
            {aboutData.tagline}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {aboutData.bio}
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {aboutData.stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            Skills & Expertise
          </h3>
          <div className="flex flex-wrap gap-3">
            {aboutData.skills.map((skill, index) => (
              <SkillTag key={index} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 group hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3">Music Production</h4>
            <p className="text-gray-400 leading-relaxed">
              Crafting unique sonic experiences through electronic and hip-hop production. From deep basslines to intricate sound design, every track tells a story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 group hover:border-orange-500/50 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3">Creative Development</h4>
            <p className="text-gray-400 leading-relaxed">
              Building immersive web experiences that blend audio, visuals, and interaction. Pushing the limits of what's possible in the browser.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
