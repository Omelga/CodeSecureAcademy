document.addEventListener("DOMContentLoaded", function () {
    /* ==================== INICIO DE SESIÓN ==================== */
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuario = usuarios.find(user => user.email === email && user.password === password);

            if (usuario) {
                sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
                alert("Sessió iniciada correctament!");
                window.location.href = "index.html";
            } else {
                alert("Correu electrònic o contrasenya incorrectes.");
            }
        });
    }

    /* ==================== REGISTRO ==================== */
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nombre = document.getElementById("register-nombre").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            if (usuarios.some(user => user.email === email)) {
                alert("Aquest correu ja està registrat.");
                return;
            }

            usuarios.push({ nombre, email, password });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Registre complet! Ja pots iniciar sessió.");
            window.location.href = "login_register.html";
        });
    }

    /* ==================== INSCRIPCIÓ ==================== */
    const inscripcionForm = document.getElementById("inscripcion-form");
    if (inscripcionForm) {
        inscripcionForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nombre = document.getElementById("inscripcion-nombre").value.trim();
            const email = document.getElementById("inscripcion-email").value.trim();
            const curso = document.getElementById("inscripcion-curso").value.trim();

            let inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];
            inscripciones.push({ nombre, email, curso });
            localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

            alert("Inscripció realitzada correctament!");
            inscripcionForm.reset();
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
