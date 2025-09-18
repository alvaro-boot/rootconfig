Write-Host "Iniciando Portal de Aplicaciones COOTRAVIR..." -ForegroundColor Green
Write-Host ""

Write-Host "Instalando dependencias del proyecto raíz..." -ForegroundColor Yellow
npm install
Write-Host ""

Write-Host "Instalando dependencias de todas las aplicaciones..." -ForegroundColor Yellow
npm run install:all
Write-Host ""

Write-Host "Iniciando todas las aplicaciones..." -ForegroundColor Cyan
Write-Host "- Home: http://localhost:3000" -ForegroundColor White
Write-Host "- IT: http://localhost:3001" -ForegroundColor White
Write-Host "- Gestión Humana: http://localhost:3002" -ForegroundColor White
Write-Host "- Portal: http://localhost:8080" -ForegroundColor White
Write-Host ""

npm run dev
