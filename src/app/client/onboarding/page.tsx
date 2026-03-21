'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Upload, Briefcase, Target } from 'lucide-react'
import { clientOnboardingSchema, type ClientOnboardingInput } from '@/lib/validations'
import { completeClientOnboarding, uploadFile } from '@/actions/onboarding.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

const INDUSTRIES = [
  'Fashion',
  'Beauty',
  'Tech',
  'Food & Beverage',
  'Lifestyle',
  'Travel',
  'Gaming',
  'Health & Fitness',
  'Other',
]

export default function ClientOnboardingPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ClientOnboardingInput>({
    resolver: zodResolver(clientOnboardingSchema),
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ClientOnboardingInput) => {
    setIsLoading(true)

    try {
      // Upload avatar if provided
      if (avatarFile) {
        const result = await uploadFile(avatarFile, 'avatars', 'profile')
        if (result.error) {
          toast({
            title: 'Upload failed',
            description: result.error,
            variant: 'destructive',
          })
          setIsLoading(false)
          return
        }
        data.avatar_url = result.url
      }

      const result = await completeClientOnboarding(data)
      
      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        })
        setIsLoading(false)
      } else {
        toast({
          title: 'Welcome aboard!',
          description: 'Your hirer dashboard is ready.',
        })
        // Redirect handled by server action
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Let's set up your hirer account</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  i <= step
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
              {i < 2 && (
                <div
                  className={`w-16 h-1 ${
                    i < step ? 'bg-orange-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-8">
            {/* Step 1: About You */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-bold">About You</h2>
                </div>

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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city">City / Location</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="Mumbai"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="avatar">Profile Photo</Label>
                  <div className="mt-2">
                    {avatarPreview && (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="w-24 h-24 rounded-full object-cover mb-4"
                      />
                    )}
                    <label
                      htmlFor="avatar"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 w-fit"
                    >
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload Photo</span>
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <Button type="button" onClick={nextStep} className="w-full">
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Your Company */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-bold">Your Company</h2>
                </div>

                <div>
                  <Label htmlFor="company_name">Company / Brand Name</Label>
                  <Input
                    id="company_name"
                    {...register('company_name')}
                    placeholder="Acme Inc."
                  />
                  {errors.company_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.company_name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industry && (
                    <p className="text-red-600 text-sm mt-1">{errors.industry.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="website">Company Website (Optional)</Label>
                  <Input
                    id="website"
                    {...register('website')}
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="text-red-600 text-sm mt-1">{errors.website.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio">Brief Description</Label>
                  <Textarea
                    id="bio"
                    {...register('bio')}
                    placeholder="Tell us about your brand and what you do..."
                    rows={4}
                  />
                  {errors.bio && (
                    <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Completing...
                      </>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </form>
      </div>
    </div>
  )
}