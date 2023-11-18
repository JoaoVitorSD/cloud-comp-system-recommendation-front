import showErrorToast from 'components/toast/error_toast';
import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { promisify } from 'util';
import stream from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const pipeline = promisify(stream.pipeline);
    const url: any = req.headers['x-fetch-url'];
    if (!url) {
        return res.status(400).json({ error: 'Missing x-fetch-url header' });
    }
    // Parse cookies from the request
    const authToken = getCookie("auth-token", { req, res });

    if (!authToken) {
        return res.status(401).json({ error: 'Auth token not found' });
    }

    const response: any = await fetch(url, {
        headers: {
            Authorization: `${authToken}`,
        },
    });
    if (!response.ok) {
        return res.status(response.status).json({ error: 'Erro ao gerar relatório' });
    }

    const filenameHeader = response.headers.get('content-disposition');
    if(!filenameHeader) {
        return res.status(400).json({ error: 'Erro ao gerar relatório' });
    }
    const headers = new Headers();
    res.setHeader('Content-Disposition', filenameHeader);
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'application/octet-stream');

    await pipeline(response.body, res);
}