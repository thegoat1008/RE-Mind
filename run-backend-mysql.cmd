@echo off
setlocal
set "REMIND_ROOT=%~dp0"
set "REMIND_ROOT=%REMIND_ROOT:~0,-1%"
rem Build outside OneDrive (same folder rule as start-community.ps1): OneDrive can block Gradle from cleaning backend\build.
for /f "usebackq delims=" %%k in (`powershell -NoProfile -Command "[BitConverter]::ToString([Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($env:REMIND_ROOT.ToLowerInvariant()))).Replace('-','').Substring(0,12)"`) do set "REMIND_KEY=%%k"
set "REMIND_BUILD=%LOCALAPPDATA%\remind-build\%REMIND_KEY%\backend"
cd /d "%REMIND_ROOT%\backend"
echo Starting the RE:MIND backend with local MySQL.
echo Build folder: %REMIND_BUILD%
echo Leave this terminal open. Press Ctrl+C to stop.
call "%REMIND_ROOT%\backend\gradlew.bat" --gradle-user-home "%REMIND_ROOT%\.gradle-user" bootRun "-PbuildDirOverride=%REMIND_BUILD%" --args="--spring.profiles.active=community-mysql"
if errorlevel 1 (
  echo.
  echo Backend startup failed. Copy the error message above for help.
  pause
)
