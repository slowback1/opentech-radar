import { EmailSection } from '@opentech-radar/types';
import { buildEmail, EmailSelf, Log } from '@opentech-radar/utilities';

export default async function Sender(sections: EmailSection[]) {
  const nowString = new Date().toDateString();

  const emailBody = buildEmail(sections);
  const emailSubject = `Tech Radar ${nowString}`;


  if (process.env['NODE_ENV'] == 'development')
    return MockResponse(emailSubject, emailBody);

  return await EmailSelf(emailSubject, emailBody);
}

function MockResponse(emailSubject: string, emailBody: string): void {
  Log(`Mock sent:`);
  Log(`Subject: ${emailSubject}`);
  Log(`Body: ${emailBody}`);
}
