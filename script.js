const inputText = document.getElementById("inputText");
const detectButton = document.getElementById("detectButton");
const languageSelect = document.getElementById("languageSelect");
const translateButton = document.getElementById("translateButton");
const output = document.getElementById("output");

const API_BASE = "https://lingva.ml/api/v1";

async function typeText(element, text) {
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

detectButton.addEventListener("click", async () => {
    const text = inputText.value.trim();
    if (!text) {
        alert("Please enter some text to detect the language.");
        return;
    }
    try {
        const response = await fetch(`${API_BASE}/detect`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: text }),
        });
        if (!response.ok) throw new Error("Failed to detect language");
        const data = await response.json();
        typeText(output, `Detected Language: ${data.language}`);
    } catch (err) {
        typeText(output, `Error: ${err.message}`);
    }
});

translateButton.addEventListener("click", async () => {
    const text = inputText.value.trim();
    const targetLang = languageSelect.value;
    if (!text) {
        alert("Please enter some text to translate.");
        return;
    }
    try {
        const response = await fetch(
            `${API_BASE}/auto/${targetLang}/${encodeURIComponent(text)}`
        );
        if (!response.ok) throw new Error("Failed to translate text");
        const data = await response.json();
        typeText(output, `Translated Text: ${data.translation}`);
    } catch (err) {
        typeText(output, `Error: ${err.message}`);
    }
});