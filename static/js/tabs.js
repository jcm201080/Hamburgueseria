document.addEventListener("DOMContentLoaded", function () {
    function openTab(tabName) {
        let contents = document.querySelectorAll(".tab-content");
        let buttons = document.querySelectorAll(".tab-button");

        contents.forEach(content => {
            content.style.display = "none";
        });

        buttons.forEach(button => {
            button.classList.remove("active");
        });

        document.getElementById(tabName).style.display = "block";
        document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add("active");
    }

    // Inicia mostrando solo la primera pestaña
    openTab("tres-en-raya");

    window.openTab = openTab; // Hacer la función accesible globalmente
});
