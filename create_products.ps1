$csv = Get-Content 'C:\xampp\htdocs\Astro\previar\inventario.csv' -Encoding UTF8 | Select-Object -Skip 1
$outputDir = 'C:\xampp\htdocs\Astro\previar\src\content\products'

foreach ($line in $csv) {
    $fields = $line -split ';'
    $id = $fields[0].Trim()
    $marca = $fields[1].Trim()
    $categoria = $fields[2].Trim()
    $estuche = $fields[3].Trim()
    $variante = $fields[4].Trim()
    $tamano = $fields[5].Trim()
    $proveedor = $fields[6].Trim()
    $precioCosto = [decimal]($fields[7].Trim())
    $precioMayoristaRaw = $fields[8].Trim()
    $precioMayorista = 0
    if ($precioMayoristaRaw -notmatch '#') {
        $precioMayorista = [decimal]$precioMayoristaRaw
    }
    $precioMinorista = [decimal]($fields[9].Trim())
    $fechaPrecio = $fields[10].Trim()
    $descuentoRaw = $fields[11].Trim()
    $descuento = 0
    if ($descuentoRaw -match '^\d+$') {
        $descuento = [decimal]$descuentoRaw
    }
    $stock = $fields[12].Trim()
    if ($stock -eq 'true') { $stock = 'true' } else { $stock = 'false' }

    $content = @"
---
marca: $marca
categoria: $categoria
estuche: $estuche
variante: $variante
tamano: `"$tamano`"
proveedor: $proveedor
precioCosto: $precioCosto
precioMayorista: $precioMayorista
precioMinorista: $precioMinorista
fechaPrecio: $fechaPrecio
descuento: $descuento
stock: $stock
---
"@

    $filePath = Join-Path $outputDir "$id.md"
    [System.IO.File]::WriteAllText($filePath, $content, (New-Object System.Text.UTF8Encoding $false))
}

Write-Host "Created 192 product files"