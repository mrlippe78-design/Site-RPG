param(
  [Parameter(Mandatory = $true)]
  [string]$Commit
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $root "index.html"
$shortCommit = $Commit.Substring(0, [Math]::Min(8, $Commit.Length))
$html = Get-Content -LiteralPath $indexPath -Raw -Encoding UTF8
$html = $html -replace '(<meta name="millennium-commit" content=")[^"]+(" />)', "`$1$shortCommit`$2"
Set-Content -LiteralPath $indexPath -Value $html -Encoding UTF8
Write-Host "Millennium build stamped with commit $shortCommit"
