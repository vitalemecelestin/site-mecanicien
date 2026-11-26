// ED-mécanique : menu mobile, en-tête au défilement et formulaire qui prépare un texto.
// Aucune donnée n'est envoyée ailleurs : le message part du téléphone du client, vers le garage.

const TELEPHONE = "+14387647365"; // numéro du garage (à changer aussi dans index.html, voir README.md)

const $ = (s) => document.querySelector(s);

// Menu mobile
const burger = $("#burger");
const menu = $("#menu");
const fermerMenu = () => {
  menu.classList.remove("ouvert");
  burger.setAttribute("aria-expanded", "false");
};
burger.addEventListener("click", () => {
  const ouvert = menu.classList.toggle("ouvert");
  burger.setAttribute("aria-expanded", String(ouvert));
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fermerMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("ouvert")) {
    fermerMenu();
    burger.focus();
  }
});

// Ombre de l'en-tête dès que la page défile
const entete = $("#entete");
const surDefilement = () => entete.classList.toggle("defile", window.scrollY > 8);
window.addEventListener("scroll", surDefilement, { passive: true });
surDefilement();

// Année du pied de page
$("#annee").textContent = String(new Date().getFullYear());

// Les boutons « Réserver en mécanique / carrosserie » choisissent le service du formulaire
document.querySelectorAll("[data-service]").forEach((lien) => {
  lien.addEventListener("click", () => { $("#f-service").value = lien.dataset.service; });
});

// Date souhaitée : pas avant aujourd'hui
const aujourdhui = new Date();
aujourdhui.setMinutes(aujourdhui.getMinutes() - aujourdhui.getTimezoneOffset());
$("#f-date").min = aujourdhui.toISOString().slice(0, 10);

// Formulaire : prépare le message, à envoyer par texto (ou à copier)
const formulaire = $("#formulaire");
const obligatoires = ["#f-nom", "#f-tel", "#f-auto"];

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  let premierVide = null;
  obligatoires.forEach((s) => {
    const champ = $(s);
    const vide = !champ.value.trim();
    champ.setAttribute("aria-invalid", String(vide));
    if (vide && !premierVide) premierVide = champ;
  });
  const erreur = $("#erreur");
  if (premierVide) {
    erreur.textContent = "Indiquez votre nom, votre téléphone et votre véhicule.";
    erreur.hidden = false;
    premierVide.focus();
    return;
  }
  erreur.hidden = true;

  const date = $("#f-date").value
    ? new Date(`${$("#f-date").value}T12:00`).toLocaleDateString("fr-CA", { weekday: "long", day: "numeric", month: "long" })
    : "dès que possible";
  const lignes = [
    "Bonjour ED-mécanique, j'aimerais prendre rendez-vous.",
    `Nom : ${$("#f-nom").value.trim()}`,
    `Téléphone : ${$("#f-tel").value.trim()}`,
    `Véhicule : ${$("#f-auto").value.trim()}`,
    `Service : ${$("#f-service").value}`,
    `Date souhaitée : ${date}`,
  ];
  const remarque = $("#f-msg").value.trim();
  if (remarque) lignes.push(`Ce que je remarque : ${remarque}`);
  const message = lignes.join("\n");

  $("#recap-texte").textContent = message;
  // « ?&body= » marche sur iPhone comme sur Android.
  const lien = `sms:${TELEPHONE}?&body=${encodeURIComponent(message)}`;
  $("#envoyer-texto").href = lien;
  $("#copie-ok").textContent = "";
  const recap = $("#recap");
  recap.hidden = false;
  recap.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
  // Sur téléphone, l'appli Messages s'ouvre tout de suite avec la demande : le client touche « Envoyer », et la
  // demande arrive dans les textos du garage, avec le numéro du client pour lui répondre. Sur ordinateur, le
  // récapitulatif reste affiché pour copier le message.
  if (matchMedia("(pointer: coarse)").matches) $("#envoyer-texto").click();
});

obligatoires.forEach((s) => $(s).addEventListener("input", (e) => {
  if (e.target.value.trim()) e.target.removeAttribute("aria-invalid");
}));

$("#copier").addEventListener("click", async () => {
  const texte = $("#recap-texte").textContent;
  const note = $("#copie-ok");
  try {
    await navigator.clipboard.writeText(texte);
    note.textContent = "Message copié. Collez-le dans un texto au 438 764-7365.";
  } catch {
    // Presse-papiers refusé (ancien navigateur) : on sélectionne le texte pour une copie à la main.
    const plage = document.createRange();
    plage.selectNodeContents($("#recap-texte"));
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(plage);
    note.textContent = "Texte sélectionné : copiez-le (Ctrl+C) et envoyez-le par texto au 438 764-7365.";
  }
});
