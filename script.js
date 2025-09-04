const form = document.getElementById('miFormulario');
const inputs = form.querySelectorAll('.form-control, .form-check-input');

// Validar campo
function validarCampo(campo) {
  if (campo.type === "radio") {
    // Validación para grupos de radio
    const nombre = campo.name;
    const radios = document.querySelectorAll(`input[name="${nombre}"]`);
    let algunoMarcado = false;
    radios.forEach(radio => {
      if (radio.checked) {
        algunoMarcado = true;
      }
    });
    radios.forEach(radio => {
      if (algunoMarcado) {
        radio.classList.remove('is-invalid');
        radio.classList.add('is-valid');
      } else {
        radio.classList.remove('is-valid');
        radio.classList.add('is-invalid');
      }
    });
  } else if (campo.tagName === "SELECT") {
    // Validación para selects
    if (campo.value === "") {
      campo.classList.remove('is-valid');
      campo.classList.add('is-invalid');
    } else {
      campo.classList.remove('is-invalid');
      campo.classList.add('is-valid');
    }
  } else {
    // Validación para inputs normales
    if (campo.value.trim() === "") {
      campo.classList.remove('is-valid');
      campo.classList.add('is-invalid');
    } else {
      campo.classList.remove('is-invalid');
      campo.classList.add('is-valid');
    }
  }
}

// Validar al salir del campo
inputs.forEach(input => {
  input.addEventListener('blur', () => validarCampo(input));
});

// Guardar
document.getElementById('guardar').addEventListener('click', () => {
  let faltan = [];

  inputs.forEach(input => {
    if (input.dataset.required === "true") {
      if (input.type === "radio") {
        const radios = form.querySelectorAll(`input[name="${input.name}"]`);
        const algunoMarcado = Array.from(radios).some(r => r.checked);
        if (!algunoMarcado) faltan.push(input.name);
      } else if (input.value.trim() === "") {
        faltan.push(input.id);
      }
    }
  });

  if (faltan.length > 0) {
    alert("❌ Faltan campos obligatorios: " + faltan.join(", "));
  } else {
    alert("✅ Formulario guardado con éxito");
  }
});

// Limpiar
document.getElementById('limpiar').addEventListener('click', () => {
  inputs.forEach(input => {
    input.classList.remove('is-valid', 'is-invalid');
  });
});
