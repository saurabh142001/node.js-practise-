const fs = require('fs');
const axios = require('axios');
const nodemailer = require('nodemailer');


const emailFilePath = 'interns_emails.txt';
const emailAddresses = fs.readFileSync(emailFilePath, 'utf8').split('\n').map(email => email.trim());


const apiURL = 'https://newsapi.org/'; 
const apiKey = '014ce93d5caf4ebcbea6edae12c216ce'; 

axios.get(apiURL, {
  headers: {
    'X-Api-Key': apiKey,
  },
})
  .then(response => {
    const data = response.data;

    
    const content = 'EXTRACT_FROM_RESPONSE'; 

   
    emailAddresses.forEach(emailAddress => {
      sendEmail(emailAddress, content)
        .then(() => {
          console.log(`Email sent successfully to ${emailAddress}`);
        })
        .catch(error => {
          console.error(`Failed to send email to ${emailAddress}:`, error);
        });
    });
  })
  .catch(error => {
    console.error('Error fetching data from the API:', error);
  });


async function sendEmail(recipient, content) {
 
  const transporter = nodemailer.createTransport({
    
  });

  
  const message = {
    from: 'saurabhjha1402@gmail.com', 
    to: recipient,
    subject: ' News of the Day',
    text: content,
  };


  return transporter.sendMail(message);
}
