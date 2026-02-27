import { Zap } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-bg-base)] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-8 h-8 text-[var(--brand-primary)]" />
            <h1 className="text-3xl font-bold text-[var(--brand-text)]">Job Fluencer</h1>
          </div>
          <p className="text-[var(--muted-foreground)]">Creative Talent Marketplace</p>
        </div>
        {children}
      </div>
    </div>
  )
}
