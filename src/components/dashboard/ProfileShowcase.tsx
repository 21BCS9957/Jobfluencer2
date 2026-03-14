'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, MapPin, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'
import { AnimatedButton } from './AnimatedButton'

const skills = ['React.js', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'Docker', 'GraphQL', 'Next.js']

const portfolio = [
  { title: 'E-commerce Platform', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop' },
  { title: 'Mobile Banking App', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop' },
  { title: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
]

export function ProfileShowcase() {
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
        My Profile
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1">
          <GlassCard className="sticky top-24">
            {/* Profile Photo */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-32 h-32 mx-auto mb-4"
            >
              <img 
                src="https://api.dicebear.com/7.x/lorelei/svg?seed=Kanika" 
                alt="Profile" 
                className="w-full h-full rounded-full ring-4 ring-indigo-500/50"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-2 right-2 w-4 h-4 bg-[#22c55e] rounded-full ring-4 ring-black"
              />
            </motion.div>

            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-1">Kanika</h3>
              <p className="text-gray-400 text-sm mb-3">Full-Stack Developer & UI/UX Designer</p>
              
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  </motion.div>
                ))}
                <span className="ml-2 text-sm text-gray-400">(4.9)</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>

              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-2xl font-bold text-[#22c55e] mb-2"
              >
                $85/hr
              </motion.div>
              
              <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                Open to Work
              </span>
            </div>

            <AnimatedButton variant="outline" fullWidth>
              Edit Profile
            </AnimatedButton>
          </GlassCard>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <GlassCard delay={0.1}>
            <h3 className="text-xl font-semibold mb-4">About Me</h3>
            <p className="text-gray-300 leading-relaxed">
              Passionate full-stack developer with 5+ years of experience building scalable web applications. 
              Specialized in React, Node.js, and cloud architecture. I love turning complex problems into 
              simple, beautiful, and intuitive solutions. Always eager to learn new technologies and best practices.
            </p>
          </GlassCard>

          {/* Skills */}
          <GlassCard delay={0.2}>
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-sm font-medium hover:border-indigo-500/40 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </GlassCard>

          {/* Portfolio */}
          <GlassCard delay={0.3}>
            <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {portfolio.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Certifications */}
          <GlassCard delay={0.4}>
            <h3 className="text-xl font-semibold mb-4">Certifications</h3>
            <div className="space-y-3">
              {['AWS Certified Solutions Architect', 'Google Cloud Professional', 'Meta React Developer'].map((cert, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Award className="w-5 h-5 text-[#f59e0b]" />
                  <span className="text-sm">{cert}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
