export type ServiceDefinition = {
  slug: string
  name: string
  shortDescription: string
  href: string
  category: "clinico" | "turismo" | "logistica" | "comercio"
  priority: "high" | "normal"
}

export const services: ServiceDefinition[] = [
  {
    slug: "dermatologia",
    name: "Dermatologia",
    shortDescription: "Evaluacion dermatologica y cuidado de la piel para clientes de Chile.",
    href: "/dermatologia-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "estetica",
    name: "Estetica",
    shortDescription: "Tratamientos esteticos con coordinacion previa y soporte comercial.",
    href: "/estetica-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "oftalmologia",
    name: "Oftalmologia",
    shortDescription: "Evaluacion oftalmologica y coordinacion para clientes de Arica y Chile.",
    href: "/operacion-ojos-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "lasik",
    name: "Lasik",
    shortDescription: "Cirugia refractiva con orientacion previa para pacientes de Chile que evaluan correccion visual en Tacna.",
    href: "/lasik-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "implantes-dentales",
    name: "Implantes Dentales",
    shortDescription: "Implantes dentales y tratamientos odontologicos con proveedores verificados.",
    href: "/implantes-dentales-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "ortodoncia",
    name: "Ortodoncia",
    shortDescription: "Brackets y alineadores con orientacion previa para pacientes de Chile.",
    href: "/ortodoncia-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "carillas-dentales",
    name: "Carillas dentales",
    shortDescription: "Carillas dentales y diseno de sonrisa con informacion clara antes de viajar.",
    href: "/carillas-dentales-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "cirugia-plastica",
    name: "Cirugia plastica",
    shortDescription: "Orientacion inicial para cirugia plastica en Tacna con evaluacion previa y apoyo antes del viaje.",
    href: "/cirugia-plastica-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "rinoplastia",
    name: "Rinoplastia",
    shortDescription: "Informacion inicial para pacientes que comparan rinoplastia en Tacna antes de viajar desde Chile.",
    href: "/rinoplastia-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "tratamiento-acne",
    name: "Tratamiento de acne",
    shortDescription: "Opciones dermatologicas para acne con orientacion previa y apoyo antes del viaje a Tacna.",
    href: "/tratamiento-acne-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "botox",
    name: "Botox",
    shortDescription: "Medicina estetica facial con orientacion previa para pacientes chilenos que evaluan botox en Tacna.",
    href: "/botox-tacna",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "hoteles",
    name: "Hoteles",
    shortDescription: "Hospedaje en Tacna con apoyo comercial para reservas y derivacion a hoteles.",
    href: "/hoteles",
    category: "turismo",
    priority: "normal",
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    shortDescription: "Reservas, experiencias gastronomicas y apoyo comercial para restaurantes en Tacna.",
    href: "/restaurants",
    category: "turismo",
    priority: "normal",
  },
  {
    slug: "transporte",
    name: "Transporte",
    shortDescription: "Traslados, movilidad y transporte privado con coordinacion comercial en Tacna.",
    href: "/transporte",
    category: "logistica",
    priority: "normal",
  },
  {
    slug: "compras-por-mayor",
    name: "Compras por mayor",
    shortDescription: "Abastecimiento, volumen y conexion con distribuidores o mayoristas confiables.",
    href: "/compras-por-mayor",
    category: "comercio",
    priority: "normal",
  },
  {
    slug: "alquiler-departamentos",
    name: "Alquiler de Departamentos",
    shortDescription: "Alojamientos temporales y departamentos equipados para viajes o estadias prolongadas.",
    href: "/alquiler-departamentos",
    category: "turismo",
    priority: "normal",
  },
]

export const serviceNameBySlug = services.reduce<Record<string, string>>(
  (acc, service) => {
    acc[service.slug] = service.name
    return acc
  },
  {}
)
