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
    <footer className="relative mt-20 bg-[var(--brand-dark)] rounded-t-[40px] md:rounded-t-[56px] overflow-hidden">
      {/* Gradient border at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent"></div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--brand-primary)]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--brand-secondary)]/20 rounded-full blur-3xl"></div>

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
              <Zap className="w-8 h-8 text-[var(--brand-primary)]" />
              <span className="text-3xl font-bold text-white">Job Fluencer</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              Empowering creative professionals to build their dream careers
            </h3>
            
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Connect with clients, manage projects, and grow your business on India's premier creative talent marketplace.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-lg font-medium hover:shadow-lg hover:shadow-[var(--brand-primary)]/50 transition-all duration-300 whitespace-nowrap"
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
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-12 h-12 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--brand-primary)]/50 flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-[var(--brand-primary)] transition-colors" />
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
                <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--brand-primary)] group-hover:w-full transition-all duration-300"></span>
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
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
            <span>&copy; 2026 Job Fluencer. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span>Made with ❤️ in India</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-primary)]"></div>
    </footer>
  )
}
