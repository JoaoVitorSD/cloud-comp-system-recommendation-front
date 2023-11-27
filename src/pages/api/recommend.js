
export default async function handler(req, res){

    let resp = await fetch(`${process.env.API_URL}/api/recommend`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })



    resp = await resp.json();

    res.status(200).json(resp);
}