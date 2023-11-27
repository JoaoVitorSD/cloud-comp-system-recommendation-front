
export default async function handler(req, res){

    let resp = await fetch(`${process.env.API_URL}/api/recommend`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })


    console.log(resp);
    resp = await resp.json();
    
    console.log(resp);

    res.status(200).json(resp);
}