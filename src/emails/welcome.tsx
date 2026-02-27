import * as React from 'react'

interface WelcomeEmailProps {
  name: string
  role: 'client' | 'provider'
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name, role }) => (
  <div>
    <h1>Welcome to Job Fluencer, {name}!</h1>
    <p>
      Thank you for joining Job Fluencer as a {role}.
    </p>
    {role === 'provider' && (
      <p>
        Complete your profile and KYC verification to start receiving project opportunities.
      </p>
    )}
    {role === 'client' && (
      <p>
        You can now post projects and connect with talented creative professionals.
      </p>
    )}
    <p>Best regards,<br />The Job Fluencer Team</p>
  </div>
)
