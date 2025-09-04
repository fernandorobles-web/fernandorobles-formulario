const form = document.getElementById('miFormulario');
const inputs = form.querySelectorAll('.form-control, .form-check-input');

// Validar campo
function validarCampo(campo) {
  if (campo.type === "radio") {
    const radios = form.querySelectorAll(`input[name="${campo.name}"]`);
    const algunoMarcado = Array.from(radios).some(r => r.checked);
    radios.forEach(r => {
      if (algunoMarcado) {
        r.classList.add('is-valid');
        r.classList.remove('is-invalid');
      } else {
        r.classList.add('is-invalid');
        r.classList.remove('is-valid');
      }
    });
  } else {
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
