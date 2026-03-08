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
    href: "/dermatologia",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "estetica",
    name: "Estetica",
    shortDescription: "Tratamientos esteticos con coordinacion previa y soporte comercial.",
    href: "/estetica",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "oftalmologia",
    name: "Oftalmologia",
    shortDescription: "Evaluacion oftalmologica y coordinacion para clientes de Arica y Chile.",
    href: "/oftalmologia",
    category: "clinico",
    priority: "high",
  },
  {
    slug: "implantes-dentales",
    name: "Implantes Dentales",
    shortDescription: "Implantes dentales y tratamientos odontologicos con proveedores verificados.",
    href: "/implantes-dentales",
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
