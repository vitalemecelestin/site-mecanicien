# ED-mécanique (ancienne adresse)

Le site du garage ED-mécanique (mécanique générale et carrosserie) a déménagé :
**https://ed-mecanique.github.io/**. Tout le site est maintenant dans le dépôt `ed-mecanique/ed-mecanique.github.io`.

Ce dépôt ne sert plus qu'à rediriger l'ancienne adresse, https://vitalemecelestin.github.io/site-mecanicien/, vers la
nouvelle. `docs/index.html` envoie aussitôt le visiteur sur ed-mecanique.github.io, en gardant l'ancre (par exemple
`#contact`), et demande à Google de ne pas référencer l'ancienne adresse.

```
docs/index.html   la page de redirection (GitHub Pages, dossier docs/)
ancien-site/      l'ancienne version de démonstration, gardée pour mémoire
```

Pour modifier le site, travailler dans le dépôt `ed-mecanique/ed-mecanique.github.io`, pas ici.
