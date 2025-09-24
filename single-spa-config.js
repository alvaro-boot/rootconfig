import { registerApplication, start } from 'single-spa'

// Función para crear una aplicación con iframe
const createIframeApp = (url, containerId) => {
  return {
    mount: () => {
      return new Promise((resolve) => {
        console.log(`Mounting ${containerId} with URL: ${url}`)
        const container = document.getElementById(containerId)
        if (container) {
          // Limpiar el contenedor primero
          container.innerHTML = ''
          
          // Crear el iframe
          const iframe = document.createElement('iframe')
          iframe.src = url
          iframe.style.width = '100%'
          iframe.style.height = '100vh'
          iframe.style.border = 'none'
          iframe.title = `Micro Frontend - ${containerId}`
          
          // Agregar event listeners para debugging
          iframe.onload = () => {
            console.log(`Iframe loaded successfully: ${url}`)
          }
          
          iframe.onerror = (error) => {
            console.error(`Error loading iframe ${url}:`, error)
            container.innerHTML = `
              <div style="padding: 20px; text-align: center; color: red;">
                <h3>Error cargando micro frontend</h3>
                <p>URL: ${url}</p>
                <p>Error: No se pudo cargar el contenido</p>
              </div>
            `
          }
          
          // Agregar el iframe al contenedor
          container.appendChild(iframe)
        } else {
          console.error(`Container not found: ${containerId}`)
        }
        resolve()
      })
    },
    unmount: () => {
      return new Promise((resolve) => {
        console.log(`Unmounting ${containerId}`)
        const container = document.getElementById(containerId)
        if (container) {
          container.innerHTML = ''
        }
        resolve()
      })
    }
  }
}

// Registrar la aplicación principal (home)
registerApplication({
  name: 'home',
  app: () => Promise.resolve(createIframeApp('https://home-1z8r.onrender.com', 'single-spa-application:home')),
  // Montar siempre el iframe al inicio para evitar pantallas en blanco
  activeWhen: () => true
})

// Registrar la aplicación IT
registerApplication({
  name: 'it',
  app: () => Promise.resolve(createIframeApp('https://it-g8e6.onrender.com', 'single-spa-application:it')),
  activeWhen: () => true
})

// Registrar la aplicación Gestión Humana
registerApplication({
  name: 'gestion-humana',
  app: () => Promise.resolve(createIframeApp('https://gh-8vga.onrender.com', 'single-spa-application:gestion-humana')),
  activeWhen: () => true
})

// Registrar la aplicación Operaciones
registerApplication({
  name: 'operaciones',
  app: () => Promise.resolve(createIframeApp('https://operaciones-1.onrender.com', 'single-spa-application:operaciones')),
  activeWhen: () => true
})

// Configurar Single SPA para forzar modo history (sin hash)
// Desactivar completamente el hash routing
window.addEventListener('beforeunload', function() {
  // Forzar limpieza de hash antes de cualquier navegación
  if (window.location.hash) {
    window.history.replaceState({}, '', window.location.pathname + window.location.search)
  }
})

// Iniciar Single SPA
start({
  urlRerouteOnly: true
})

// Escuchar mensajes desde los iframes para navegación cruzada
window.addEventListener('message', (event) => {
  try {
    const data = event.data || {}
    if (data.type === 'navigate' && data.module) {
      // Mostrar solo el contenedor del módulo destino
      const containers = [
        'single-spa-application:home',
        'single-spa-application:it',
        'single-spa-application:gestion-humana',
        'single-spa-application:operaciones',
      ]
      containers.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.style.display = id.endsWith(data.module) ? 'block' : 'none'
      })

      // Actualizar la URL del navegador (sin hash)
      const path = data.path || '/'
      const normalizedPath = path.startsWith('/') ? path : `/${path}`
      let newUrl = `/${data.module}${normalizedPath}`
      // Asegurar que no hay hash en la URL
      newUrl = newUrl.split('#')[0]
      
      // Usar history.replaceState para actualizar la URL sin recargar la página y eliminar el hash
      window.history.replaceState({}, '', newUrl)
      console.log(`URL actualizada a: ${newUrl}`)

      // No re-cargar el iframe al navegar; solo actualizar URL del parent

      if (data.module === 'home') {
        const homeContainer = document.getElementById('single-spa-application:home')
        if (homeContainer) {
          const iframe = homeContainer.querySelector('iframe')
          if (iframe) {
            const base = 'https://home-1z8r.onrender.com'
            const next = data.path ? `${base}${data.path}` : base
            iframe.src = next
          }
        }
      }

      if (data.module === 'gestion-humana') {
        const ghContainer = document.getElementById('single-spa-application:gestion-humana')
        if (ghContainer) {
          const iframe = ghContainer.querySelector('iframe')
          if (iframe) {
            const base = 'https://gh-8vga.onrender.com'
            const next = data.path ? `${base}${data.path}` : base
            iframe.src = next
          }
        }
      }

      if (data.module === 'operaciones') {
        const operacionesContainer = document.getElementById('single-spa-application:operaciones')
        if (operacionesContainer) {
          const iframe = operacionesContainer.querySelector('iframe')
          if (iframe) {
            const base = 'https://operaciones-1.onrender.com'
            const next = data.path ? `${base}${data.path}` : base
            iframe.src = next
          }
        }
      }
    }
  } catch (e) {
    console.error('Error handling postMessage navigation', e)
  }
})
