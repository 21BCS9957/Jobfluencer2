'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ArrowRight, Camera, Video, Share2, Scissors, Sparkles, PenTool } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = [
  { name: 'All', slug: 'all', icon: Sparkles },
  { name: 'Photography', slug: 'photography', icon: Camera },
  { name: 'Videography', slug: 'videography', icon: Video },
  { name: 'Social Media', slug: 'social_media', icon: Share2 },
  { name: 'Video Editing', slug: 'editing', icon: Scissors },
  { name: 'Influencer', slug: 'influencer', icon: Star },
  { name: 'Content Creation', slug: 'content_creation', icon: PenTool },
]

const creators = [
  {
    id: 1,
    name: 'Sarah Johnson',
    category: 'Photography',
    categorySlug: 'photography',
    image: '/creative-1.jpeg',
    rating: 4.9,
    reviews: 127,
    followers: '12.5K',
    verified: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    category: 'Videography',
    categorySlug: 'videography',
    image: '/creative-2.jpeg',
    rating: 5.0,
    reviews: 89,
    followers: '8.3K',
    verified: true,
  },
  {
    id: 3,
    name: 'Emma Davis',
    category: 'Social Media',
    categorySlug: 'social_media',
    image: '/creative-3.jpeg',
    rating: 4.8,
    reviews: 156,
    followers: '25.1K',
    verified: true,
  },
  {
    id: 4,
    name: 'Alex Rivera',
    category: 'Video Editing',
    categorySlug: 'editing',
    image: '/creative-4.jpeg',
    rating: 4.9,
    reviews: 94,
    followers: '6.7K',
    verified: true,
  },
  {
    id: 5,
    name: 'Jessica Lee',
    category: 'Influencer',
    categorySlug: 'influencer',
    image: '/creative-5.jpeg',
    rating: 5.0,
    reviews: 203,
    followers: '45.2K',
    verified: true,
  },
  {
    id: 6,
    name: 'David Park',
    category: 'Content Creation',
    categorySlug: 'content_creation',
    image: '/photographer.webp',
    rating: 4.7,
    reviews: 78,
    followers: '9.8K',
    verified: true,
  },
]

export function ExploreCreatorsSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredCreators = activeCategory === 'all' 
    ? creators 
    : creators.filter(creator => creator.categorySlug === activeCategory)

  return (
    <section className="py-16 md:py-24 bg-[var(--brand-bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-text)] mb-4">
            Explore Top Creators
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto">
            Connect with talented creators across photography, videography, social media, and content creation
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === category.slug
                      ? 'bg-[var(--brand-primary)] text-white shadow-lg shadow-[var(--brand-primary)]/25'
                      : 'bg-white/50 text-[var(--brand-text)] hover:bg-white border border-[var(--border)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {filteredCreators.map((creator) => (
            <Link
              key={creator.id}
              href={`/creator/${creator.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[var(--border)] hover:border-[var(--brand-primary)]/30 hover:-translate-y-1">
                {/* Creator Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={creator.image}
                    alt={creator.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {creator.verified && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Creator Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--brand-text)] mb-1 text-sm md:text-base truncate">
                    {creator.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--muted-foreground)] mb-3 truncate">
                    {creator.category}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-[var(--brand-text)]">
                        {creator.rating}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        ({creator.reviews})
                      </span>
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">
                      {creator.followers} followers
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="sm"
                    className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-white text-xs md:text-sm font-medium group-hover:bg-[var(--brand-secondary)] transition-colors"
                  >
                    View Profile
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/browse">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white font-semibold px-8 transition-all"
            >
              View All Creators
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
