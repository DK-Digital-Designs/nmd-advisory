import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'deangr@gmail.com' // Fallback to user

serve(async (req) => {
    try {
        const { type, table, record } = await req.json()

        if (type !== 'INSERT') {
            return new Response(JSON.stringify({ message: 'Only INSERT events are handled' }), { status: 200 })
        }

        let subject = ''
        let html = ''

        if (table === 'bookings') {
            subject = `New Booking Request: ${record.ref_code}`
            html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #003366;">New Booking Received</h2>
          <p><strong>Ref Code:</strong> ${record.ref_code}</p>
          <p><strong>Client:</strong> ${record.name} (${record.email})</p>
          <p><strong>Service:</strong> ${record.service}</p>
          <p><strong>Date/Time:</strong> ${record.booking_date} at ${record.booking_time}</p>
          <p><strong>Platform:</strong> ${record.platform}</p>
          <p><strong>Notes:</strong> ${record.notes || 'N/A'}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This is an automated notification from NMD Advisory Dashboard.</p>
        </div>
      `
        } else if (table === 'enquiries') {
            subject = `New Enquiry from ${record.name}`
            html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #003366;">New Contact Enquiry</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37;">${record.message}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This is an automated notification from NMD Advisory Dashboard.</p>
        </div>
      `
        }

        if (!subject || !html) {
            return new Response(JSON.stringify({ message: 'Table not supported or no content' }), { status: 200 })
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'NMD Advisory <notifications@resend.dev>',
                to: [NOTIFICATION_EMAIL],
                subject: subject,
                html: html,
            }),
        })

        const data = await res.json()

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
            status: res.status,
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})
