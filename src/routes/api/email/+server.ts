import { json, type RequestEvent } from '@sveltejs/kit';

import { sendMail } from '$lib/utils';
import { config, whiltelist } from '$lib/constant';

export async function POST({ request }: RequestEvent) {
	const cfWorker = request.headers.get('cf-worker')?.split('.');

	if (cfWorker?.[0] && !whiltelist.includes(cfWorker[0])) {
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
