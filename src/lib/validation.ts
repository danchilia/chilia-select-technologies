export function fieldError(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string {
  if (el.validity.valid) return "";
  if (el.validity.valueMissing) return "This field is required.";
  if (el.validity.typeMismatch && el.type === "email") return "Enter a valid email address.";
  if (el.validity.typeMismatch && el.type === "url") return "Enter a valid URL.";
  if (el.validity.patternMismatch && el.type === "password") {
    return "Must be 8+ characters and include at least one letter and one number.";
  }
  return "Please check this field.";
}

/** Only allow same-site relative paths as a post-login/signup redirect target. */
export function sanitizeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/dashboard";
  return next;
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
