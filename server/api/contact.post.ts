// POST: Submit contact form
export default defineEventHandler(async (event) => {
  if (getMethod(event) === 'POST') {
    const { name, email, phone, subject, message } = await readBody(event)

    try {
      // Validate input
      if (!name || !email || !subject || !message) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Missing required fields'
        })
      }

      // TODO: Connect to MongoDB and save contact message
      // await db.collection('contact-messages')
      //   .insertOne({
      //     name,
      //     email,
      //     phone,
      //     subject,
      //     message,
      //     createdAt: new Date(),
      //     read: false
      //   })

      // TODO: Send email notification to admin
      // await sendEmail({
      //   to: process.env.SMTP_USER,
      //   subject: `Pesan Kontak Baru: ${subject}`,
      //   html: `<p>Dari: ${name} (${email})</p><p>${message}</p>`
      // })

      return {
        success: true,
        message: 'Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.'
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error submitting contact form'
      })
    }
  }
})
