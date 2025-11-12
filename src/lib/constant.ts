import type SMTPPool from 'nodemailer/lib/smtp-pool';

export const config: Record<string, SMTPPool.Options> = {
	atomarius: {
		pool: true,
		host: process.env.ATOMARIUS_SMTP_HOST,
		port: Number(process.env.ATOMARIUS_SMTP_PORT),
		secure: true,
		auth: {
			user: process.env.ATOMARIUS_SMTP_USER,
			pass: process.env.ATOMARIUS_SMTP_PASS
		}
	}
};
