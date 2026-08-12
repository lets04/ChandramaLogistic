type VercelRequest = {
  method?: string;
  body?: Record<string, unknown>;
};

type VercelResponse = {
  setHeader(name: string, value: string): VercelResponse;
  status(code: number): VercelResponse;
  json(body: unknown): void;
};

const SENDER = {
  name: "Chandrama Logistic S.R.L.",
  email: "contacto@chandramalogistic.com",
} as const;

const CHANDRAMA_EMAIL = "contacto@chandramalogistic.com";
const WEBSITE_URL = "https://www.chandramalogistic.com";

const LIMITS = {
  name: 200,
  email: 254,
  phone: 50,
  company: 200,
  message: 5000,
} as const;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function asTrimmedString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function renderStars(rating: number): string {
  const count = Math.min(5, Math.max(1, Math.round(rating)));
  return "⭐".repeat(count);
}

function emailLayout(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#1a1a2e;padding:24px 32px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">Chandrama Logistic S.R.L.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:#f4f6f8;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#64748b;line-height:1.6;">
                Chandrama Logistic S.R.L.<br>
                <a href="${WEBSITE_URL}" style="color:#1a1a2e;text-decoration:none;">${WEBSITE_URL}</a><br>
                <a href="mailto:${CHANDRAMA_EMAIL}" style="color:#1a1a2e;text-decoration:none;">${CHANDRAMA_EMAIL}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function dataRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;font-size:14px;color:#64748b;vertical-align:top;width:140px;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;font-size:14px;color:#1a1a2e;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

async function sendBrevoEmail(params: {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY not configured");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: SENDER,
      to: params.to,
      subject: params.subject,
      htmlContent: params.htmlContent,
      replyTo: params.replyTo,
    }),
  });

  const responseText = await response.text();

  console.log("[api/contact] Brevo status:", response.status);
  console.log("[api/contact] Brevo response:", responseText);

  if (!response.ok) {
    throw new Error(`Brevo API error: ${response.status} - ${responseText}`);
  }
}

function buildContactAdminEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  const body = `
    <h2 style="margin:0 0 16px;font-size:18px;color:#1a1a2e;">Nueva solicitud desde la web</h2>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${dataRow("Nombre", data.name)}
      ${dataRow("Correo", data.email)}
      ${dataRow("Teléfono", data.phone || "No especificado")}
    </table>
    <div style="margin-top:20px;padding:16px;background-color:#f4f6f8;border-radius:6px;border-left:4px solid #1a1a2e;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Mensaje</p>
      <p style="margin:0;font-size:14px;color:#1a1a2e;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>`;

  return emailLayout("Nueva solicitud desde la web", body);
}

function buildContactConfirmationEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  const body = `
    <p style="margin:0 0 16px;font-size:15px;color:#1a1a2e;line-height:1.6;">Hola <strong>${escapeHtml(data.name)}</strong>,</p>
    <p style="margin:0 0 16px;font-size:15px;color:#1a1a2e;line-height:1.6;">
      Gracias por comunicarte con Chandrama Logistic S.R.L.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#1a1a2e;line-height:1.6;">
      Hemos recibido correctamente tu solicitud. Nuestro equipo revisará la información y se pondrá en contacto contigo a la brevedad.
    </p>
    <div style="margin-bottom:24px;padding:16px;background-color:#f4f6f8;border-radius:6px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Resumen de tu solicitud</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        ${dataRow("Nombre", data.name)}
        ${dataRow("Correo", data.email)}
        ${dataRow("Teléfono", data.phone || "No especificado")}
      </table>
      <p style="margin:16px 0 0;font-size:14px;color:#1a1a2e;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
    <p style="margin:0;font-size:15px;color:#1a1a2e;line-height:1.6;">Atentamente,</p>
    <p style="margin:8px 0 0;font-size:15px;color:#1a1a2e;line-height:1.6;font-weight:600;">Chandrama Logistic S.R.L.</p>`;

  return emailLayout("Hemos recibido tu solicitud", body);
}

function buildCommentAdminEmail(data: {
  name: string;
  company: string;
  email: string;
  rating: number;
  message: string;
}): string {
  const body = `
    <h2 style="margin:0 0 16px;font-size:18px;color:#1a1a2e;">Nuevo comentario recibido desde la web</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#64748b;line-height:1.6;">
      Este comentario requiere revisión manual antes de considerar su publicación.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      ${dataRow("Nombre", data.name)}
      ${dataRow("Empresa", data.company || "No especificada")}
      ${dataRow("Correo", data.email)}
      ${dataRow("Calificación", `${renderStars(data.rating)} (${data.rating}/5)`)}
    </table>
    <div style="margin-top:20px;padding:16px;background-color:#f4f6f8;border-radius:6px;border-left:4px solid #1a1a2e;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Comentario</p>
      <p style="margin:0;font-size:14px;color:#1a1a2e;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    </div>`;

  return emailLayout("Nuevo comentario recibido desde la web", body);
}

