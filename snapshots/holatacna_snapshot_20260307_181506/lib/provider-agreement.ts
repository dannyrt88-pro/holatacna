type ProviderAgreementInput = {
  createdAt: string
  providerName: string
  representedEntity?: string | null
  serviceName: string
  whatsapp?: string | null
  email?: string | null
  cityScope?: string | null
  commissionRate?: number | null
  notes?: string | null
}

function safeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildProviderAgreementFilename(providerName: string) {
  const slug = providerName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `acuerdo-preliminar-${slug || 'proveedor'}.html`
}

export function buildProviderAgreementHtml(input: ProviderAgreementInput) {
  const commissionPercent = `${Math.round(Number(input.commissionRate || 0) * 100)}%`
  const renderedNotes = input.notes
    ? `<p><strong>Observaciones declaradas:</strong><br>${safeHtml(input.notes).replace(/\n/g, '<br>')}</p>`
    : ''

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Acuerdo preliminar HolaTacna</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 32px; }
      .sheet { max-width: 860px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 40px; box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12); }
      .badge { display: inline-block; border-radius: 999px; padding: 6px 12px; background: #dcfce7; color: #166534; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
      h1 { font-size: 32px; margin: 16px 0 8px; }
      h2 { font-size: 18px; margin: 28px 0 12px; }
      p, li { font-size: 15px; line-height: 1.7; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; }
      .grid strong { display: block; color: #334155; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
      .footer { margin-top: 36px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #475569; }
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="badge">Acuerdo preliminar</div>
      <h1>Registro comercial de proveedor HolaTacna</h1>
      <p>Fecha de emision: ${safeHtml(input.createdAt)}</p>
      <p>Este documento deja constancia del autoregistro comercial realizado por el proveedor o su representada dentro de la plataforma HolaTacna.</p>
      <div class="grid">
        <div><strong>Proveedor</strong>${safeHtml(input.providerName)}</div>
        <div><strong>Representada</strong>${safeHtml(input.representedEntity || input.providerName)}</div>
        <div><strong>Servicio principal</strong>${safeHtml(input.serviceName)}</div>
        <div><strong>Comision comercial declarada</strong>${safeHtml(commissionPercent)}</div>
        <div><strong>WhatsApp</strong>${safeHtml(input.whatsapp || 'No declarado')}</div>
        <div><strong>Correo</strong>${safeHtml(input.email || 'No declarado')}</div>
        <div><strong>Cobertura</strong>${safeHtml(input.cityScope || 'No declarada')}</div>
        <div><strong>Estado inicial</strong>Pendiente de revision interna</div>
      </div>
      <h2>Declaraciones del proveedor</h2>
      <ul>
        <li>La representada declara que los datos ingresados en el formulario son reales, vigentes y verificables.</li>
        <li>La representada acepta que HolaTacna puede validar, contrastar o solicitar sustento adicional antes de activar el perfil.</li>
        <li>La comision comercial declarada constituye una base de acuerdo formal para evaluacion comercial, sujeta a validacion final por HolaTacna.</li>
        <li>La asignacion de clientes o leads no depende de una autocalificacion del proveedor, sino del flujo operativo interno, la calificacion del cliente, la disponibilidad y la estrategia comercial de HolaTacna.</li>
        <li>El registro no implica activacion automatica ni garantia de derivacion inmediata.</li>
      </ul>
      <h2>Condicion operativa</h2>
      <p>HolaTacna opera con un modelo hibrido de gestion de leads. La derivacion puede mantenerse en revision manual o pasar a modos operativos especificos segun la calidad del caso, el servicio requerido y la disponibilidad validada del proveedor.</p>
      ${renderedNotes}
      <div class="footer">
        <p>Documento generado automaticamente por HolaTacna para respaldo comercial preliminar.</p>
      </div>
    </div>
  </body>
</html>`
}
