import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb"; 

export async function OPTIONS() {
    return new Response(null, { status: 204 });
}

export async function GET(request, { params }) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const { id } = await params;
    const results = await collection.find({ _id: new ObjectId(id) }).toArray();

    return new Response(JSON.stringify(results[0]));
}


export async function PUT(request, { params }) {
    const content = request.headers.get('content-type')

    if (content != 'application/json')
        return Response.json({ message: 'Debes proporcionar datos JSON' })

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const { id } = await params
    const { nombre_completo, edad, nacionalidad, equipo_actual, numero_monoplaza, numero_podios, victorias, campeonatos, imagen } = await request.json() // Read body request
    const results = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { nombre_completo, edad, nacionalidad, equipo_actual, numero_monoplaza, numero_podios, victorias, campeonatos, imagen } });

    return Response.json(results);
}


export async function DELETE(request, { params }) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const { id } = await params
    const results = await collection.deleteOne({ _id: new ObjectId(id) })

    return Response.json(results);
}