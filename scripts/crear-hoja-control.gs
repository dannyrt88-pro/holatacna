function crearHojaControl() {
  var ss = SpreadsheetApp.create("HolaTacna — Control de Pacientes");
  var sheet = ss.getActiveSheet();
  sheet.setName("Pacientes");

  // --- ENCABEZADOS ---
  var headers = [
    "Código HT", "Fecha registro", "Nombre", "Teléfono", "Ciudad origen",
    "Tratamiento", "N° implantes", "Radiografía", "Fecha viaje", "Fecha regreso",
    "Hotel/transporte", "Cita confirmada", "Monto estimado (S/)", "Comisión HT (S/)",
    "Estado", "Observaciones"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // --- ESTILO ENCABEZADOS ---
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#1a73e8");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");

  // --- ANCHOS DE COLUMNA ---
  var widths = [110, 120, 150, 140, 120, 130, 110, 110, 110, 110, 130, 130, 150, 130, 120, 200];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }

  // --- FILA CONGELADA ---
  sheet.setFrozenRows(1);

  // --- PRIMER REGISTRO: JAVIER ---
  var hoy = Utilities.formatDate(new Date(), "America/Lima", "dd/MM/yyyy");
  var row1 = [
    "HT-2026-0001", hoy, "Javier", "+56 9 6109 7646", "Iquique",
    "Implantes", "4-6", "Pendiente", "15/04/2026", "21/04/2026",
    "SÍ", "NO", "", "",
    "Prospecto", "Viaja desde Iquique. Hotel y transporte tiene. Esperando radiografía."
  ];
  sheet.getRange(2, 1, 1, row1.length).setValues([row1]);

  // --- ESTILO FILA 1 DE DATOS ---
  sheet.getRange(2, 1, 1, headers.length).setBackground("#e8f0fe");

  // --- VALIDACIÓN: columna Radiografía (col 8) ---
  var radioRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["SÍ", "NO", "Pendiente"], true).build();
  sheet.getRange(2, 8, 100, 1).setDataValidation(radioRule);

  // --- VALIDACIÓN: Hotel/transporte (col 11) ---
  var hotelRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["SÍ", "NO", "Coordinar"], true).build();
  sheet.getRange(2, 11, 100, 1).setDataValidation(hotelRule);

  // --- VALIDACIÓN: Cita confirmada (col 12) ---
  var citaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["SÍ", "NO"], true).build();
  sheet.getRange(2, 12, 100, 1).setDataValidation(citaRule);

  // --- VALIDACIÓN: Estado (col 15) ---
  var estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Prospecto", "Confirmado", "Atendido", "Cobrado", "Cancelado"], true).build();
  sheet.getRange(2, 15, 100, 1).setDataValidation(estadoRule);

  // --- FORMATO MONEDA columnas 13 y 14 ---
  sheet.getRange(2, 13, 100, 2).setNumberFormat('"S/"#,##0.00');

  // --- FORMATO FECHAS columnas 9 y 10 ---
  sheet.getRange(2, 9, 100, 2).setNumberFormat("dd/MM/yyyy");

  // --- BORDES ---
  sheet.getRange(1, 1, 101, headers.length)
    .setBorder(true, true, true, true, true, true, "#dadce0", SpreadsheetApp.BorderStyle.SOLID);

  // --- LINK en consola ---
  Logger.log("✅ Hoja creada: " + ss.getUrl());
  SpreadsheetApp.getUi().alert("✅ Hoja creada correctamente.\n\nURL: " + ss.getUrl());
}
