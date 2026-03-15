'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, Menu, X, ChevronDown } from 'lucide-react'
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
  { name: 'Photography', slug: 'photography' },
  { name: 'Videography', slug: 'videography' },
  { name: 'Social Media', slug: 'social_media' },
  { name: 'Video Editing', slug: 'editing' },
  { name: 'Influencer', slug: 'influencer' },
  { name: 'Content Creation', slug: 'content_creation' },
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
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'How It Works', href: '/how-it-works' },
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
              <SheetContent side="right" className="w-[85vw] max-w-[320px] p-0 flex flex-col">
                {/* Header */}
                <div className="px-5 py-4 border-b">
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
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {/* Main Navigation */}
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-3.5 text-base font-medium border-b border-gray-100 transition-colors ${
                          pathname === link.href
                            ? 'text-[var(--brand-primary)]'
                            : 'text-[var(--brand-text)] hover:text-[var(--brand-primary)]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  {/* Categories Section */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Categories
                    </p>
                    <div className="space-y-1">
                      {[
                        { name: 'Photography', slug: 'photography', icon: '📷' },
                        { name: 'Videography', slug: 'videography', icon: '🎥' },
                        { name: 'Social Media', slug: 'social_media', icon: '📱' },
                        { name: 'Video Editing', slug: 'editing', icon: '✂️' },
                        { name: 'Influencer', slug: 'influencer', icon: '⭐' },
                        { name: 'Content Creation', slug: 'content_creation', icon: '🎬' },
                      ].map((category) => (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 py-3.5 text-base text-gray-700 hover:text-[var(--brand-primary)] border-b border-gray-100 transition-colors"
                        >
                          <span className="text-xl">{category.icon}</span>
                          <span>{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions Section */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Quick Actions
                    </p>
                    <div className="space-y-1">
                      <Link
                        href="/browse"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-3.5 text-base text-gray-700 hover:text-[var(--brand-primary)] border-b border-gray-100 transition-colors"
                      >
                        <span className="text-xl">🔍</span>
                        <span>Find Creatives</span>
                      </Link>
                      <Link
                        href="/client/post-project"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-3.5 text-base text-gray-700 hover:text-[var(--brand-primary)] border-b border-gray-100 transition-colors"
                      >
                        <span className="text-xl">💼</span>
                        <span>Post a Job</span>
                      </Link>
                      <Link
                        href="/auth/register"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-3.5 text-base text-gray-700 hover:text-[var(--brand-primary)] border-b border-gray-100 transition-colors"
                      >
                        <span className="text-xl">🎨</span>
                        <span>Become a Creative</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer with Auth Buttons */}
                {!user && (
                  <div className="border-t bg-white px-5 py-4 space-y-2.5">
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 text-base font-semibold border-gray-300 hover:bg-gray-50"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="block">
                      <Button 
                        className="w-full h-12 text-base font-semibold bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white"
                      >
                        Join Now
                      </Button>
                    </Link>
                  </div>
                )}

                {/* User Menu in Mobile */}
                {user && profile && (
                  <div className="border-t bg-white px-5 py-4">
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
