export function fieldError(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string {
  if (el.validity.valid) return "";
  if (el.validity.valueMissing) return "This field is required.";
  if (el.validity.typeMismatch && el.type === "email") return "Enter a valid email address.";
  if (el.validity.typeMismatch && el.type === "url") return "Enter a valid URL.";
  return "Please check this field.";
}

export function validateForm(form: HTMLFormElement): Record<string, string> {
  const errors: Record<string, string> = {};
  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    "input[name], textarea[name], select[name]"
  ).forEach((el) => {
    const error = fieldError(el);
    if (error) errors[el.name] = error;
  });
  return errors;
}
