document.addEventListener("DOMContentLoaded", function () {
  // 🔗 Sélection des éléments HTML
  const form = document.getElementById("confessionForm");
  const textarea = document.getElementById("confession");
  const feedback = document.getElementById("feedback");
  const linkSection = document.getElementById("linkSection");
  const generatedLink = document.getElementById("generatedLink");
  const copyBtn = document.getElementById("copyBtn");
  const copyFeedback = document.getElementById("copyFeedback");
  const shareWhatsApp = document.getElementById("shareWhatsApp");
  const shareFacebook = document.getElementById("shareFacebook");

  // ✍ Soumission du formulaire
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = textarea.value.trim();

    if (msg.length < 10) {
      feedback.textContent = "⚠ Confession trop courte (min. 10 caractères).";
      feedback.style.color = "orange";
      linkSection.style.display = "none";
    } else {
      const uniqueID = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      const fullURL = `https://tonsite.github.io/CONFESSION-SITE/?id=${uniqueID}`;
      generatedLink.textContent = fullURL;
      linkSection.style.display = "block";
      feedback.textContent = "✅ Confession envoyée avec succès.";
      feedback.style.color = "lightgreen";
      form.reset();
    }
  });

  // 📋 Bouton "Copier le lien"
  copyBtn.addEventListener("click", function () {
    const link = generatedLink.textContent;
    navigator.clipboard.writeText(link).then(() => {
      copyFeedback.textContent = "📋 Lien copié!";
      copyFeedback.style.color = "#00ffcc";
      copyBtn.textContent = "✔ Copié!";
      setTimeout(() => {
        copyBtn.textContent = "📋 Copier";
        copyFeedback.textContent = "";
      }, 2000);
    }).catch((err) => {
      console.error("Erreur lors de la copie:", err);
    });
  });

  // 💬 Partage sur WhatsApp
  shareWhatsApp.addEventListener("click", function () {
    const message = encodeURIComponent(`Voici mon lien de confession anonyme 🤫: ${generatedLink.textContent}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
});

  // 📘 Partage sur Facebook
  shareFacebook.addEventListener("click", function () {
    const url = encodeURIComponent(generatedLink.textContent);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
});
});