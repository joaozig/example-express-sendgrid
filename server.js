const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('ok :)')
})

app.post('/sendmail', async (req, res) => {
  const { message, phone, subject, email, name } = req.body

  const msg = {
    from: process.env.SENDGRID_FROM,
    to: process.env.SENDGRID_TO,
    subject: `Assunto: ${subject}`,
    text: `Nome: ${name} - Telefone: ${phone} - Email: ${email} - ${message}`,
    html: `
    <strong> Nome:</strong>  ${name} <br/>
    <strong>Telefone: </strong>${phone} <br/>
    <strong> Email: </strong> ${email} <br/>
    ${message}`,
  }

  try {
    await sgMail.send(msg)
    res.status(200).json({ message: 'success!' })
  } catch (error) {
    res.status(422).json({ message: error.message })
  }
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


