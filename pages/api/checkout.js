import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  try {
    const { itemName, unitPrice, quantity = 1 } = req.body

    if (!unitPrice || !itemName) {
      return res.status(400).json({ error: 'Missing itemName or unitPrice' })
    }

    const unitAmountPence = Math.round(parseFloat(unitPrice) * 100)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: { name: itemName },
            unit_amount: unitAmountPence,
          },
          quantity
        }
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/cancel`
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Checkout error', err)
    return res.status(500).json({ error: 'Server error creating checkout session' })
  }
}
