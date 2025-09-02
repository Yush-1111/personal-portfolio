import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Award } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-center"
        >
          About Me
        </motion.h2>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-6 text-lg text-slate-300 text-center max-w-3xl mx-auto"
        >
          I am a passionate <span className="text-primary">Full-Stack Web Developer </span> 
          with expertise in building modern web applications. I enjoy developing website and 
           , creating smooth user experiences, and learning new 
          technologies to stay ahead in the industry.
        </motion.p>

        {/* Sections Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {/* Experience */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 p-6 rounded-2xl shadow-lg"
          >
            <Briefcase className="w-10 h-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Experience</h3>
            <p className="mt-2 text-slate-300">
              3+ years of experience in full stack web development, 
              .
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 p-6 rounded-2xl shadow-lg"
          >
            <Code className="w-10 h-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Skills</h3>
            <p className="mt-2 text-slate-300">
              JavaScript, React, Node.js, MongoDB, Express, 
              Tailwind CSS, Threejs git github,and many more.
            </p>
          </motion.div>

          {/* Achievements */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 p-6 rounded-2xl shadow-lg"
          >
            <Award className="w-10 h-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Achievements</h3>
            <p className="mt-2 text-slate-300">
              Completed 10+ projects, open-source contributions, 
    
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center">Journey</h3>
          <div className="mt-8 relative border-l border-slate-700">
            {/* Timeline Item */}
            <div className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full"></span>
              <h4 className="text-lg font-bold">2025 - Prasent</h4>
              <p className="text-slate-300">
                Working as a Full-Stack Web Developer, creating scalable apps.
              </p>
            </div>
            <div className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full"></span>
              <h4 className="text-lg font-bold">2019 - 2023</h4>
              <p className="text-slate-300">
                (B-tech) Completed degree in (Information Technology) from RGVP University Bhopal (M.P) and contributed to 
                open-source projects.
              </p>
              <br/>
              <p className="text-slate-300">CGPA-8.02</p>
              <p className="text-slate-300">
                This is my personal contact details email id - ayushfareliyartm@gmail.com contact no - 6268127687
        
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
