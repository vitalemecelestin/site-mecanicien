# Construit la version en ligne (docs/index.html) a partir de index.html.
# index.html reste la source (aussi publiee en page Claude) ; GitHub Pages sert le dossier docs/.
$ici = $PSScriptRoot
$source = [IO.File]::ReadAllText("$ici\index.html", [Text.Encoding]::UTF8)
# Tant que le vrai nom et le vrai numero ne sont pas choisis, on demande a Google de ne pas indexer le site.
$entete = "<!doctype html>`n<html lang=`"fr`">`n<meta name=`"robots`" content=`"noindex`">`n"
New-Item -ItemType Directory -Force "$ici\docs" | Out-Null
[IO.File]::WriteAllText("$ici\docs\index.html", $entete + $source + "`n</html>`n", (New-Object Text.UTF8Encoding $false))
New-Item -ItemType File -Force "$ici\docs\.nojekyll" | Out-Null
"docs/index.html construit"
