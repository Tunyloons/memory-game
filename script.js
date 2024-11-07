document.addEventListener("DOMContentLoaded", () => {
    const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🍋", "🍍", "🥝", "🥥"];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5); // Doppelte Symbole und mischen

    const memoryGame = document.getElementById("memory-game");
    const congratulations = document.getElementById("congratulations");
    const timeTakenDisplay = document.getElementById("time-taken");
    const scoreDisplay = document.getElementById("score");

    let flippedCards = [];
    let matchedPairs = 0;
    let startTime = Date.now(); // Startzeit des Spiels

    // Funktion zur Berechnung der Punktzahl
    function calculateScore(timeTaken) {
        const timeInMinutes = timeTaken / 60000; // Zeit in Minuten
        if (timeInMinutes >= 10) return 0;
        return Math.max(100 - timeInMinutes * 10, 0); // Punktzahl sinkt jede Minute
    }

    // Funktion zum Anzeigen der Glückwunschseite
    function showCongratulations(timeTaken, score) {
        memoryGame.style.display = "none"; // Memory-Spiel ausblenden
        congratulations.style.display = "block"; // Glückwunschseite einblenden
        timeTakenDisplay.textContent = `Benötigte Zeit: ${Math.floor(timeTaken / 1000)} Sekunden`;
        scoreDisplay.textContent = `Punktzahl: ${Math.round(score)}`;
    }

    // Karten dynamisch generieren
    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.innerHTML = `<span class="front"></span><span class="back">${symbol}</span>`;
        memoryGame.appendChild(card);

        // Klick-Event zum Umdrehen
        card.addEventListener("click", () => {
            if (card.classList.contains("flipped") || flippedCards.length === 2) return;

            card.classList.add("flipped");
            flippedCards.push(card);

            // Überprüfen, ob ein Paar gefunden wurde
            if (flippedCards.length === 2) {
                const [first, second] = flippedCards;
                if (first.dataset.symbol === second.dataset.symbol) {
                    matchedPairs++;
                    flippedCards = [];
                    if (matchedPairs === symbols.length) {
                        // Spielende
                        const timeTaken = Date.now() - startTime; // Zeitdifferenz in Millisekunden
                        const score = calculateScore(timeTaken);
                        showCongratulations(timeTaken, score);
                    }
                } else {
                    setTimeout(() => {
                        first.classList.remove("flipped");
                        second.classList.remove("flipped");
                        flippedCards = [];
                    }, 1000);
                }
            }
        });
    });
});
