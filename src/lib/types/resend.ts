export interface EmailTemplate {
  to: string
  subject: string
  react: React.ReactElement
}

export interface WelcomeEmailProps {
  name: string
  role: 'client' | 'provider'
}

export interface BookingConfirmedEmailProps {
  clientName: string
  providerName: string
  projectTitle: string
  scheduledDate: string
  amount: number
}

export interface KYCApprovedEmailProps {
  name: string
}
