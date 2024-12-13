import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// Obtener todos los adjuntos de una tarjeta
export async function GET(request: Request, { params }: { params: { tableroId: string, listaId: string, tarjetaId: string } }) {
  try {
    const tarjetaId = parseInt(params.tarjetaId, 10);

    // Verificar si tarjetaId es válido
    if (isNaN(tarjetaId)) {
      return NextResponse.json({ error: "tarjetaId no es válido" }, { status: 400 });
    }

    // Verificar si la tarjeta existe
    const tarjeta = await prisma.tarjeta.findUnique({
      where: { id: tarjetaId },
    });

    if (!tarjeta) {
      return NextResponse.json({ error: "Tarjeta no encontrada" }, { status: 404 });
    }

    // Obtener los adjuntos asociados con la tarjeta
    const adjuntos = await prisma.adjunto.findMany({
      where: {
        tarjetaId,
      },
    });

    return NextResponse.json(adjuntos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al obtener los adjuntos:", error.message);
      return NextResponse.json({ error: "Error al obtener los adjuntos", details: error.message }, { status: 500 });
    } else {
      console.error("Error desconocido", error);
      return NextResponse.json({ error: "Error desconocido" }, { status: 500 });
    }
  }
}

// Crear un nuevo adjunto
export async function POST(request: Request, { params }: { params: { tableroId: string, listaId: string, tarjetaId: string } }) {
  const formData = await request.formData();
  const nombre = formData.get("nombre") as string;
  const file = formData.get("file") as File;

  const tarjetaId = parseInt(params.tarjetaId, 10);

  // Verificar si tarjetaId es válido
  if (isNaN(tarjetaId)) {
    return NextResponse.json({ error: "tarjetaId no es válido" }, { status: 400 });
  }

  if (!file || !nombre) {
    return NextResponse.json({ error: "El archivo y el nombre son necesarios" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "uploads", file.name);

  // Guardar el archivo en el servidor
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Crear el adjunto en la base de datos
    const adjunto = await prisma.adjunto.create({
      data: {
        nombre,
        url: `/uploads/${file.name}`,
        tarjetaId,
      },
    });
    return NextResponse.json(adjunto, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al crear el adjunto:", error.message);
      return NextResponse.json({ error: "Error al crear el adjunto", details: error.message }, { status: 500 });
    } else {
      console.error("Error desconocido", error);
      return NextResponse.json({ error: "Error desconocido" }, { status: 500 });
    }
  }
}
