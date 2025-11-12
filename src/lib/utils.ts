import nodemailer from 'nodemailer';
import type SMTPPool from 'nodemailer/lib/smtp-pool';

type Data = {
	email: string;
	to: string;
	name: string;
	subject: string;
	body: string;
};

export const sendMail = (config: SMTPPool.Options, data: Data) => {
	const transporter = nodemailer.createTransport(config);

	return transporter.sendMail({
		from: `"${data.name}" <${config.auth?.user}>`,
		to: data.to,
		subject: data.subject,
		html: `
<b>Email:</b> ${data.email} <br />
<p>${data.body}</p>
`
	});
};
