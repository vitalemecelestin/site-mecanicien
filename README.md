# ED-mécanique

Site vitrine du garage ED-mécanique : **mécanique générale et carrosserie**. Prix fait sur place, après inspection.
Sur rendez-vous ou premier arrivé, premier servi. Paiement comptant seulement.

En ligne : https://vitalemecelestin.github.io/site-mecanicien/ (GitHub Pages, dossier `docs/`).

```
docs/index.html             la page (une seule page, avec des sections)
docs/assets/css/style.css   le style : rouge, noir et blanc, typographie Barlow
docs/assets/js/site.js      menu mobile, en-tête au défilement, formulaire qui prépare un texto
docs/assets/img/            logo (favicon.svg) et photos (WebP)
ancien-site/                l'ancienne version de démonstration, gardée pour mémoire
```

Site statique, sans dépendance à installer. Pour le voir sur son poste :

```powershell
python -m http.server 5120 --directory docs
```

## Coordonnées affichées

- Téléphone et texto : **438 764-7365** (`docs/index.html` : rechercher `764-7365` et `4387647365` ;
  `docs/assets/js/site.js` : `TELEPHONE` et les deux messages).
- Heures : **de 8 h à 18 h**. Les jours ne sont pas encore précisés : le site n'en affiche pas, et les données
  pour Google n'ont pas d'`openingHours`.
- Paiement : **comptant seulement**.
- Secteur : « Montréal et environs », **provisoire**.

Tant que le secteur ou l'adresse ne sont pas confirmés, la ligne `<meta name="robots" content="noindex">`
de `docs/index.html` demande à Google de ne pas référencer le site. La retirer à ce moment-là.

## Le formulaire de rendez-vous

Aucun serveur et aucune donnée stockée. Sur téléphone, le bouton « Envoyer ma demande par texto » ouvre l'appli
Messages du client avec la demande déjà écrite (nom, téléphone, véhicule, service, date, remarques) : le client touche
Envoyer, et la demande arrive dans les textos du garage, avec le numéro du client pour lui répondre. Sur ordinateur,
le client copie le message.

## Photos

Photos libres de droits (licence Unsplash : usage gratuit, y compris commercial ; les auteurs sont cités dans le pied
de page) : Zanelle Lofty-Eaton, Christian Buehner, Zoshua Colah, Clark Van Der Beken, Tahamie Farooqui.
Aucune ne montre le visage d'une personne. Le mieux reste de les remplacer par de vraies photos de l'atelier.
