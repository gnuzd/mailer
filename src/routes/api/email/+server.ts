import { json, type RequestEvent } from '@sveltejs/kit';

import { sendMail } from '$lib/utils';
import { config, whiltelist } from '$lib/constant';

export async function POST({ request }: RequestEvent) {
	const originalHost = request.headers.get('Host') || '';
	const forwardedHost = request.headers.get('X-Forwarded-Host') || '';
	const hostname = (originalHost || forwardedHost).replace('https://', '');

	if (!whiltelist.includes(hostname)) {
		return json({ message: 'Not Supported' }, { status: 503 });
	}

	try {
		const { provider, ...data } = await request.json();
		const conf = config[provider];

		if (conf) {
			const info = await sendMail(conf, data);

			return json({ info }, { status: 200 });
		}
	} catch (error: unknown) {
		let errorMessage = 'An unknown error occurred.';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return json({ message: errorMessage }, { status: 400 });
	}
}
