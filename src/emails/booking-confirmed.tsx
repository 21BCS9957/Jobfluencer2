import * as React from 'react'

interface BookingConfirmedEmailProps {
  clientName: string
  providerName: string
  projectTitle: string
  scheduledDate: string
  amount: number
}

export const BookingConfirmedEmail: React.FC<BookingConfirmedEmailProps> = ({
  clientName,
  providerName,
  projectTitle,
  scheduledDate,
  amount,
}) => (
  <div>
    <h1>Booking Confirmed!</h1>
    <p>Hi {clientName},</p>
    <p>
      Your booking with {providerName} has been confirmed.
    </p>
    <div>
      <h2>Booking Details:</h2>
      <p><strong>Project:</strong> {projectTitle}</p>
      <p><strong>Provider:</strong> {providerName}</p>
      <p><strong>Scheduled Date:</strong> {scheduledDate}</p>
      <p><strong>Total Amount:</strong> ₹{amount}</p>
    </div>
    <p>Best regards,<br />The Job Fluencer Team</p>
  </div>
)
