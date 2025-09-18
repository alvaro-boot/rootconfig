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
  activeWhen: location => location.pathname === '/' || location.pathname.startsWith('/home')
})

// Registrar la aplicación IT
registerApplication({
  name: 'it',
  app: () => Promise.resolve(createIframeApp('https://it-g8e6.onrender.com', 'single-spa-application:it')),
  activeWhen: location => location.pathname.startsWith('/it')
})

// Registrar la aplicación Gestión Humana
registerApplication({
  name: 'gestion-humana',
  app: () => Promise.resolve(createIframeApp('https://gh-8vga.onrender.com', 'single-spa-application:gestion-humana')),
  activeWhen: location => location.pathname.startsWith('/gestion-humana')
})

// Iniciar Single SPA
start({
  urlRerouteOnly: true
})
