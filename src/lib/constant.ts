import type SMTPPool from 'nodemailer/lib/smtp-pool';
import {
	ATOMARIUS_SMTP_HOST,
	ATOMARIUS_SMTP_PORT,
	ATOMARIUS_SMTP_USER,
	ATOMARIUS_SMTP_PASS
} from '$env/static/private';

export const config: Record<string, SMTPPool.Options> = {
	atomarius: {
		pool: true,
		host: ATOMARIUS_SMTP_HOST,
		port: Number(ATOMARIUS_SMTP_PORT),
		secure: false,
		auth: {
			user: ATOMARIUS_SMTP_USER,
			pass: ATOMARIUS_SMTP_PASS
		}
	}
};
