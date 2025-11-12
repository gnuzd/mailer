import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendMail } from '../lib/utils';
import { config } from '../lib/constant';

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method === 'POST') {
    try {
      const { provider, ...data } = request.body;
      const conf = config[provider];

      if (conf) {
        const info = sendMail(conf, data);

        return Response.json({
          received: 'ok',
          info,
        });
      }
    } catch (error) {
      return new Response('Error parsing JSON body', { status: 400 });
    }
  }

  response.status(200).send('Not Supported');
}
