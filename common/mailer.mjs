import nodemailer from 'nodemailer'

export default async function sendEmail(to, subject, html) {
  let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  })
  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${to}`,
    subject: `${subject}`,
    html: `${html}`
  }

  const a = async function (err, info) {
    return new Promise((resolve, reject) => {
      if (err) throw new Error(err)
      resolve(info)
    })
  }
  transport.sendMail(mailOptions, a)
}
