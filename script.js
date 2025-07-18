// Removed duplicate form and liste declarations and event listener to prevent errors.

// Définir la fonction copierLienPerso en dehors de l'event handler
function copierLienPerso() {
  const pseudo = document.getElementById("nomUtilisateur").value.trim();
  const message = document.getElementById("messageCopiePerso");
  const bouton = document.getElementById("btnCopierPerso");

  if (pseudo === "") {
    message.textContent = "⛔ Entre un pseudo d’abord.";
    return;
  }

  const lien = `https://hacker-df.github.io/CONFESSION-SITE/?user=${encodeURIComponent(pseudo)}`;
  navigator.clipboard.writeText(lien).then(() => {
    message.textContent = "✅ Lien copié dans le presse-papiers!";
    bouton.textContent = "✅ Lien copié!";
    bouton.style.background = "#4CAF50";

    // Mise à jour des liens de partage
    document.getElementById("lienWhatsApp").href =
      `https://wa.me/?text=Voici%20mon%20lien%20CONFESSION%20:%20${encodeURIComponent(lien)}`;
    document.getElementById("lienFacebook").href =
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(lien)}`;

    setTimeout(() => {
      message.textContent = "";
      bouton.textContent = "📋 Copier ton lien";
      bouton.style.background = "linear-gradient(45deg, #ff4081, #ff75a0)";
    }, 3000);
  }).catch(() => {
    message.textContent = "❌ Impossible de copier le lien.";
  });
}
const params = new URLSearchParams(window.location.search);
const pseudo = params.get("user");

if (pseudo) {
  document.getElementById("titre-boite").textContent = `💬 Boîte secrète de ${ pseudo }`;
}
const form = document.getElementById("formulaire");
const liste = document.getElementById("liste-confessions");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = document.getElementById("message").value.trim();
  const pseudo = new URLSearchParams(window.location.search).get("user") || "inconnu";

  fetch("/confession", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ message, pseudo})
})
.then(res => res.json())
.then(data => {
    if (data.message) {
      const li = document.createElement("li");
      li.textContent = data.message;
      liste.prepend(li);
}
    alert(data.status);
    form.reset();
});
});