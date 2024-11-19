import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import formidable, { Files, Fields, File } from "formidable";
import fs from "fs";
import path from "path";

// Configuración para deshabilitar el body parser de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

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
  const form = formidable({ multiples: false, uploadDir: UPLOAD_DIR, keepExtensions: true });

  try {
    const { fields, files }: { fields: Fields; files: Files } = await new Promise((resolve, reject) => {
      form.parse(request as any, (err, fields: Fields, files: Files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Asegurarse de manejar correctamente los campos que podrían ser arrays
    const titulo = Array.isArray(fields.titulo) ? fields.titulo[0] : fields.titulo;
    const descripcion = Array.isArray(fields.descripcion) ? fields.descripcion[0] : fields.descripcion;
    const userId = Array.isArray(fields.userId) ? fields.userId[0] : fields.userId;

    if (!titulo || !descripcion || !userId) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
    }

    const imagen = files.imagen as File | undefined;
    const imagenUrl = imagen ? `/uploads/${path.basename(imagen.filepath)}` : null;

    const noticia = await prisma.noticia.create({
      data: {
        titulo: String(titulo),
        descripcion: String(descripcion),
        userId: parseInt(userId as string, 10),
        imagen: imagenUrl,
        fechaPublicacion: new Date(),
      },
    });

    return NextResponse.json(noticia);
  } catch (error) {
    console.error("Error al crear la noticia:", error);
    return NextResponse.json({ error: "Error al crear la noticia" }, { status: 500 });
  }
}
