---
title: Sending Emails with Nuxt
description: Sending emails using Nuxt, Nuxt Mailer and SMTP
image: '/nuxt-mailer.webp'
date: '2023-08-14'
head:
  meta:
    - name: 'keywords'
      content: 'nuxt 3, email, nodemailer, server-side rendering, ssr, nitro, nuxt-mailer, nuxt mailer, smtp'
    - name: 'author'
      content: 'Umar Adejoh'
    - name: 'copyright'
      content: '© 2023 Umar Adejoh'
    - name: 'title'
      content: 'Sending Emails with Nuxt'
---

# Sending Emails with Nuxt
![Sending Emails with Nuxt](/nuxt-mailer.webp)

Sending emails is a requirement for many web applications, and even static websites. Most websites contain a `Contact Us` form, and a lot of implementations I have come across use the HTML anchor tag's `mailto` href attribute to send these emails. I find this very clunky as it opens the device's email client, rather than send an email directly. This is not great for UX, and so I have long sought a way to directly send these emails.

A solution I found for this involves using the Nitro server that is created by Nuxt, which is used to handle the SSR and server routes functionality. We can easily leverage this server to send emails.

The most direct way would be to use the [nodemailer](https://www.npmjs.com/package/nodemailer) package, and implement the integrations with Nuxt ourselves. There is however, a simpler package we could use. It is [nuxt-mailer](https://www.npmjs.com/package/nuxt-mailer). This package is a ready-made nodemailer/nuxt integration, that allows us to use nodemailer to send our emails without worrying too much about the exact setup of nodemailer.

I shall briefly outline how to set this package up, and start sending emails using any SMTP service of your choice.

The installation is done by running the following command:

```bash
$ npm install nuxt-mailer
```

After the installation completes, we can inform Nuxt about the module, to allow it to be used, by adding an entry for it in our `nuxt.config.ts` like so:

```ts
export default defineNuxtConfig({
...
  modules: [
    'nuxt-mailer'
  ],
...
})
```

Most SMTP services (at least [Mailtrap](https://mailtrap.io) and [Mailgun](https://app.mailgun.com) I have checked myself) require at least the following configuration variables to be able to send emails:

* host
    
* port
    
* user
    
* password
    

We would do well to provide these variables in a way that would prevent them being leaked on the client side, as well as being committed to source control. My solution for this is always to have them as `.env` variables, that are then extracted into our app config like so:

> .env

```yaml
NUXT_MAILER_HOST=<your smtp host>
NUXT_MAILER_PORT=<your host's port>
NUXT_MAILER_USER=<your smtp username>
NUXT_MAILER_PASSWORD=<your smtp password>
```

> nuxt.config.ts

```ts
export default defineNuxtConfig({
  ...
  runtimeConfig: {
    mailer: {
      host: process.env.NUXT_MAILER_HOST,
      port: process.env.NUXT_MAILER_PORT,
      user: process.env.NUXT_MAILER_USER,
      password: process.env.NUXT_MAILER_PASSWORD,
    },
  },
...
});
```

Next, we can create our transporter, making a composable to allow us to reuse it at will.

> composables/useMailTransporter.ts

```ts
import { useMailer } from '#mailer';

const config = useRuntimeConfig();
const mailer = useMailer();

const transport = mailer.customTransporter({
  host: config.mailer.host,
  port: +config.mailer.port,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.password
  }
});

const useMailTransporter = () => transporter;
export default useMailTransporter;
```

Finally, we can set up the server route that would handle the request to send the email. We'd need to send the following fields with our requests, at the minimum:

* subject
    
* text
    
* from address
    
* to address
    

It should be noted that some hosts would require that you verify your from address, and so you might not be able to set it to a different value on a per-email basis as show below. Here's an example of how to set this up:

> server/api/sendMail.post.ts

```ts
export default defineEventHandler(async (event) => {
  const mailTransporter = useMailTransporter();
  const body = await readBody(event);
  const { subject, text, from_address, to_address } = body;

  const response = await mailTransporter.sendMail({
    from: from_address,
    to: to_address,
    subject,
    text,
  });
  if(response.accepted.length) {
    <Mail is successfully sent, handle as you please!>
  }
});
```

With this, you should be able to send your emails successfully. To have your emails look even better, you could also send HTML emails, just by adding them to an `html` field on the `sendMail` object.

Thanks for reading, and happy mailing!