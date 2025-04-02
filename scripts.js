document.addEventListener("DOMContentLoaded", function () {
    // ✅ FORMULARIO DE CONTACTO
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let nom = document.getElementById("nom").value.trim();
            let email = document.getElementById("email").value.trim();
            let telefon = document.getElementById("telefon").value.trim();
            let missatge = document.getElementById("missatge").value.trim();
            let message = document.getElementById("formMessage");

            if (nom === "" || email === "" || telefon === "" || missatge === "") {
                message.textContent = "Tots els camps són obligatoris.";
                message.style.color = "red";
                return;
            }

            message.textContent = "Formulari enviat correctament!";
            message.style.color = "green";

            form.reset();
        });
    }

    /* ==================== VALORACIONS ==================== */
    const valoracionForm = document.getElementById("valoracion-form");
    if (valoracionForm) {
        valoracionForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nombre = document.getElementById("valoracion-nombre").value.trim();
            const puntuacion = document.getElementById("valoracion-puntuacion").value;
            const comentario = document.getElementById("valoracion-comentario").value.trim();

            let valoraciones = JSON.parse(localStorage.getItem("valoraciones")) || [];
            valoraciones.push({ nombre, puntuacion, comentario });
            localStorage.setItem("valoraciones", JSON.stringify(valoraciones));

            alert("Valoració enviada!");
            mostrarValoraciones();
            valoracionForm.reset();
        });

        mostrarValoraciones();
    }

    function mostrarValoraciones() {
        const lista = document.getElementById("valoracion-lista");
        if (!lista) return;

        lista.innerHTML = "";
        let valoraciones = JSON.parse(localStorage.getItem("valoraciones")) || [];
        valoraciones.forEach(valoracion => {
            const div = document.createElement("div");
            div.classList.add("valoracion-item");
            div.innerHTML = `<strong>${valoracion.nombre}</strong> - ${"⭐".repeat(valoracion.puntuacion)}<br>
                            <em>"${valoracion.comentario}"</em><hr>`;
            lista.appendChild(div);
        });
    }
});
