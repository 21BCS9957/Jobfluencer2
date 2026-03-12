'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface WorkflowStep {
  badge: string
  category: string
  title: string
  description: string
  bottomText: string
}

const steps: WorkflowStep[] = [
  {
    badge: '01',
    category: 'DISCOVERY',
    title: 'Find the right talent',
    description: 'Browse categories, review portfolios, and shortlist freelancers that match your project, style, and budget.',
    bottomText: 'Category-first discovery',
  },
  {
    badge: '02',
    category: 'SCOPE',
    title: 'Chat and close the deal',
    description: 'Discuss deliverables, pricing, timeline, and expectations with the freelancer before confirming the project.',
    bottomText: 'Clear deal alignment before work starts',
  },
  {
    badge: '03',
    category: 'PROTECTION',
    title: 'Pay safely through Job Fluencer',
    description: 'Project payments stay protected on Job Fluencer and are released only after the work is marked completed.',
    bottomText: 'Protected payment hold until completion',
  },
  {
    badge: '04',
    category: 'DELIVERY',
    title: 'Manage work in one place',
    description: 'Keep project conversations and freelance work in one place instead of juggling personal WhatsApp threads.',
    bottomText: 'One workspace for ongoing freelance work',
  },
]

const featureTags = [
  { text: 'Relationship manager support', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { text: 'Pan-India freelancers', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { text: 'End-to-end workflow', color: 'bg-green-50 text-green-700 border-green-200' },
]

function WorkflowCard({ step, index }: { step: WorkflowStep; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* Step Badge */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold text-sm mb-4">
          {step.badge}
        </div>

        {/* Category Label */}
        <div className="text-xs font-semibold text-orange-600 tracking-wider mb-2 uppercase">
          {step.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
          {step.description}
        </p>

        {/* Bottom Text */}
        <div className="text-xs text-slate-500 font-medium pt-3 border-t border-gray-100">
          {step.bottomText}
        </div>
      </div>

      {/* Connector Line - Desktop Only */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-12 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-10" />
      )}
    </motion.div>
  )
}

export function WorkflowSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.05),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Title with Highlights */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            From{' '}
            <span className="relative inline-block">
              <span className="relative z-10">first message</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 blur-xl opacity-40 -z-10 scale-110" />
            </span>{' '}
            to{' '}
            <span className="relative inline-block">
              <span className="relative z-10">final delivery</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 blur-xl opacity-40 -z-10 scale-110" />
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Job Fluencer helps you manage discovery, deal closure, protected payments, and project communication in one place.
          </p>
        </motion.div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-12">
          {steps.map((step, index) => (
            <WorkflowCard key={step.badge} step={step} index={index} />
          ))}
        </div>

        {/* Feature Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {featureTags.map((tag, index) => (
            <div
              key={index}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 ${tag.color}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {tag.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
