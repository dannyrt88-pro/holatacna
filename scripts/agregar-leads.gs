function agregarLeads() {
  var ss = SpreadsheetApp.openById("1nHhjU1xKTw9TAsdA6QxjHVgLVB9OvSjgcxv3udgK8mQ");
  var sheet = ss.getSheetByName("Pacientes");

  var leads = [
    ["HT-2026-0002", "22/03/2026", "César Valencia", "+56947099466", "", "Implantes + Carillas", "~22", "Pendiente", "", "", "", "NO", "", "", "Prospecto", "Esperando respuesta clínica sobre viabilidad. Quiere precio implantes titanio + carillas porcelana"],
    ["HT-2026-0003", "22/03/2026", "María Páez Rojas", "+56956447648", "", "Implantes", "4 o más", "Pendiente", "", "", "", "NO", "", "", "Prospecto", "Sin diagnóstico previo. Enviado mensaje con opciones de radiografía"],
    ["HT-2026-0004", "22/03/2026", "Víctor Cisternas", "+56956134968", "", "Implantes", "4 o más", "Pendiente", "", "", "", "NO", "", "", "Prospecto", "Sin diagnóstico previo. Enviado mensaje con opciones de radiografía"],
    ["HT-2026-0005", "22/03/2026", "Javier", "+56961097646", "Iquique", "Implantes", "4-6", "Pendiente", "15/04/2026", "21/04/2026", "SÍ", "NO", "", "", "Confirmado", "Viaje 15/04 regreso 21/04. Hotel y transporte tiene. Esperando radiografía"],
    ["HT-2026-0006", "22/03/2026", "Juan", "+56957823309", "", "Implantes", "Boca completa", "Pendiente", "", "", "", "NO", "", "", "Prospecto", "Sin respuesta aún"],
    ["HT-2026-0007", "22/03/2026", "", "+56984904644", "", "Implantes", "", "Pendiente", "", "", "", "NO", "", "", "Prospecto", "Sin respuesta aún"]
  ];

  // Actualizar HT-2026-0001 (Javier ya existe en fila 2) — cambiar estado a Confirmado
  sheet.getRange(2, 15).setValue("Confirmado");
  sheet.getRange(2, 16).setValue("Viaje 15/04 regreso 21/04. Hotel y transporte tiene. Esperando radiografía");

  // Agregar nuevos leads desde fila 3
  sheet.getRange(3, 1, leads.length, leads[0].length).setValues(leads);

  // Estilo filas alternas
  for (var i = 0; i < leads.length; i++) {
    var row = i + 3;
    var color = (i % 2 === 0) ? "#e8f0fe" : "#ffffff";
    sheet.getRange(row, 1, 1, 16).setBackground(color);
  }

  Logger.log("✅ " + leads.length + " leads agregados correctamente.");
}
