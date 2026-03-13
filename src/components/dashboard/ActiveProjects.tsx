'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'

const projects = {
  inProgress: [
    { name: 'E-commerce Website Redesign', client: 'ShopMart', deadline: '2026-03-20', progress: 65 },
    { name: 'Mobile Banking App', client: 'FinTech Pro', deadline: '2026-03-25', progress: 40 },
  ],
  underReview: [
    { name: 'CRM Dashboard', client: 'SalesCo', deadline: '2026-03-15', progress: 100 },
  ],
  completed: [
    { name: 'Portfolio Website', client: 'John Doe', deadline: '2026-03-10', progress: 100 },
    { name: 'Logo Design', client: 'BrandNew', deadline: '2026-03-08', progress: 100 },
  ],
}

export function ActiveProjects() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const renderProjectCard = (project: any, status: string, cardIndex: number) => {
    const statusColors = {
      inProgress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      underReview: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    }

    const statusLabels = {
      inProgress: 'In Progress',
      underReview: 'Under Review',
      completed: 'Completed',
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: cardIndex * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <GlassCard className="h-full">
          <h4 className="font-semibold mb-2 text-white">{project.name}</h4>
          <p className="text-sm text-gray-400 mb-3">{project.client}</p>
          
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Calendar className="w-3 h-3" />
            <span>{project.deadline}</span>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="text-[var(--brand-primary)] font-medium">{project.progress}%</span>
            </div>
            <div className="w-full bg-[#361F27] rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ delay: cardIndex * 0.1 + 0.3, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full"
              />
            </div>
          </div>

          <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${statusColors[status as keyof typeof statusColors]}`}>
            {statusLabels[status as keyof typeof statusLabels]}
          </span>
        </GlassCard>
      </motion.div>
    )
  }

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
        My Active Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* In Progress */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg font-semibold mb-4 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            In Progress
          </motion.h3>
          <div className="space-y-4">
            {projects.inProgress.map((project, i) => (
              <div key={i}>{renderProjectCard(project, 'inProgress', i)}</div>
            ))}
          </div>
        </div>

        {/* Under Review */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg font-semibold mb-4 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            Under Review
          </motion.h3>
          <div className="space-y-4">
            {projects.underReview.map((project, i) => (
              <div key={i}>{renderProjectCard(project, 'underReview', i + 2)}</div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold mb-4 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Completed
          </motion.h3>
          <div className="space-y-4">
            {projects.completed.map((project, i) => (
              <div key={i}>{renderProjectCard(project, 'completed', i + 3)}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
