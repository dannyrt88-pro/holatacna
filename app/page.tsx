"use client"

import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)

  async function handleTestLead() {
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
          tourist_phone: "56912345678",
          preferred_date: "2026-03-15"
        })
      })

      const data = await response.json()

      if (data.reference_code) {
        const message = `Hola HolaTacna 👋
Quiero el descuento exclusivo.
Mi código es: ${data.reference_code}
Mi número es: 56912345678`

        const encodedMessage = encodeURIComponent(message)

        // Redirección directa (más estable que window.open)
        window.location.href = `https://wa.me/51927051003?text=${encodedMessage}`
      } else {
        alert("Error generando el código")
        console.log(data)
      }

    } catch (error) {
      console.error("Error:", error)
      alert("Ocurrió un error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <button
        onClick={handleTestLead}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition"
        disabled={loading}
      >
        {loading ? "Generando..." : "Obtener descuento por WhatsApp"}
      </button>
    </main>
  )
}