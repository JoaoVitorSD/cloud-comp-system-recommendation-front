import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url: any = req.headers['x-fetch-url'];
    if (!url) {
        return res.status(400).json({ error: 'Missing x-fetch-url header' });
    }
    // Parse cookies from the request
    const authToken = getCookie("auth-token", { req, res });

    if (!authToken) {
        return res.status(401).json({ error: 'Auth token not found' });
    }

    const response = await fetch(url, {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${authToken}`,
        },
        body: req.body,
    });

    const status = response.status;
    if (!response.ok) {
        if (response.headers.get('content-type')?.includes('application/json')) {
            const data = await response.json();
            return res.status(response.status).json(data);
        }
        return res.status(response.status).json({ error: 'Erro ao salvar dados' });
    }

    const data = await response.json();
    return res.status(status).json(data);
}