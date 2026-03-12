'use client'

import TestimonialsEditorial from '@/components/ui/editorial-testimonial'

export function TestimonialsSection() {
  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Loved by creatives and brands
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hear from the community that's transforming how India works with creative talent
          </p>
        </div>

        {/* Testimonial Component */}
        <TestimonialsEditorial />
      </div>
    </section>
  )
}
