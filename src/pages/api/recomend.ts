import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse){

    let resp:any = fetch(`${process.env.API_URL}/api/recommend`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })


    resp = await req.json();

    return Response.json(res);
}