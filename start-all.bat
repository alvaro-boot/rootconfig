@echo off
echo Iniciando Portal de Aplicaciones COOTRAVIR...
echo.

echo Instalando dependencias del proyecto raíz...
call npm install
echo.

echo Instalando dependencias de todas las aplicaciones...
call npm run install:all
echo.

echo Iniciando todas las aplicaciones...
echo - Home: http://localhost:3000
echo - IT: http://localhost:3001  
echo - Gestión Humana: http://localhost:3002
echo - Portal: http://localhost:8080
echo.

call npm run dev

pause
