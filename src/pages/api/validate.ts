import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("validating...")
    const response = await fetch(`${process.env.API_CONTRATO_URL}/validate`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
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