import { connectToDatabase } from "@/lib/mongodb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
    const { database } = await connectToDatabase();
    const collection = database.collection("drivers");

    const results = await collection.find({}).toArray();

    return Response.json(results,{headers: corsHeaders});
}

export async function POST(request) {
    const content = request.headers.get('content-type')

    if (content !== 'application/json')
        return Response.json({ message: 'Debes proporcionar datos JSON' },
    { headers: corsHeaders });

    const { database } = await connectToDatabase();
    const collection = database.collection('drivers');

    const { nombre_completo, edad, nacionalidad, equipo_actual, numero_monoplaza, numero_podios, victorias, campeonatos, imagen } = await request.json() 
    const results = await collection.insertOne({ nombre_completo, edad, nacionalidad, equipo_actual, numero_monoplaza, numero_podios, victorias, campeonatos, imagen });

    return Response.json(results, { headers: corsHeaders });
    
}