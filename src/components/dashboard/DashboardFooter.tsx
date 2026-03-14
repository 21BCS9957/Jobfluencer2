'use client'

import { Github, Twitter, Linkedin, Mail, Zap, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'Find Work', href: '/browse' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Success Stories', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'API Docs', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: 'mailto:hello@jobfluencer.com' },
      { label: 'Press Kit', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  },
]

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@jobfluencer.com', label: 'Email' },
]

export function DashboardFooter() {
  return (
    <footer className="relative mt-20 rounded-t-[40px] lg:rounded-t-[80px] border-t border-x border-white/[0.08] overflow-hidden bg-[#0A0A0B]/80 backdrop-blur-3xl max-w-[1920px] mx-auto">
      
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Brand & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-8 h-8 text-white" />
              <span className="text-3xl font-semibold tracking-tight text-white">Job Fluencer</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-medium text-zinc-100 mb-4 leading-tight">
              Empowering creative professionals to build their dream careers
            </h3>
            
            <p className="text-zinc-500 text-lg mb-6 leading-relaxed">
              Connect with clients, manage projects, and grow your business on India's premier creative talent marketplace.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.04] transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap shadow-lg shadow-black/50 border border-transparent"
              >
                Subscribe
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="w-12 h-12 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.15] flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, colIdx) => (
              <motion.div
                key={colIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: colIdx * 0.1, duration: 0.6 }}
              >
                <h4 className="text-white font-medium mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300"></span>
                        </span>
                        {link.href.startsWith('http') && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.08] mb-8"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-zinc-600 font-medium">
            <span>&copy; 2026 Job Fluencer. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>Created with high-end precision.</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-600 font-medium">
            <Link href="#" className="hover:text-zinc-300 transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
