import { json } from '@sveltejs/kit';

import { sendMail } from '$lib/utils';
import { config } from '$lib/constant';

export async function POST({ request }) {
	const a = await request.json();
	return json({ a }, { status: 200 });

	try {
		const { provider, ...data } = await request.json();
		const conf = config[provider];
		console.log(conf);

		if (conf) {
			const info = await sendMail(conf, data);

			return json({ info }, { status: 200 });
		}
	} catch (error) {
		return json({ message: 'Error parsing JSON body' }, { status: 400 });
	}
}
