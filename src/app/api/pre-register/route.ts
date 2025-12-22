import { PartnerType } from "@/types/validations/PreRegisterForm";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = "primeiros-leads";

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

function recoverData(type: PartnerType, first: string, second: string) {
  if (type === "associado") return first;
  return second;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    const values = [
      [data.date, data.type, data.name, data.identifier, data.whatsapp],
    ];

    const sheets = await getGoogleSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

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
