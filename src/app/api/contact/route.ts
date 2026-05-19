import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name, email, phone, message, website,
      intent, sellingAddress, buyingAreas, priceRange, timeframe,
    } = body

    // Honeypot: bots fill this hidden field, humans don't
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const intentLabel = intent === 'buying' ? 'Buying' : intent === 'selling' ? 'Selling' : intent === 'both' ? 'Buying & Selling' : 'Not specified'

    const textLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      ``,
      `Intent: ${intentLabel}`,
      sellingAddress ? `Property address: ${sellingAddress}` : null,
      buyingAreas ? `Areas of interest: ${buyingAreas}` : null,
      priceRange ? `Price range: ${priceRange}` : null,
      timeframe ? `Timeframe: ${timeframe}` : null,
      message ? `\nNotes:\n${message}` : null,
    ].filter(Boolean).join('\n')

    const htmlBody = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <hr />
      <p><strong>Intent:</strong> ${intentLabel}</p>
      ${sellingAddress ? `<p><strong>Property address:</strong> ${sellingAddress}</p>` : ''}
      ${buyingAreas ? `<p><strong>Areas of interest:</strong> ${buyingAreas}</p>` : ''}
      ${priceRange ? `<p><strong>Price range:</strong> ${priceRange}</p>` : ''}
      ${timeframe ? `<p><strong>Timeframe:</strong> ${timeframe}</p>` : ''}
      ${message ? `<hr /><p><strong>Notes:</strong></p><p>${message.replace(/\n/g, '<br />')}</p>` : ''}
    `

    await sgMail.send({
      to: process.env.AGENT_EMAIL!,
      from: 'noreply@hellolahome.com',
      replyTo: email,
      subject: `New inquiry from ${name} — ${intentLabel}`,
      text: textLines,
      html: htmlBody,
    })

    return NextResponse.json(
      { success: true, message: 'Message received. I will be in touch soon.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('SendGrid error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
