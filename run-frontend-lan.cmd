@echo off
setlocal
cd /d "%~dp0frontend"
if not exist "node_modules\vite\bin\vite.js" (
  echo Frontend dependencies are missing. Run npm ci in the frontend folder first.
  pause
  exit /b 1
)
echo Starting the RE:MIND frontend for other devices on the same Wi-Fi.
echo Open http://THIS-PC-IP:5180/#/community on the other device.
echo Leave this terminal open. Press Ctrl+C to stop.
node node_modules/vite/bin/vite.js --mode community --host 0.0.0.0 --port 5180 --strictPort
if errorlevel 1 (
  echo.
  echo Frontend startup failed. Copy the error message above for help.
  pause
)
