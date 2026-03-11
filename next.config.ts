import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/implantes-dentales',
        destination: '/implantes-dentales-tacna',
        permanent: true,
      },
      {
        source: '/estetica',
        destination: '/estetica-tacna',
        permanent: true,
      },
      {
        source: '/dermatologia',
        destination: '/dermatologia-tacna',
        permanent: true,
      },
      {
        source: '/oftalmologia',
        destination: '/operacion-ojos-tacna',
        permanent: true,
      },
      {
        source: '/arica/implantes-dentales-tacna',
        destination: '/arica/implantes-dentales',
        permanent: true,
      },
      {
        source: '/arica/operacion-ojos-tacna',
        destination: '/arica/operacion-ojos',
        permanent: true,
      },
      {
        source: '/arica/estetica-tacna',
        destination: '/arica/estetica',
        permanent: true,
      },
      {
        source: '/arica/oftalmologia',
        destination: '/arica/operacion-ojos',
        permanent: true,
      },
      {
        source: '/iquique/operacion-ojos-tacna',
        destination: '/iquique/operacion-ojos',
        permanent: true,
      },
      {
        source: '/iquique/estetica-tacna',
        destination: '/iquique/estetica',
        permanent: true,
      },
      {
        source: '/iquique/dermatologia-tacna',
        destination: '/iquique/dermatologia',
        permanent: true,
      },
      {
        source: '/antofagasta/implantes-dentales-tacna',
        destination: '/antofagasta/implantes-dentales',
        permanent: true,
      },
      {
        source: '/antofagasta/estetica-tacna',
        destination: '/antofagasta/estetica',
        permanent: true,
      },
      {
        source: '/antofagasta/dermatologia-tacna',
        destination: '/antofagasta/dermatologia',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
