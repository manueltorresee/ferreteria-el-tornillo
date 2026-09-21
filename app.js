/**
 * Ferretería El Tornillo - Lógica e Interactividad
 * - Validación en el cliente del formulario de contacto (nombre >= 2 caracteres)
 * - Manejo de mensajes de error y éxito
 * - Menú responsive móvil
 * - Navegación fluida y estado activo
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementos del DOM
  const contactForm = document.getElementById('contact-form');
  const nombreInput = document.getElementById('nombre');
  const mensajeInput = document.getElementById('mensaje');
  const feedbackBox = document.getElementById('form-feedback');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // 2. Control del Menú Móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Limpiar estado de error al escribir en el campo de nombre
  if (nombreInput) {
    nombreInput.addEventListener('input', () => {
      if (nombreInput.value.trim().length >= 2) {
        nombreInput.classList.remove('is-invalid');
        if (feedbackBox.classList.contains('is-error')) {
          feedbackBox.style.display = 'none';
        }
      }
    });
  }

  // 4. Validación y Envío del Formulario
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombreValue = nombreInput.value.trim();
      const mensajeValue = mensajeInput.value.trim();

      // Criterio de aceptación: validar que el nombre tenga al menos 2 caracteres
      if (nombreValue.length < 2) {
        mostrarFeedback(
          'Por favor, debes completar el formulario. Ingresa un nombre válido que contenga al menos 2 caracteres.',
          'is-error'
        );
        nombreInput.classList.add('is-invalid');
        nombreInput.focus();
        return;
      }

      // Validación complementaria recomendada para el mensaje
      if (mensajeValue.length === 0) {
        mostrarFeedback(
          'Por favor, escribe un breve mensaje o consulta para poder asesorarte adecuadamente.',
          'is-error'
        );
        mensajeInput.focus();
        return;
      }

      // Si pasa la validación: mostrar mensaje de éxito y limpiar formulario
      nombreInput.classList.remove('is-invalid');
      mostrarFeedback(
        `¡Gracias por escribirnos, ${nombreValue}! Tu mensaje ha sido enviado correctamente. En breve te responderemos.`,
        'is-success'
      );

      contactForm.reset();
    });
  }

  /**
   * Muestra un mensaje visual de feedback (éxito o error) en la interfaz
   * @param {string} mensaje - Texto a desplegar
   * @param {'is-error' | 'is-success'} tipo - Clase del estilo
   */
  function mostrarFeedback(mensaje, tipo) {
    feedbackBox.className = `form-feedback ${tipo}`;
    feedbackBox.style.display = 'flex';

    const icono = tipo === 'is-error'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

    feedbackBox.innerHTML = `${icono}<span>${mensaje}</span>`;

    // Desplazar suavemente a la vista si es necesario
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 5. Destacar enlace activo en la barra de navegación al hacer scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
