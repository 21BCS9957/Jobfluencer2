import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-[var(--brand-primary)]" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
      <p className="text-[var(--muted-foreground)] mb-6">
        We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
      </p>
      <div className="bg-[var(--accent)] p-4 rounded-lg mb-6 text-sm text-left">
        <p className="font-medium mb-2">Didn't receive the email?</p>
        <ul className="list-disc list-inside text-[var(--muted-foreground)] space-y-1">
          <li>Check your spam folder</li>
          <li>Make sure you entered the correct email</li>
          <li>Wait a few minutes and check again</li>
        </ul>
      </div>
      <Link href="/auth/login">
        <Button className="w-full">Back to Login</Button>
      </Link>
    </Card>
  )
}
