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
  activeWhen: () => {
    // Solo activar si el contenedor está visible
    const container = document.getElementById('single-spa-application:home')
    return container && container.style.display !== 'none'
  }
})

// Registrar la aplicación IT
registerApplication({
  name: 'it',
  app: () => Promise.resolve(createIframeApp('https://it-g8e6.onrender.com', 'single-spa-application:it')),
  activeWhen: () => {
    const container = document.getElementById('single-spa-application:it')
    return container && container.style.display !== 'none'
  }
})

// Registrar la aplicación Gestión Humana
registerApplication({
  name: 'gestion-humana',
  app: () => Promise.resolve(createIframeApp('https://gh-8vga.onrender.com', 'single-spa-application:gestion-humana')),
  activeWhen: () => {
    const container = document.getElementById('single-spa-application:gestion-humana')
    return container && container.style.display !== 'none'
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
      ]
      containers.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.style.display = id.endsWith(data.module) ? 'block' : 'none'
      })

      // Ajustar ruta interna si se pasa path
      if (data.module === 'it') {
        const itContainer = document.getElementById('single-spa-application:it')
        if (itContainer) {
          const iframe = itContainer.querySelector('iframe')
          if (iframe) {
            const base = 'https://it-g8e6.onrender.com'
            const next = data.path ? `${base}${data.path}` : base
            iframe.src = next
          }
        }
      }

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
    }
  } catch (e) {
    console.error('Error handling postMessage navigation', e)
  }
})
