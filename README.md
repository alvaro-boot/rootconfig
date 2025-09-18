# Portal de Aplicaciones COOTRAVIR - Root Config

Esta es la configuración raíz del portal que integra los micro frontends usando Single SPA.

## Estructura

```
rootconfig/
├── index.html              # HTML principal
├── single-spa-config.js    # Configuración de Single SPA
├── package.json            # Configuración del proyecto raíz
├── vite.config.js          # Configuración de Vite
└── README.md              # Este archivo
```

## Instalación

Desde la carpeta `rootconfig`:

```bash
# Instalar dependencias del proyecto raíz
npm install

# Instalar dependencias de todas las aplicaciones
npm run install:all
```

## Desarrollo

Para ejecutar todas las aplicaciones en modo desarrollo:

```bash
npm run dev
```

Esto iniciará:
- **Home**: http://localhost:3000 (Aplicación principal)
- **IT**: http://localhost:3001 (Módulo de IT)
- **Gestión Humana**: http://localhost:3002 (Módulo de RRHH)
- **Portal**: http://localhost:8080 (Punto de entrada unificado)

## Navegación

- **Dashboard**: http://localhost:8080/ (Página principal)
- **IT**: http://localhost:8080/it (Módulo de IT)
- **Gestión Humana**: http://localhost:8080/gestion-humana (Módulo de RRHH)

## Scripts Disponibles

### Desarrollo
- `npm run dev`: Ejecuta todas las aplicaciones en modo desarrollo
- `npm run dev:home`: Solo la aplicación home
- `npm run dev:it`: Solo la aplicación IT
- `npm run dev:gestion-humana`: Solo la aplicación Gestión Humana
- `npm run dev:root`: Solo el servidor raíz

### Construcción
- `npm run build`: Construye todas las aplicaciones
- `npm run build:home`: Construye solo home
- `npm run build:it`: Construye solo IT
- `npm run build:gestion-humana`: Construye solo Gestión Humana
- `npm run build:root`: Construye solo el proyecto raíz

### Otros
- `npm run preview`: Vista previa de la aplicación construida
- `npm run install:all`: Instala dependencias de todas las aplicaciones

## Configuración de Single SPA

El archivo `single-spa-config.js` registra las aplicaciones:

1. **Home**: Aplicación principal que se carga en la ruta `/`
2. **IT**: Se carga cuando la ruta comienza con `/it`
3. **Gestión Humana**: Se carga cuando la ruta comienza con `/gestion-humana`

## Solución de Problemas

Si alguna aplicación no carga:

1. **Verifica que todos los servidores estén ejecutándose**:
   - Home: http://localhost:3000
   - IT: http://localhost:3001
   - Gestión Humana: http://localhost:3002

2. **Revisa la consola del navegador** para errores de CORS o carga de módulos

3. **Asegúrate de que las dependencias estén instaladas** en todas las aplicaciones

4. **Verifica que los puertos estén disponibles** y no estén siendo usados por otras aplicaciones

## Notas Importantes

- Cada micro frontend debe estar ejecutándose en su puerto correspondiente
- El portal raíz (puerto 8080) actúa como orquestador
- Las aplicaciones se cargan dinámicamente usando System.import()
- Cada aplicación mantiene su propio estado y router