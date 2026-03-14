'use client'

import { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'

const reviews = [
  {
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
    text: 'Kanika delivered exceptional work on our e-commerce platform. His attention to detail and communication throughout the project was outstanding. Highly recommended!',
    project: 'E-commerce Platform',
  },
  {
    name: 'Michael Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    rating: 5,
    text: 'Professional, skilled, and reliable. Kanika transformed our outdated website into a modern, responsive masterpiece. Will definitely work with him again.',
    project: 'Website Redesign',
  },
  {
    name: 'Emily Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    rating: 5,
    text: 'Amazing developer! Completed the mobile app ahead of schedule with clean code and great UI. His expertise in React Native is top-notch.',
    project: 'Mobile Banking App',
  },
]

export function ClientReviews() {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Trusted by creative professionals and businesses worldwide
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            <GlassCard className="h-full flex flex-col relative">
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-12 h-12 text-indigo-400" />
              </div>

              {/* Avatar & Info */}
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <motion.img 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full ring-2 ring-indigo-500/50"
                />
                <div>
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3 + i * 0.05 }}
                      >
                        <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow relative z-10">
                "{review.text}"
              </p>

              {/* Project Tag */}
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-400 font-medium">
                  {review.project}
                </span>
              </div>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
          <div className="flex -space-x-2">
            {['Sarah', 'Michael', 'Emily', 'John', 'Alex'].map((name, i) => (
              <img
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                alt={name}
                className="w-8 h-8 rounded-full ring-2 ring-black"
              />
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Trusted by 10,000+ professionals</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
              <span className="text-xs text-gray-400">4.9 average rating</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
