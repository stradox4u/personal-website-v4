import { useMailer } from '#mailer';

export default defineEventHandler(async (event) => {
  const mailer = useMailer();

  const body = await readBody(event);
  const { name, email, subject, message } = body;

  try {
    const response = await mailer.sendMail({
      requestId: 'test-key',
      options: {
        fromEmail: email,
        fromName: name,
        to: 'admin@arcodeh.pro',
        subject: subject,
        text: message,
        html: ''
      }
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
    throw createError({
      statusCode: 500,
      statusMessage: 'Error sending email',
    });
  }
});
