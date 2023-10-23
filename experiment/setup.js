document.addEventListener("DOMContentLoaded", (event) => {
    const currentPage = window.location.pathname.split("/").pop();
    const antwortElement = document.getElementById('antwort');
    const spielNummer = window.location.pathname.split("/").pop().split(".")[0]; // z.B. "game1"

    antwortElement.addEventListener('input', () => {
        localStorage.setItem(spielNummer, antwortElement.value);
    });

    if (currentPage === "end.html") {
        return; // Beendet die Ausführung des Scripts auf der "end.html"-Seite
    }

    const timerElement = document.querySelector(".timer");
    let countdown = 10;

    const updateTimerDisplay = () => {
        timerElement.textContent = `Countdown: ${countdown}s`;
    };

    const redirectToNextPage = () => {
        let nextPage = "";

        switch (currentPage) {
            case "game1.html":
                nextPage = "game2.html";
                break;
            case "game2.html":
                nextPage = "phase_2.html";
                break;
            case "game3.html":
                nextPage = "game4.html";
                break;
            case "game4.html":
                nextPage = "end.html";
                break;
            default:
                console.error("Unbekannte Seite. Keine Weiterleitung möglich.");
                return;
        }

        window.location.href = nextPage;
    };

    const startCountdown = () => {
        updateTimerDisplay();

        const timer = setInterval(() => {
            countdown -= 1;
            updateTimerDisplay();

            if (countdown <= 0) {
                clearInterval(timer);
                redirectToNextPage();
            }
        }, 1000);
    };

    startCountdown();
});
