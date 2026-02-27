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
    ? 'sticky top-0 z-50 max-w-4xl mx-auto rounded-full bg-white/12 backdrop-blur-[12px] border border-white/10 px-4 sm:px-6'
    : 'sticky top-0 z-50 bg-[var(--brand-bg-base)]/95 backdrop-blur-md border-b border-[var(--border)]'

  const innerClass = isFloating
    ? 'flex items-center justify-between h-14'
    : 'flex items-center justify-between h-16'

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
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isFloating ? 'text-white hover:bg-white/10' : ''}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-lg font-medium ${
                        pathname === link.href
                          ? 'text-[var(--brand-primary)]'
                          : 'text-[var(--brand-text)]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-500 mb-3">Categories</p>
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-gray-700"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>

                  {!user && (
                    <div className="border-t pt-4 space-y-3">
                      <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white">
                          Join Now
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  )
}
