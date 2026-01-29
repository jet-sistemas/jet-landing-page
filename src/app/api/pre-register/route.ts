import {
  appendToSheet,
  checkDuplicate,
  recoverData,
} from "@/lib/google-sheets";
import { PreRegisterForm } from "@/types/validations/pre-register-form";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PreRegisterForm;
    const {
      type,
      name,
      cpf,
      whatsapp,
      representativeName,
      representativeWhatsapp,
      companyCnpj,
    } = body;

    const data = {
      date: new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      }),
      type: recoverData(type, "ASSOCIADO", "PATROCINADOR"),
      name: recoverData(type, name, representativeName),
      identifier: recoverData(type, cpf, companyCnpj),
      whatsapp: recoverData(type, whatsapp, representativeWhatsapp),
    };

    const duplicateCheck = await checkDuplicate(data.identifier, data.whatsapp);

    if (duplicateCheck.exists) {
      return NextResponse.json(
        {
          success: true,
          message: "Cadastrado com sucesso!",
        },
        { status: 200 }
      );
    }

    const values = [
      [data.date, data.type, data.name, data.identifier, data.whatsapp],
    ];

    await appendToSheet(values);

    return NextResponse.json(
      { success: true, message: "Pré-cadastro enviado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao salvar no Google Sheets:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao processar o pré-cadastro" },
      { status: 500 }
    );
  }
}