function buildCommentConfirmationEmail(data: { name: string }): string {
  const body = `
    <p style="margin:0 0 16px;font-size:15px;color:#1a1a2e;line-height:1.6;">Hola <strong>${escapeHtml(data.name)}</strong>,</p>
    <p style="margin:0 0 16px;font-size:15px;color:#1a1a2e;line-height:1.6;">
      Muchas gracias por tomarte el tiempo de compartir tu opinión con Chandrama Logistic S.R.L.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#1a1a2e;line-height:1.6;">
      Valoramos mucho tus comentarios. Nos ayudan a conocer la experiencia de nuestros clientes y a seguir mejorando nuestros servicios.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#1a1a2e;line-height:1.6;">
      Hemos recibido correctamente tu comentario.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#1a1a2e;line-height:1.6;">
      Nuestro equipo revisará tu opinión antes de considerar cualquier publicación en nuestra página.
    </p>
    <p style="margin:0;font-size:15px;color:#1a1a2e;line-height:1.6;">Atentamente,</p>
    <p style="margin:8px 0 0;font-size:15px;color:#1a1a2e;line-height:1.6;font-weight:600;">Chandrama Logistic S.R.L.</p>`;

  return emailLayout("Gracias por compartir tu opinión", body);
}

async function handleContact(
  body: Record<string, unknown>,
): Promise<{ error?: string }> {
  const name = asTrimmedString(body.name, LIMITS.name);
  const email = asTrimmedString(body.email, LIMITS.email);
  const phone = asTrimmedString(body.phone, LIMITS.phone);
  const message = asTrimmedString(body.message, LIMITS.message);

  if (!name) return { error: "El nombre es obligatorio." };
  if (!email) return { error: "El correo electrónico es obligatorio." };
  if (!isValidEmail(email))
    return { error: "El correo electrónico no es válido." };
  if (!message) return { error: "El mensaje es obligatorio." };

  const data = { name, email, phone, message };
  const replyTo = { email, name };

  await sendBrevoEmail({
    to: [{ email: CHANDRAMA_EMAIL, name: "Chandrama Logistic S.R.L." }],
    subject: `Nueva solicitud desde la web - ${name}`,
    htmlContent: buildContactAdminEmail(data),
    replyTo,
  });

  await sendBrevoEmail({
    to: [{ email, name }],
    subject: "Hemos recibido tu solicitud - Chandrama Logistic S.R.L.",
    htmlContent: buildContactConfirmationEmail(data),
  });

  return {};
}

async function handleComment(
  body: Record<string, unknown>,
): Promise<{ error?: string }> {
  const name = asTrimmedString(body.name, LIMITS.name);
  const company = asTrimmedString(body.company, LIMITS.company);
  const email = asTrimmedString(body.email, LIMITS.email);
  const message = asTrimmedString(body.message, LIMITS.message);
  const ratingRaw = body.rating;
  const rating =
    typeof ratingRaw === "number"
      ? ratingRaw
      : typeof ratingRaw === "string"
        ? Number.parseInt(ratingRaw, 10)
        : NaN;

  if (!name) return { error: "El nombre es obligatorio." };
  if (!email) return { error: "El correo electrónico es obligatorio." };
  if (!isValidEmail(email))
    return { error: "El correo electrónico no es válido." };
  if (!message) return { error: "El comentario es obligatorio." };
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "La calificación debe ser entre 1 y 5." };
  }

  const data = { name, company, email, rating, message };
  const replyTo = { email, name };

  await sendBrevoEmail({
    to: [{ email: CHANDRAMA_EMAIL, name: "Chandrama Logistic S.R.L." }],
    subject: "Nuevo comentario recibido desde la web",
    htmlContent: buildCommentAdminEmail(data),
    replyTo,
  });

  await sendBrevoEmail({
    to: [{ email, name }],
    subject: "Gracias por compartir tu opinión - Chandrama Logistic S.R.L.",
    htmlContent: buildCommentConfirmationEmail({ name }),
  });

  return {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body ?? {};

  const website = asTrimmedString(body.website, 200);
  if (website) {
    return res.status(200).json({ success: true });
  }

  const type = body.type;

  try {
    if (type === "contact") {
      const result = await handleContact(body);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.status(200).json({ success: true });
    }

    if (type === "comment") {
      const result = await handleComment(body);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: "Tipo de formulario no válido." });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("[api/contact] ERROR:", message);

    return res.status(500).json({ error: "No se pudo enviar el mensaje." });
  }
}
