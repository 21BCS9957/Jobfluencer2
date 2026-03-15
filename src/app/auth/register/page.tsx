'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Briefcase, Camera, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { register as registerAction } from '@/actions/auth.actions'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback')
  
  const [selectedRole, setSelectedRole] = useState<'client' | 'provider' | null>(
    callback ? 'client' : null // Auto-select client if coming from campaign wizard
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: selectedRole || 'client',
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    if (!selectedRole) return
    
    setIsLoading(true)
    setError('')

    const result = await registerAction({ ...data, role: selectedRole })

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      // If there's a callback, redirect there after registration
      if (callback) {
        router.push(callback)
      } else {
        setSuccess(true)
      }
    }
  }

  if (success) {
    return (
      <Card className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent you a verification link. Please check your email to verify your account.
        </p>
        <Link href="/auth/login">
          <Button className="w-full">Go to Login</Button>
        </Link>
      </Card>
    )
  }

  if (!selectedRole && !callback) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-center mb-2">Join Job Fluencer</h2>
        <p className="text-gray-600 text-center mb-8">Choose how you want to use the platform</p>
        
        <div className="grid gap-4">
          <Card
            className="p-6 cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all"
            onClick={() => setSelectedRole('client')}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">I want to hire</h3>
                <p className="text-gray-600 text-sm">
                  Post projects and connect with talented creatives
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all"
            onClick={() => setSelectedRole('provider')}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">I'm a Creative</h3>
                <p className="text-gray-600 text-sm">
                  Showcase your work and get hired for projects
                </p>
              </div>
            </div>
          </Card>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-orange-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    )
  }

  return (
    <Card className="p-8">
      {!callback && (
        <button
          onClick={() => setSelectedRole(null)}
          className="text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          ← Change role
        </button>
      )}

      <h2 className="text-2xl font-bold mb-2">
        {callback ? 'Create your account to publish' : `Create your ${selectedRole === 'client' ? 'Client' : 'Creative'} account`}
      </h2>
      {callback && (
        <p className="text-gray-600 mb-6">
          You're almost done! Create an account to publish your campaign.
        </p>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            {...register('full_name')}
            placeholder="John Doe"
          />
          {errors.full_name && (
            <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : callback ? (
            'Create Account & Publish'
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link 
          href={callback ? `/auth/login?callback=${callback}` : '/auth/login'} 
          className="text-orange-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </Card>
  )
}


export default function RegisterPage() {
  return (
    <Suspense fallback={
      <Card className="p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        </div>
      </Card>
    }>
      <RegisterForm />
    </Suspense>
  )
}
