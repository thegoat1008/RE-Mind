param([switch]$NoBrowser, [ValidateSet('H2', 'MySQL')][string]$Database = 'H2')
$ErrorActionPreference = 'Stop'
$projectPath = $PSScriptRoot
$frontendPath = Join-Path $projectPath 'frontend'
$backendPath = Join-Path $projectPath 'backend'
$logPath = Join-Path $projectPath 'verification'
$statePath = Join-Path $projectPath '.community-processes.json'
$springProfile = if ($Database -eq 'MySQL') { 'community-mysql' } else { 'community-local' }
$nodeCommand = (Get-Command node -ErrorAction Stop).Source
$javaCommand = (Get-Command java -ErrorAction Stop).Source
foreach ($port in @(5180, 8081)) {
    if (Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue) {
        throw "Port $port is already in use. Stop the existing preview first."
    }
}
New-Item -ItemType Directory -Path $logPath -Force | Out-Null
Push-Location -LiteralPath $frontendPath
try {
    if (-not (Test-Path -LiteralPath 'node_modules/vite/bin/vite.js')) {
        $npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
        if ($npmCommand) { & $npmCommand.Source ci }
        else {
            $pnpmCommand = Get-Command pnpm.cmd -ErrorAction SilentlyContinue
            $bundledPnpm = Join-Path ([Environment]::GetFolderPath('UserProfile')) '.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm.cmd'
            if ($pnpmCommand) { & $pnpmCommand.Source install --frozen-lockfile --node-linker=hoisted --store-dir ../.pnpm-store }
            elseif (Test-Path -LiteralPath $bundledPnpm) { & $bundledPnpm install --frozen-lockfile --node-linker=hoisted --store-dir ../.pnpm-store }
            else { throw 'Install npm or pnpm, then retry.' }
        }
        if ($LASTEXITCODE -ne 0) { throw 'Frontend dependency installation failed.' }
    }
} finally { Pop-Location }
Push-Location -LiteralPath $backendPath
try {
    & .\gradlew.bat --gradle-user-home ..\.gradle-user bootJar --no-daemon
    if ($LASTEXITCODE -ne 0) { throw 'Backend build failed.' }
} finally { Pop-Location }
$jarPath = Join-Path $backendPath 'build/libs/remind-backend-0.0.1-SNAPSHOT.jar'
$vitePath = Join-Path $frontendPath 'node_modules/vite/bin/vite.js'
$backendProcess = Start-Process -FilePath $javaCommand -ArgumentList @('-jar', ('"' + $jarPath + '"'), "--spring.profiles.active=$springProfile") -WorkingDirectory $backendPath -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $logPath 'backend.out.log') -RedirectStandardError (Join-Path $logPath 'backend.err.log')
try {
    $frontendProcess = Start-Process -FilePath $nodeCommand -ArgumentList @(('"' + $vitePath + '"'), '--mode', 'community', '--host', '127.0.0.1', '--port', '5180', '--strictPort') -WorkingDirectory $frontendPath -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $logPath 'frontend.out.log') -RedirectStandardError (Join-Path $logPath 'frontend.err.log')
} catch {
    Stop-Process -Id $backendProcess.Id -ErrorAction SilentlyContinue
    throw
}
@(@{ id = $backendProcess.Id; marker = $jarPath }, @{ id = $frontendProcess.Id; marker = $vitePath }) | ConvertTo-Json | Set-Content -LiteralPath $statePath -Encoding UTF8
$ready = $false
for ($attempt = 0; $attempt -lt 35; $attempt++) {
    try {
        $health = Invoke-RestMethod 'http://127.0.0.1:8081/api/health' -TimeoutSec 2
        $page = Invoke-WebRequest 'http://127.0.0.1:5180/' -TimeoutSec 2
        if ($health.status -eq 'ok' -and $page.StatusCode -eq 200) { $ready = $true; break }
    } catch { Start-Sleep -Seconds 1 }
}
if (-not $ready) {
    & (Join-Path $projectPath 'stop-community.ps1')
    throw "Preview did not start. Check logs in $logPath"
}
Write-Host 'Community preview: http://127.0.0.1:5180/#/community'
if (-not $NoBrowser) { Start-Process 'http://127.0.0.1:5180/#/community' }
