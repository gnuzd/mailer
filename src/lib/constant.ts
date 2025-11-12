import type SMTPPool from 'nodemailer/lib/smtp-pool';

export const config: Record<string, SMTPPool.Options> = {
  atomarius: {
    pool: true,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
};
