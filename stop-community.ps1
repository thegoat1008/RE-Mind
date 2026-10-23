$ErrorActionPreference = 'Stop'
$statePath = Join-Path $PSScriptRoot '.community-processes.json'
if (-not (Test-Path -LiteralPath $statePath)) {
    Write-Host 'No processes started by start-community.ps1 were recorded.'
    return
}
$records = Get-Content -LiteralPath $statePath -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($record in $records) {
    $processInfo = Get-CimInstance Win32_Process -Filter "ProcessId = $([int]$record.id)" -ErrorAction SilentlyContinue
    # Check the command line before stopping a potentially reused process ID.
    if ($processInfo -and $processInfo.CommandLine -and $processInfo.Name -in @('java.exe', 'node.exe') -and $processInfo.CommandLine.Contains([string]$record.marker) -and ([string]$record.marker).StartsWith($PSScriptRoot, [StringComparison]::OrdinalIgnoreCase)) {
        Stop-Process -Id ([int]$record.id)
    }
}
Remove-Item -LiteralPath $statePath
Write-Host 'Recorded community preview processes stopped.'
