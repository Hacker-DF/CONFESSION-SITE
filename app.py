from flask import Flask, render_template, request, jsonify # type: ignore
import os
import emoji # type: ignore

app = Flask(__name__)

# Liste de mots interdits à modérer
mots_interdits = ["insulte", "haine", "violent"]

# Fonction de modération
def est_acceptable(message):
    for mot in mots_interdits:
        if mot in message.lower():
            return False
    return True

# Fonction d’ajout d’emoji selon le ton (simple version)
def ajouter_emoji(message):
    émotions = {
        "triste": "😢", "joyeux": "😊", "secret": "🤫",
        "amour": "❤", "solitude": "😞", "colère": "😠"
}
    for mot, icon in émotions.items():
        if mot in message.lower():
            message += " " + icon
    return emoji.emojize(message, language='alias')

# Sauvegarder le message dans un fichier
def enregistrer(message):
    with open("confessions.txt", "a", encoding="utf-8") as f:
        f.write(message + "\n")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/confession", methods=["POST"])
def confession():
    data = request.get_json()
    message = data.get("message", "").strip()
    if not est_acceptable(message):
        return jsonify({"status": "Message refusé pour contenu inapproprié 🚫"})

    message_emojifié = ajouter_emoji(message)
    enregistrer(message_emojifié)
    return jsonify({"status": "Confession enregistrée ✅", "message": message_emojifié})

if __name__ == "_main_":
    app.run(debug=True)