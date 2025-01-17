document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón de edición
    const editButton = document.querySelector('.edit-btn');

    // Agrega un evento al botón de edición
    editButton.addEventListener('click', function() {
        // Selecciona el elemento que quieres editar
        const editableText = document.getElementById('editableText');
        
        // Si el contenido no es un campo de edición, lo convierte
        if (!editableText.isContentEditable) {
            editableText.contentEditable = true; // Habilita la edición
            editableText.style.border = "1px solid #ccc"; // Agrega un borde para indicar que está en modo de edición
        } else {
            editableText.contentEditable = false; // Deshabilita la edición
            editableText.style.border = "none"; // Elimina el borde
        }
    });
});

// Event listener para los botones de eliminar
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Mostrar el mensaje de confirmación
        var confirmation = confirm("¿Estás seguro de que quieres eliminar esta fila?");
        
        // Si el usuario confirma, eliminar la fila
        if (confirmation) {
            // Buscar la fila (tr) que contiene el botón clicado
            var row = this.closest('tr');
            // Eliminar la fila
            row.remove();
        }
    });
});
function guardarDatos() {
    // Obtener los valores de los campos del formulario
    const usuario = document.getElementById("editUsuario").value;
    const nombre = document.getElementById("editNombre").value;
    const membresia = document.getElementById("editMembresia").value;
    const precio = document.getElementById("editPrecio").value;
    const fechaInicio = document.getElementById("editFechaInicio").value;
    const fechaFin = document.getElementById("editFechaFin").value;

    // Crear un objeto con los datos del formulario
    const datos = {
        usuario,
        nombre,
        membresia,
        precio,
        fechaInicio,
        fechaFin
    };

    // Obtener los datos guardados en el localStorage
    let datosGuardados = JSON.parse(localStorage.getItem('membresias')) || [];

    // Agregar los nuevos datos al array
    datosGuardados.push(datos);

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('membresias', JSON.stringify(datosGuardados));

    // Recargar la tabla
    cargarDatos();
}

function cargarDatos() {
    // Obtener los datos almacenados en localStorage
    const datosGuardados = JSON.parse(localStorage.getItem('membresias')) || [];

    // Obtener el tbody de la tabla
    const tbody = document.querySelector('#mitabla1 tbody');

    // Limpiar la tabla antes de agregar los nuevos datos
    tbody.innerHTML = '';

    // Iterar sobre los datos guardados y agregar filas a la tabla
    datosGuardados.forEach(dato => {
        const tr = document.createElement('tr');

        // Crear las celdas para cada dato
        tr.innerHTML = `
            <td>${dato.usuario}</td>
            <td>${dato.nombre}</td>
            <td>${dato.membresia}</td>
            <td>${dato.precio}</td>
            <td>${dato.pagado}</td>
            <td>${dato.fechaInicio}</td>
            <td>${dato.fechaFin}</td>
            <td>
                <button class="btn btn-success btn-circle btn-sm edit-btn">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-danger btn-circle btn-sm delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        // Agregar la fila al tbody de la tabla
        tbody.appendChild(tr);
    });
}

// Llamar a la función cargarDatos cuando se carga la página
window.onload = cargarDatos;

document.getElementById('editForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    guardarDatos(); // Llama a la función para guardar los datos
});


function mostrarDatos() {
    const datosGuardados = localStorage.getItem('datosMembresia');

    if (datosGuardados) {
        // Convertir los datos guardados de JSON a objeto
        const datos = JSON.parse(datosGuardados);

        // Mostrar los datos en el formulario o en otro lugar
        document.getElementById('usuario').value = datos.usuario;
        document.getElementById('nombre').value = datos.nombre;
        document.getElementById('tipo_membresia').value = datos.tipo_membresia;
        document.getElementById('precio').value = datos.precio;
    } else {
        console.log("No hay datos guardados.");
    }
}

// Llamar a la función mostrarDatos cuando se cargue la página
window.onload = mostrarDatos;

    // Función para guardar los datos en localStorage
    function guardarEnLocalStorage(datos) {
        let membresias = JSON.parse(localStorage.getItem('membresias')) || [];
        membresias.push(datos);
        localStorage.setItem('membresias', JSON.stringify(membresias));
    }

    // Función para cargar los datos de localStorage
    function cargarDesdeLocalStorage() {
        const membresias = JSON.parse(localStorage.getItem('membresias')) || [];
        const tabla = document.querySelector('#tablaMembresias tbody');
        membresias.forEach(membresia => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${membresia.usuario}</td>
                <td>${membresia.nombre}</td>
                <td>${membresia.membresia}</td>
                <td>${membresia.pagado}</td>
                <td>${membresia.precio}</td>
                <td>${membresia.fechaPago}</td>
                <td>${membresia.fechaInicio}</td>
                <td>${membresia.fechaFin}</td>
            `;
            tabla.appendChild(fila);
        });
    }

    // Evento para guardar los datos del formulario
    document.querySelector('#formMembresia').addEventListener('submit', function (event) {
        event.preventDefault();

        const usuario = document.getElementById('floatingUsuario').value;
        const nombre = document.getElementById('floatingNombre').value;
        const membresia = document.getElementById('floatingMembresia').value;
        const pagado = document.getElementById('floatingPagado').value;
        const precio = document.getElementById('floatingPrecio').value;
        const fechaPago = document.getElementById('floatingFechaPago').value;
        const fechaInicio = document.getElementById('floatingFechaInicio').value;
        const fechaFin = document.getElementById('floatingFechaFin').value;

        const datos = {
            usuario,
            nombre,
            membresia,
            pagado,
            precio,
            fechaPago,
            fechaInicio,
            fechaFin,
        };

        // Agregar la fila a la tabla
        const tabla = document.querySelector('#tablaMembresias tbody');
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario}</td>
            <td>${nombre}</td>
            <td>${membresia}</td>
            <td>${pagado}</td>
            <td>${precio}</td>
            <td>${fechaPago}</td>
            <td>${fechaInicio}</td>
            <td>${fechaFin}</td>
        `;
        tabla.appendChild(fila);

        // Guardar los datos en localStorage
        guardarEnLocalStorage(datos);

        // Limpiar el formulario
        this.reset();
    });

    // Cargar los datos al iniciar la página
    document.addEventListener('DOMContentLoaded', cargarDesdeLocalStorage);

