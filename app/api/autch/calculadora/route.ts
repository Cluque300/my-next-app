import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const projectDuration = parseInt(body.projectDuration);
  const adminCost = parseFloat(body.adminCost);
  const locativeCost = parseFloat(body.locativeCost);
  const machineryCost = parseFloat(body.machineryCost);
  const materialCosts = parseFloat(body.materialCosts);
  const otherCosts = parseFloat(body.otherCosts);
  const projectId = parseInt(body.projectId);

  // Validación de campos
  if (isNaN(projectDuration) || isNaN(adminCost) || isNaN(locativeCost) || 
      isNaN(machineryCost) || isNaN(materialCosts) || isNaN(otherCosts)) {
    return NextResponse.json({ error: 'Todos los campos son requeridos y deben ser válidos.' }, { status: 400 });
  }

  // Cálculo del costo total usando la lógica de la calculadora de Flask
  const totalCost = (adminCost + locativeCost + machineryCost + materialCosts + otherCosts) 
                      * projectDuration; // Suponiendo que la duración afecta el costo total

  try {
    // Guardar los datos de la calculadora
    const calculadora = await prisma.calculadora.create({
      data: {
        projectDuration,
        adminCost,
        locativeCost,
        machineryCost,
        materialCosts,
        otherCosts,
        totalCost,
        projectId,
      },
    });

    return NextResponse.json(calculadora, { status: 201 });
  } catch (error) {
    console.error('Error guardando la calculadora:', error);
    return NextResponse.json({ error: 'Error guardando la calculadora' }, { status: 500 });
  }
}
