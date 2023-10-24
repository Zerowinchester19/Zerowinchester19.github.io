document.addEventListener("DOMContentLoaded", () => {
  const ergebnisseContainer = document.getElementById("ergebnisse");
  const exportButton = document.getElementById("exportButton");
  let ergebnisse = [];
  let ergebnisseHtml =
    '<br> <br> <br> <br> <h3 id="test">Ihre Antworten:</h3><ul>';

  for (let i = 1; i <= 4; i++) {
    const antwort = localStorage.getItem(`game${i}`) || "Keine Antwort";
    const remainingTime = localStorage.getItem(`game${i}Time`) || "Nein";
    ergebnisse.push(`Spiel ${i},${antwort},${remainingTime}`);
    ergebnisseHtml += `<li>Spiel ${i}: ${antwort} (Verbleibende Zeit: ${remainingTime}s)</li>`;
  }

  ergebnisseHtml += "</ul>";
  ergebnisseContainer.innerHTML = ergebnisseHtml;

  exportButton.addEventListener("click", () => exportResultsToCSV(ergebnisse));
});

function exportResultsToCSV(results) {
  const csvContent = "data:text/csv;charset=utf-8," + results.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "ergebnisse.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
