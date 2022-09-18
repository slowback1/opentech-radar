import { Log } from '@opentech-radar/utilities';

const sgMail = require('@sendgrid/mail');

export async function EmailSelf(subject: string, content: string) {
  let apiKey = process.env['NX_SG_APIKEY'];
  let from = process.env['NX_SG_EMAILFROM'];
  let to = process.env['NX_SG_EMAILTO'];
  
  sgMail.setApiKey(apiKey);

  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: content,
    html: content
  };
  await sgMail
    .send(msg)
    .then(() => {
      Log('Email sent');
    })
    .catch((error) => {
      Log(error);
    });
}

