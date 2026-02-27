import * as React from 'react'

interface KYCApprovedEmailProps {
  name: string
}

export const KYCApprovedEmail: React.FC<KYCApprovedEmailProps> = ({ name }) => (
  <div>
    <h1>KYC Verification Approved!</h1>
    <p>Hi {name},</p>
    <p>
      Congratulations! Your KYC verification has been approved.
    </p>
    <p>
      You can now start accepting bookings and receiving payments through Job Fluencer.
    </p>
    <p>Best regards,<br />The Job Fluencer Team</p>
  </div>
)
