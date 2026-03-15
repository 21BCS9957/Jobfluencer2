'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Zap, 
  Menu, 
  X, 
  ChevronDown,
  Home,
  Search,
  HelpCircle,
  Camera,
  Video,
  Share2,
  Scissors,
  Star,
  PenTool,
  Briefcase,
  Plus,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserMenu } from './UserMenu'
import { useAuth } from '@/hooks/useAuth'

const categories = [
  { name: 'Photography', slug: 'photography', icon: Camera },
  { name: 'Videography', slug: 'videography', icon: Video },
  { name: 'Social Media', slug: 'social_media', icon: Share2 },
  { name: 'Video Editing', slug: 'editing', icon: Scissors },
  { name: 'Influencer', slug: 'influencer', icon: Star },
  { name: 'Content Creation', slug: 'content_creation', icon: PenTool },
]

type NavbarVariant = 'default' | 'floating'

export function Navbar({ variant = 'default' }: { variant?: NavbarVariant }) {
  const pathname = usePathname()
  const { user, profile, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isFloating = variant === 'floating'

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Browse', href: '/browse', icon: Search },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
  ]

  const quickActions = [
    { name: 'Find Creatives', href: '/browse', icon: Search },
    { name: 'Post a Job', href: '/client/post-project', icon: Plus },
    { name: 'Become a Creative', href: '/auth/register', icon: Sparkles },
  ]

  const navWrapperClass = isFloating
    ? 'sticky top-0 z-50 max-w-4xl mx-auto rounded-full bg-white/12 backdrop-blur-[12px] border border-white/10 px-3 sm:px-6 mx-3 sm:mx-auto'
    : 'sticky top-0 z-50 bg-[var(--brand-bg-base)]/95 backdrop-blur-md border-b border-[var(--border)]'

  const innerClass = isFloating
    ? 'flex items-center justify-between h-12 sm:h-14'
    : 'flex items-center justify-between h-14 sm:h-16'

  return (
    <nav className={navWrapperClass}>
      <div className={isFloating ? '' : 'max-w-7xl mx-auto px-4'}>
        <div className={innerClass}>
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 ${
              isFloating ? 'text-white' : ''
            }`}
          >
            <Zap className={`w-6 h-6 ${isFloating ? 'text-[var(--brand-primary)]' : 'text-[var(--brand-primary)]'}`} />
            <span className={`text-xl font-bold ${isFloating ? 'text-white' : 'text-[var(--brand-text)]'}`}>
              Job Fluencer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isFloating
                    ? pathname === link.href
                      ? 'text-[var(--brand-primary)]'
                      : 'text-white/90 hover:text-white'
                    : pathname === link.href
                      ? 'text-[var(--brand-primary)]'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--brand-text)]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Categories Dropdown - only render after mount */}
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isFloating
                      ? 'text-white/90 hover:text-white'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--brand-text)]'
                  }`}
                >
                  Categories
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.slug} asChild>
                      <Link href={`/category/${category.slug}`}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div
                className={`w-8 h-8 rounded-full animate-pulse ${
                  isFloating ? 'bg-white/20' : 'bg-gray-200'
                }`}
              />
            ) : user && profile ? (
              <UserMenu user={user} profile={profile} />
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className={isFloating ? 'text-white/90 hover:text-white hover:bg-white/10' : ''}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    className={
                      isFloating
                        ? 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white'
                        : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white'
                    }
                  >
                    Join Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu - only render after mount */}
          {mounted && (
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden min-h-[44px] min-w-[44px] -mr-1 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isFloating ? 'text-white hover:bg-white/10 touch-manipulation' : 'touch-manipulation'}
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[320px] p-0 flex flex-col" showCloseButton={false}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-6 h-6 text-[var(--brand-primary)]" />
                    <span className="text-xl font-bold text-[var(--brand-text)]">
                      Job Fluencer
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {/* Main Navigation */}
                  <nav className="space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[15px] font-medium transition-all ${
                            pathname === link.href
                              ? 'bg-orange-50 text-[var(--brand-primary)]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span>{link.name}</span>
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Categories Section */}
                  <div className="mt-6">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Categories
                    </p>
                    <nav className="space-y-1">
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-[15px] text-gray-700 hover:bg-gray-50 transition-all"
                          >
                            <Icon className="w-5 h-5 flex-shrink-0 text-gray-500" />
                            <span>{category.name}</span>
                          </Link>
                        )
                      })}
                    </nav>
                  </div>

                  {/* Quick Actions Section */}
                  <div className="mt-6">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Quick Actions
                    </p>
                    <nav className="space-y-1">
                      {quickActions.map((action) => {
                        const Icon = action.icon
                        return (
                          <Link
                            key={action.href}
                            href={action.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-[15px] text-gray-700 hover:bg-gray-50 transition-all"
                          >
                            <Icon className="w-5 h-5 flex-shrink-0 text-gray-500" />
                            <span>{action.name}</span>
                          </Link>
                        )
                      })}
                    </nav>
                  </div>
                </div>

                {/* Fixed Footer with Auth Buttons */}
                {!user && (
                  <div className="border-t border-gray-100 bg-white px-5 py-4 space-y-2.5">
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block">
                      <Button 
                        variant="outline" 
                        className="w-full h-11 text-[15px] font-semibold border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="block">
                      <Button 
                        className="w-full h-11 text-[15px] font-semibold bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white shadow-sm transition-all"
                      >
                        Join Now
                      </Button>
                    </Link>
                  </div>
                )}

                {/* User Menu in Mobile */}
                {user && profile && (
                  <div className="border-t border-gray-100 bg-white px-5 py-4">
                    <UserMenu user={user} profile={profile} />
                  </div>
                )}
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  )
}
