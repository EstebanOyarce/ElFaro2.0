//DECLARACIÓN DE FECHA Y HORA
function actualizarHora() {
    const fechaHoraElemento = document.getElementById("fecha-hora");
    const ahora = new Date();

    // Formato de la fecha y hora
    const opcionesFecha = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const opcionesHora = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

    fechaHoraElemento.textContent = ahora.toLocaleDateString("es-ES", opcionesFecha) + " " + ahora.toLocaleTimeString("es-ES", opcionesHora);
}
// Actualizar la hora cada segundo
setInterval(actualizarHora, 1000);


//NUEVOS ARTICULOS
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-articulo");
    const categoriaSelect = document.getElementById("categoria");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const categoria = categoriaSelect.value; // Obtener categoría seleccionada

        if (titulo === "" || descripcion === "") {
            alert("Por favor, ingrese título y descripción para el artículo.");
            return;
        }

        // Crear objeto artículo
        const nuevoArticulo = { titulo, descripcion };

        // Obtener y actualizar la lista de artículos según la categoría
        let articulosGuardados = JSON.parse(localStorage.getItem(categoria)) || [];
        articulosGuardados.push(nuevoArticulo);
        localStorage.setItem(categoria, JSON.stringify(articulosGuardados));

        // Redirigir al usuario a la página elegida
        window.location.href = categoria;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const formularioContacto = document.getElementById("formulario-contacto");
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

    formularioContacto.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío real del formulario

        const nombre = document.getElementById("nombre").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre === "" || mensaje === "") {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        // Simulación de envío y muestra del mensaje de confirmación
        mensajeConfirmacion.style.display = "block";

        // Limpiar el formulario después de enviarlo
        formularioContacto.reset();

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            mensajeConfirmacion.style.display = "none";
        }, 5000);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const totalArticulosElemento = document.getElementById("total-articulos");
    const categoriaArticulosElemento = document.getElementById("categoria-articulos");
    const categoria = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual

    // Obtener la cantidad de artículos por categoría
    const articulosGuardados = JSON.parse(localStorage.getItem(categoria)) || [];
    categoriaArticulosElemento.textContent = articulosGuardados.length;

    // Calcular el total de artículos en todo el sitio
    const paginas = ["index.html", "deporte.html", "negocios.html"];
    let totalArticulos = 0;

    paginas.forEach(pagina => {
        const articulosPagina = JSON.parse(localStorage.getItem(pagina)) || [];
        totalArticulos += articulosPagina.length;
    });

    totalArticulosElemento.textContent = totalArticulos;
});