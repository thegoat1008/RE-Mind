@echo off
setlocal
cd /d "%~dp0backend"
echo Starting the RE:MIND backend with local MySQL.
echo Leave this terminal open. Press Ctrl+C to stop.
call gradlew.bat --gradle-user-home ..\.gradle-user bootRun --args="--spring.profiles.active=community-mysql"
if errorlevel 1 (
  echo.
  echo Backend startup failed. Copy the error message above for help.
  pause
)
