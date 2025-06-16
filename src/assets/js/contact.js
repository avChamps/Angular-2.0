document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  const fields = [
    { id: "name", required: true, message: "Name is required" },
    { id: "email", required: true, message: "Email is required" },
    { id: "subject", required: false },
    { id: "message", required: false },
  ];

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorEl = document.getElementById(`${field.id}-error`);

    input.addEventListener("blur", () => {
      if (field.required && !input.value.trim()) {
        if (errorEl) {
          errorEl.textContent = field.message;
          errorEl.style.display = "block";
        }
        input.classList.add("input_field_wrapper_error");
      } else {
        if (errorEl) errorEl.style.display = "none";
        input.classList.remove("input_field_wrapper_error");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const errorEl = document.getElementById(`${field.id}-error`);
      if (field.required && !input.value.trim()) {
        if (errorEl) {
          errorEl.textContent = field.message;
          errorEl.style.display = "block";
        }
        input.classList.add("input_field_wrapper_error");
        isValid = false;
      } else {
        if (errorEl) errorEl.style.display = "none";
        input.classList.remove("input_field_wrapper_error");
      }
    });

    if (isValid) {
      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      console.log("Form submitted:", data);
      alert("Message sent successfully!");
      form.reset();
    }
  });
});
