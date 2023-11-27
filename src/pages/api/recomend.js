
export default async function handler(req, res){

    let resp:any = fetch(`${process.env.API_URL}/api/recommend`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })


    resp = await req.json();

    res.status(200).json(resp);
}