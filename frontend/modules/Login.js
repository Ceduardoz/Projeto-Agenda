import validator from "validator";

export default class Login  {
  constructor(formClass){
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events(){
    if(!this.form) return;
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      this.validate(e);
    });
    
    this.form.querySelectorAll("input").forEach(input => {
      input.addEventListener("focus", () => this.clearErrors(input));
      input.addEventListener("input", () => this.clearErrors(input));
    });
  }

  validate(e){
    const el = e.target;
    const emailInput = el.querySelector("input[name='email']");
    const passwordInput = el.querySelector("input[name='password']");
    let error = false

    if(!validator.isEmail(emailInput.value)) {
      this.showErrors(emailInput, "E-mail inválido");
      return error = true;
    };
    if(passwordInput.value.length < 8 || passwordInput.value.length > 50){
      this.showErrors(passwordInput, "A senha precisa ter entre 8 e 50 caracteres.");
      return error = true;
    }
    if(!error) el.submit();
  }

  showErrors(input, msg){
    const errorEl = document.createElement('p');
    errorEl.textContent = msg;
    errorEl.className = "text-danger bolder mt-1";
    
    input.insertAdjacentElement('afterend', errorEl);
  }

  clearErrors(input){
    const nextEl = input.nextElementSibling;
    if(nextEl && nextEl.classList.contains("text-danger")) nextEl.remove();
  }

  clearAllErrors(){
    this.form.querySelectorAll(".text-danger").forEach(el => el.remove());
  }
}