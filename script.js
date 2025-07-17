const form = document.getElementById("formulaire");
const liste = document.getElementById("liste");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const message = document.getElementById("message").value.trim();
  if (message) {
    const li = document.createElement("li");
    li.textContent = message;
    liste.prepend(li);
    form.reset();
}
});