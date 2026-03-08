type TelegramLeadNotification = {
  id?: string | null
  reference_code?: string | null
  name?: string | null
  tourist_phone?: string | null
  service_name?: string | null
  city_interest?: string | null
  landing_path?: string | null
  preferred_date?: string | null
  provider_phone?: string | null
  provider_name?: string | null
  message?: string | null
}

function escapeTelegram(text: string) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&")
}

function buildLeadMessage(lead: TelegramLeadNotification) {
  const lines = [
    "Nuevo lead comercial de HolaTacna",
    "",
    lead.reference_code ? `Referencia: ${lead.reference_code}` : null,
    lead.service_name ? `Servicio: ${lead.service_name}` : null,
    lead.name ? `Paciente o cliente: ${lead.name}` : null,
    lead.tourist_phone ? `Telefono: ${lead.tourist_phone}` : null,
    lead.city_interest ? `Ciudad de interes: ${lead.city_interest}` : null,
    lead.preferred_date ? `Fecha preferida: ${lead.preferred_date}` : null,
    lead.landing_path ? `Landing origen: ${lead.landing_path}` : null,
    lead.provider_phone ? `Proveedor asignado: ${lead.provider_phone}` : "Proveedor asignado: pendiente",
    "",
    lead.message ? `Detalle del caso: ${lead.message}` : "Detalle del caso: sin mensaje adicional",
    "",
    "Accion sugerida: revisar en dashboard y contactar por WhatsApp.",
  ].filter(Boolean) as string[]

  return lines.map(escapeTelegram).join("\n")
}

export async function notifyTelegramLead(lead: TelegramLeadNotification) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildLeadMessage(lead),
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram error: ${response.status} ${body}`)
  }
}

export async function notifyTelegramDirectLead(lead: TelegramLeadNotification) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return
  }

  const lines = [
    "Lead confirmado en modo DIRECTO",
    "",
    lead.reference_code ? `Referencia: ${lead.reference_code}` : null,
    lead.service_name ? `Servicio: ${lead.service_name}` : null,
    lead.name ? `Paciente o cliente: ${lead.name}` : null,
    lead.tourist_phone ? `Telefono: ${lead.tourist_phone}` : null,
    lead.city_interest ? `Ciudad: ${lead.city_interest}` : null,
    lead.provider_name ? `Proveedor: ${lead.provider_name}` : null,
    lead.provider_phone ? `Telefono proveedor: ${lead.provider_phone}` : null,
    lead.landing_path ? `Landing origen: ${lead.landing_path}` : null,
    "",
    "Accion: enviar al proveedor y monitorear cierre.",
  ].filter(Boolean) as string[]

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.map(escapeTelegram).join("\n"),
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Telegram error: ${response.status} ${body}`)
  }
}
