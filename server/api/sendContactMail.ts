import { useMailer } from '#mailer';

export default defineEventHandler(async (event) => {
  const mailer = useMailer();

  const body = await readBody(event);
  const { name, email, subject, message } = body;

  const config = useRuntimeConfig();
  const mailgunTransporter = mailer.customTransporter({
    host: config.mailgun.host,
    port: +config.mailgun.port,
    auth: {
      user: config.mailgun.user,
      pass: config.mailgun.password,
    }
  });

  try {
    const text = `Contact form message from: ${name}

    Message: ${message}`;
    
    const response = await mailgunTransporter.sendMail({
      from: 'postmaster@arcodeh.pro',
      to: 'admin@arcodeh.pro',
      subject,
      text,
      replyTo: email
    });
    return JSON.stringify(response);
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
