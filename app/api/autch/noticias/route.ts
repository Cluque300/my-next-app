import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// Ruta para guardar las imágenes
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Asegúrate de que la carpeta de uploads exista
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// GET: Obtener todas las noticias
export async function GET() {
  try {
    const noticias = await prisma.noticia.findMany({
      orderBy: { fechaPublicacion: "desc" },
    });
    return NextResponse.json(noticias);
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    return NextResponse.json({ error: "Error al obtener noticias" }, { status: 500 });
  }
}

// POST: Crear una nueva noticia
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const titulo = formData.get("titulo")?.toString();
    const descripcion = formData.get("descripcion")?.toString();
    const userId = formData.get("userId")?.toString();
    const imagenFile = formData.get("imagen") as File;

    if (!titulo || !descripcion || !userId) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos (título, descripción, userId)" },
        { status: 400 }
      );
    }

    let imagenUrl: string | null = null;

    // Manejar la subida de la imagen si está presente
    if (imagenFile) {
      const buffer = await imagenFile.arrayBuffer();
      const fileName = `${Date.now()}-${imagenFile.name}`;
      const filePath = path.join(UPLOAD_DIR, fileName);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      imagenUrl = `/uploads/${fileName}`;
    }

    const noticia = await prisma.noticia.create({
      data: {
        titulo: String(titulo),
        descripcion: String(descripcion),
        userId: parseInt(userId, 10),
        imagen: imagenUrl,
        fechaPublicacion: new Date(),
      },
    });

    return NextResponse.json(noticia, { status: 201 });
  } catch (error) {
    console.error("Error al crear la noticia:", error);
    return NextResponse.json({ error: "Error al crear la noticia" }, { status: 500 });
  }
}
