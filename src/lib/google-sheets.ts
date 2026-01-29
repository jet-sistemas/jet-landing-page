import { PartnerType } from "@/types/validations/pre-register-form";
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = process.env.GOOGLE_SHEET_RANGE;

export async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export function recoverData(
  type: PartnerType,
  first: string | undefined,
  second: string | undefined
): string {
  if (type === "associado") return first!;
  return second!;
}

export async function checkDuplicate(
  identifier: string,
  whatsapp: string
): Promise<{ exists: boolean; message?: string }> {
  try {
    const sheets = await getGoogleSheetsClient();

    // Buscar apenas as colunas D (índice 3) e E (índice 4) - muito mais eficiente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${RANGE}!D:E`, // Apenas colunas D e E
    });

    const rows = response.data.values || [];

    // Pular o cabeçalho (primeira linha) se existir
    const dataRows = rows.slice(1);

    // Normalizar os valores para comparação (remover formatação)
    const normalizeValue = (value: string) => {
      return value?.replace(/\D/g, "") || ""; // Remove tudo que não é dígito
    };

    const normalizedIdentifier = normalizeValue(identifier);
    const normalizedWhatsapp = normalizeValue(whatsapp);

    // Verificar duplicatas
    for (const row of dataRows) {
      // row[0] = coluna D (CPF/CNPJ), row[1] = coluna E (WhatsApp)
      const existingIdentifier = row[0] ? normalizeValue(row[0]) : "";
      const existingWhatsapp = row[1] ? normalizeValue(row[1]) : "";

      if (normalizedIdentifier && existingIdentifier === normalizedIdentifier) {
        return {
          exists: true,
          message: "Já existe um cadastro com este CPF/CNPJ.",
        };
      }

      if (normalizedWhatsapp && existingWhatsapp === normalizedWhatsapp) {
        return {
          exists: true,
          message: "Já existe um cadastro com este WhatsApp.",
        };
      }
    }

    return { exists: false };
  } catch (error) {
    console.error("Erro ao verificar duplicatas:", error);
    // Em caso de erro na verificação, permitir o cadastro
    return { exists: false };
  }
}

export async function appendToSheet(values: string[][]): Promise<void> {
  const sheets = await getGoogleSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}
