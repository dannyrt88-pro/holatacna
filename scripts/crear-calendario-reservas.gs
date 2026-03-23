function crearCalendarioReservas() {
  // 1. Crear o reutilizar el calendario
  var calName = "HolaTacna — Reservas";
  var calendars = CalendarApp.getCalendarsByName(calName);
  var cal = calendars.length > 0 ? calendars[0] : CalendarApp.createCalendar(calName, {
    color: CalendarApp.Color.CYAN,
    summary: "Reservas de pacientes HolaTacna"
  });

  Logger.log("📅 Calendario: " + cal.getName() + " | ID: " + cal.getId());

  // 2. Leer hoja de pacientes
  var ss = SpreadsheetApp.openById("1nHhjU1xKTw9TAsdA6QxjHVgLVB9OvSjgcxv3udgK8mQ");
  var sheet = ss.getSheetByName("Pacientes");
  var data = sheet.getDataRange().getValues();

  var creados = 0;
  var saltados = 0;

  // Fila 0 = encabezados, datos desde fila 1
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var codigo    = row[0];  // Código HT
    var nombre    = row[2];  // Nombre
    var telefono  = row[3];  // Teléfono
    var ciudad    = row[4];  // Ciudad origen
    var trat      = row[5];  // Tratamiento
    var implantes = row[6];  // N° implantes
    var fechaViajeRaw   = row[8];  // Fecha viaje
    var fechaRegresoRaw = row[9];  // Fecha regreso
    var estado    = row[14]; // Estado
    var obs       = row[15]; // Observaciones

    // Saltar si no hay fecha de viaje o fila vacía
    if (!codigo || !fechaViajeRaw) { saltados++; continue; }

    // Parsear fechas (formato dd/MM/yyyy o Date de Sheets)
    var fechaViaje   = parsearFecha(fechaViajeRaw);
    var fechaRegreso = parsearFecha(fechaRegresoRaw);

    if (!fechaViaje) { saltados++; continue; }

    // Si no hay fecha regreso, usar mismo día
    if (!fechaRegreso) fechaRegreso = new Date(fechaViaje.getTime());
    // Sumar 1 día al regreso para que sea evento de todo el día inclusivo
    fechaRegreso.setDate(fechaRegreso.getDate() + 1);

    // Verificar si ya existe un evento con el mismo título
    var titulo = "[" + codigo + "] " + nombre + " — " + trat;
    var existentes = cal.getEvents(fechaViaje, fechaRegreso, { search: codigo });
    if (existentes.length > 0) { saltados++; continue; }

    // Descripción del evento
    var desc = "📱 " + telefono +
               "\n🌆 Ciudad: " + (ciudad || "No especificada") +
               "\n🦷 Tratamiento: " + trat + (implantes ? " (" + implantes + ")" : "") +
               "\n📋 Estado: " + estado +
               "\n📝 " + (obs || "");

    // Crear evento de todo el día
    cal.createAllDayEvent(titulo, fechaViaje, fechaRegreso, {
      description: desc,
      location: "Tacna, Perú"
    });

    Logger.log("✅ Evento creado: " + titulo);
    creados++;
  }

  Logger.log("📊 Total creados: " + creados + " | Saltados: " + saltados);
  Logger.log("🔗 URL Calendario: https://calendar.google.com/calendar/r?cid=" + cal.getId());
}

function parsearFecha(valor) {
  if (!valor) return null;
  if (valor instanceof Date) return valor;
  // Formato dd/MM/yyyy
  var partes = String(valor).split("/");
  if (partes.length === 3) {
    return new Date(partes[2], partes[1] - 1, partes[0]);
  }
  return null;
}

// Ejecutar esta función para compartir el calendario con MonteCarlo
function compartirCalendario() {
  var calName = "HolaTacna — Reservas";
  var calendars = CalendarApp.getCalendarsByName(calName);
  if (calendars.length === 0) {
    Logger.log("❌ Calendario no encontrado. Ejecuta crearCalendarioReservas primero.");
    return;
  }
  var cal = calendars[0];

  // Reemplaza con el email de MonteCarlo
  var emailMonteCarlo = "CORREO_MONTECARLO@gmail.com";

  // Compartir vía Advanced Calendar Service (necesita habilitarse)
  // Por ahora: mostrar URL para compartir manualmente
  Logger.log("✅ Calendario listo: " + cal.getName());
  Logger.log("🔗 ID: " + cal.getId());
  Logger.log("👉 Para compartir: abre Google Calendar → Configuración del calendario → Compartir con personas específicas → agrega " + emailMonteCarlo);
}
