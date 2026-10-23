@echo off
setlocal
cd /d "%~dp0frontend"
if not exist "node_modules\vite\bin\vite.js" (
  echo Frontend dependencies are missing. Run npm ci in the frontend folder first.
  pause
  exit /b 1
)
echo Starting the RE:MIND frontend.
echo Leave this terminal open. Press Ctrl+C to stop.
node node_modules/vite/bin/vite.js --mode community --host 127.0.0.1 --port 5180 --strictPort
if errorlevel 1 (
  echo.
  echo Frontend startup failed. Copy the error message above for help.
  pause
)
