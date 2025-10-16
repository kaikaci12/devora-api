import nodemailer from "nodemailer";
const html = `
<h1> თქვენ დარეგისტრირდით კურსზე: Mobile Development with Flutter</h1>
<p> This is a test email 
Join us on discord https://discord.gg/q5x5vQTq
</p>


`
 async function sendMail(to) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "kurtsikidzetato3@gmail.com",
            pass:process.env.GOOGLE_APP_PASSWORD
        }
    })

  const info = await transporter.sendMail({
    from: 'devora.ge',
    to: to,
    subject: "Test Email from Devora",
    
    html: html
  });

  console.log("Message sent:", info.messageId);

    
}
export default sendMail
