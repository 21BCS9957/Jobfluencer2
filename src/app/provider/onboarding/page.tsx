'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Upload, User, Briefcase, Share2, X } from 'lucide-react'
import { providerOnboardingSchema, type ProviderOnboardingInput } from '@/lib/validations'
import { completeProviderOnboarding, uploadFile } from '@/actions/onboarding.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

const CATEGORIES = [
  'photography',
  'videography',
  'social_media',
  'editing',
  'influencer',
  'content_creation',
]

const CATEGORY_LABELS: Record<string, string> = {
  photography: 'Photography',
  videography: 'Videography',
  social_media: 'Social Media Management',
  editing: 'Video Editing',
  influencer: 'Influencer Marketing',
  content_creation: 'Content Creation',
}

const EXPERIENCE_OPTIONS = [
  { value: '0-1', label: '0-1 years' },
  { value: '1-3', label: '1-3 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5+', label: '5+ years' },
]

export default function ProviderOnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([])
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ProviderOnboardingInput>({
    resolver: zodResolver(providerOnboardingSchema),
    defaultValues: {
      categories: [],
      portfolio_image_urls: [],
    },
  })

  const selectedCategories = watch('categories') || []

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

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (portfolioFiles.length + files.length > 5) {
      toast({
        title: 'Too many files',
        description: 'You can upload up to 5 portfolio images',
        variant: 'destructive',
      })
      return
    }

    setPortfolioFiles([...portfolioFiles, ...files])
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPortfolioPreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePortfolioImage = (index: number) => {
    setPortfolioFiles(portfolioFiles.filter((_, i) => i !== index))
    setPortfolioPreviews(portfolioPreviews.filter((_, i) => i !== index))
  }

  const toggleCategory = (category: string) => {
    const current = selectedCategories
    if (current.includes(category)) {
      setValue('categories', current.filter(c => c !== category))
    } else {
      setValue('categories', [...current, category])
    }
  }

  const onSubmit = async (data: ProviderOnboardingInput) => {
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

      // Upload portfolio images
      const portfolioUrls: string[] = []
      for (const file of portfolioFiles) {
        const result = await uploadFile(file, 'portfolios', 'images')
        if (result.error) {
          toast({
            title: 'Portfolio upload failed',
            description: result.error,
            variant: 'destructive',
          })
          continue
        }
        portfolioUrls.push(result.url!)
      }
      data.portfolio_image_urls = portfolioUrls

      const result = await completeProviderOnboarding(data)
      
      if (result?.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        })
        setIsLoading(false)
      } else {
        toast({
          title: 'Welcome!',
          description: 'Your influencer profile is live.',
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
          <p className="text-gray-600">Let's set up your creative profile</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  i <= step
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
              {i < 3 && (
                <div
                  className={`w-16 h-1 ${
                    i < step ? 'bg-purple-600' : 'bg-gray-200'
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
                  <User className="w-6 h-6 text-purple-600" />
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

                <div>
                  <Label htmlFor="bio">Short Bio</Label>
                  <Textarea
                    id="bio"
                    {...register('bio')}
                    placeholder="Tell us about yourself and your creative work..."
                    rows={4}
                  />
                  {errors.bio && (
                    <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
                  )}
                </div>

                <Button type="button" onClick={nextStep} className="w-full">
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Your Work */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold">Your Work</h2>
                </div>

                <div>
                  <Label>Categories (Select at least one)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {CATEGORIES.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleCategory(category)}
                      >
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label className="text-sm cursor-pointer">
                          {CATEGORY_LABELS[category]}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.categories && (
                    <p className="text-red-600 text-sm mt-1">{errors.categories.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="years_experience">Years of Experience</Label>
                  <Controller
                    name="years_experience"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          {EXPERIENCE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.years_experience && (
                    <p className="text-red-600 text-sm mt-1">{errors.years_experience.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hourly_rate">Hourly Rate (₹) - Optional</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      {...register('hourly_rate', { valueAsNumber: true })}
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="daily_rate">Daily Rate (₹) - Optional</Label>
                    <Input
                      id="daily_rate"
                      type="number"
                      {...register('daily_rate', { valueAsNumber: true })}
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Your Social Presence */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Share2 className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold">Your Social Presence</h2>
                </div>

                <div>
                  <Label htmlFor="instagram_url">Instagram Profile URL</Label>
                  <Input
                    id="instagram_url"
                    {...register('instagram_url')}
                    placeholder="https://instagram.com/username"
                  />
                  {errors.instagram_url && (
                    <p className="text-red-600 text-sm mt-1">{errors.instagram_url.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="youtube_url">YouTube Channel URL</Label>
                  <Input
                    id="youtube_url"
                    {...register('youtube_url')}
                    placeholder="https://youtube.com/@username"
                  />
                  {errors.youtube_url && (
                    <p className="text-red-600 text-sm mt-1">{errors.youtube_url.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="website_url">Personal Website / Portfolio URL</Label>
                  <Input
                    id="website_url"
                    {...register('website_url')}
                    placeholder="https://yourwebsite.com"
                  />
                  {errors.website_url && (
                    <p className="text-red-600 text-sm mt-1">{errors.website_url.message}</p>
                  )}
                </div>

                <div>
                  <Label>Portfolio Images (Up to 5)</Label>
                  <div className="mt-2">
                    {portfolioPreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {portfolioPreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removePortfolioImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {portfolioFiles.length < 5 && (
                      <label
                        htmlFor="portfolio"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 w-fit"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Upload Images</span>
                      </label>
                    )}
                    <input
                      id="portfolio"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePortfolioChange}
                      className="hidden"
                    />
                  </div>
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
