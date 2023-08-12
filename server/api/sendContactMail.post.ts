import { useMailer } from '#mailer';
import getEmailTemplate from '../../assets/contactEmail';

export default defineEventHandler(async (event) => {
  const mailer = useMailer();

  const body = await readBody(event);
  const { name, email, subject, message } = body;

  const config = useRuntimeConfig();
  const mailTransporter = mailer.customTransporter({
    host: config.mailer.host,
    port: +config.mailer.port,
    auth: {
      user: config.mailer.user,
      pass: config.mailer.password,
    }
  });

  try {
    const { text, html } = getEmailTemplate({ name, email, message });
    
    const response = await mailTransporter.sendMail({
      from: config.mailer.fromEmail,
      to: config.mailer.toEmail,
      subject,
      text,
      html,
      replyTo: email
    });
    if (response.accepted.length > 0) {
      return {
        message: 'Email sent successfully',
      }
    }
    if(response.rejected.length > 0) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error sending email',
      });
    }
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error sending email',
    });
  }
});
