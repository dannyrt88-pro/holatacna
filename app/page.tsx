"use client"

import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)

  async function createLead(category: string) {
    try {
      setLoading(true)

      const response = await fetch("/api/create-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service_id: null,
          provider_id: null,
          tourist_phone: "Pendiente",
          preferred_date: null
        })
      })

      const data = await response.json()

      if (data.reference_code) {
        const message = `Hola HolaTacna 👋
Estoy interesado en el servicio de ${category}.
Mi código es: ${data.reference_code}`

        const encodedMessage = encodeURIComponent(message)

        window.location.href = `https://wa.me/51927051003?text=${encodedMessage}`
      }

    } catch (error) {
      console.error(error)
      alert("Ocurrió un error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Atención médica y servicios confiables en Tacna
        </h1>
        <p className="text-lg mb-6">
          Descuentos exclusivos para turistas en salud, estética y más.
        </p>
        <button
          onClick={() => createLead("Asesoría General")}
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Solicitar asesoría por WhatsApp
        </button>
      </section>

      {/* SALUD DESTACADA */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">
          Salud & Estética Destacada
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {["Implantes Dentales", "Oftalmología", "Estética", "Dermatología"].map((service) => (
            <div key={service} className="border rounded-2xl p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">{service}</h3>
              <p className="text-gray-600 mb-4">
                Atención profesional con descuentos exclusivos para turistas.
              </p>
              <button
                onClick={() => createLead(service)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Consultar disponibilidad
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* MULTISERVICIOS */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
          Otros Servicios en Tacna
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {["Traslados Frontera", "Hospedaje", "Restaurantes", "Tours", "Compras Guiadas", "Farmacias"].map((service) => (
            <div key={service} className="bg-white border rounded-xl p-5 shadow hover:shadow-md transition text-center">
              <h3 className="font-semibold mb-3">{service}</h3>
              <button
                onClick={() => createLead(service)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Solicitar información
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white text-center py-6">
        © {new Date().getFullYear()} HolaTacna.com — Tu asistente confiable en Tacna
      </footer>

    </main>
  )
}