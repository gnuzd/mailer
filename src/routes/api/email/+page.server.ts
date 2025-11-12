import { json } from '@sveltejs/kit';

import { sendMail } from '$lib/utils';
import { config } from '$lib/constant';

export async function POST({ request }) {
	try {
		const { provider, ...data } = await request.json();
		const conf = config[provider];

		if (conf) {
			const info = sendMail(conf, data);

			return json({ info }, { status: 200 });
		}
	} catch (error) {
		return json({ message: 'Error parsing JSON body' }, { status: 400 });
	}
}
