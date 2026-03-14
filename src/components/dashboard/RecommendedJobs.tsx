'use client'

import { useState, useEffect, useRef } from 'react'
import { DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { AnimatedButton } from './AnimatedButton'

const jobs = [
  {
    title: 'Full-Stack Developer for SaaS Platform',
    client: 'TechCorp Inc.',
    budget: '$5,000 - $8,000',
    type: 'Fixed',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'Mobile App UI/UX Designer',
    client: 'StartupXYZ',
    budget: '$45/hr',
    type: 'Hourly',
    skills: ['Figma', 'UI Design', 'Mobile Design', 'Prototyping'],
  },
  {
    title: 'AI/ML Engineer for Data Pipeline',
    client: 'DataFlow Solutions',
    budget: '$8,000 - $12,000',
    type: 'Fixed',
    skills: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
  },
]

export function RecommendedJobs() {
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-8"
      >
        Jobs Matched For You
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton Loader
          Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard hover={false}>
                <div className="h-6 bg-white/10 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-1/2 mb-6 animate-pulse"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-white/10 rounded w-16 animate-pulse"></div>
                  <div className="h-6 bg-white/10 rounded w-16 animate-pulse"></div>
                </div>
                <div className="h-10 bg-white/10 rounded animate-pulse"></div>
              </GlassCard>
            </motion.div>
          ))
        ) : (
          jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <GlassCard className="h-full" fullHeight={true}>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors text-white">
                  {job.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{job.client}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-[#22c55e]">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">{job.budget}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold border backdrop-blur-md ${
                    job.type === 'Fixed' 
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }`}>
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="px-2 py-1 bg-white/[0.04] rounded text-xs text-zinc-400 border border-white/[0.08] hover:border-indigo-500/50 hover:text-zinc-200 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="mt-auto">
                  <AnimatedButton variant="primary" fullWidth>
                    Place Bid
                  </AnimatedButton>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </div>
    </section>
  )
}
