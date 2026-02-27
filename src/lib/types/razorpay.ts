export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  created_at: number
}

export interface RazorpayPayment {
  id: string
  entity: string
  amount: number
  currency: string
  status: string
  order_id: string
  method: string
  captured: boolean
  email: string
  contact: string
  created_at: number
}

export interface RazorpayWebhookEvent {
  entity: string
  account_id: string
  event: string
  contains: string[]
  payload: {
    payment: {
      entity: RazorpayPayment
    }
    order?: {
      entity: RazorpayOrder
    }
  }
  created_at: number
}
