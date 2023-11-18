import showErrorToast from 'components/toast/error_toast';
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

    const headers: any = {
        Authorization: `${authToken}`,
    }

    const reqBody: any = {
        method: req.method,
        headers
    };

    if (req.body) {
        reqBody['body'] = req.body;
        headers['Content-Type'] = 'application/json';
    }
    
    console.log("req", req.body, req.body == true, req.method, url, reqBody)
    const response = await fetch(url, reqBody);
    if (!response.ok) {
        return res.status(response.status).json({ error: 'Erro ao carregar dados' });
    }

    const data = await response.json();
    return res.status(200).json(data);
}