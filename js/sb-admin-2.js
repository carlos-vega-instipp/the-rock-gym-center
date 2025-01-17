(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict

$(document).ready(function() {
  // Abrir modal de edición
  $('.edit-btn').on('click', function() {
      var row = $(this).closest('tr');
      var usuario = row.find('td:nth-child(1)').text();
      var nombre = row.find('td:nth-child(2)').text();
      var membresia = row.find('td:nth-child(3)').text();
      var precio = row.find('td:nth-child(4)').text();
      var pagado = row.find('td:nth-child(5)').text();
      var fechaInicio = row.find('td:nth-child(6)').text();
      var fechaFin = row.find('td:nth-child(7)').text();

      // Rellenar los campos del formulario en el modal
      $('#editUsuario').val(usuario);
      $('#editNombre').val(nombre);
      $('#editMembresia').val(membresia);
      $('#editPrecio').val(precio);
      $('#editFechaInicio').val(fechaInicio);
      $('#editFechaFin').val(fechaFin);

      // Mostrar el modal
      $('#editModal').modal('show');
  });

  // Guardar cambios de la edición
  $('#editForm').on('submit', function(e) {
      e.preventDefault();

      var usuario = $('#editUsuario').val();
      var nombre = $('#editNombre').val();
      var membresia = $('#editMembresia').val();
      var precio = $('#editPrecio').val();
      var fechaInicio = $('#editFechaInicio').val();
      var fechaFin = $('#editFechaFin').val();

      // Aquí puedes realizar una petición para guardar los cambios en el servidor

      // Cerrar el modal
      $('#editModal').modal('hide');

      // Opcional: Actualizar la fila en la tabla (esto es solo si deseas hacerlo sin recargar)
      var row = $("tr:contains('" + usuario + "')");
      row.find('td:nth-child(2)').text(nombre);
      row.find('td:nth-child(3)').text(membresia);
      row.find('td:nth-child(4)').text(precio);
      row.find('td:nth-child(6)').text(fechaInicio);
      row.find('td:nth-child(7)').text(fechaFin);
  });

  // Abrir modal de confirmación de eliminación
  $('.delete-btn').on('click', function() {
      var row = $(this).closest('tr');
      var usuario = row.find('td:nth-child(1)').text();

      // Mostrar el modal de eliminación
      $('#deleteModal').modal('show');

      // Confirmar eliminación
      $('#confirmDeleteBtn').on('click', function() {
          // Aquí puedes realizar una petición para eliminar el registro en el servidor

          // Eliminar la fila de la tabla
          row.remove();

          // Cerrar el modal
          $('#deleteModal').modal('hide');
      });
  });
});
