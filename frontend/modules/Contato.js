const validator = require("validator");

export default class CadastroContato  {
  constructor(formClass){
    this.form = document.querySelector(formClass);
  }

  init(){
    this.events();
  }

  events(){
    if(!this.form) return;
    this.form.addEventListener(("submit"), e => {
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
    const nomeInput = el.querySelector("input[name='nome']");
    const emailInput = el.querySelector("input[name='email']");
    const telefoneInput = el.querySelector("input[name='telefone']");
    let error = false;

    if(!nomeInput.value){
      this.showErrors(nomeInput, "Nome é um campo obrigatório");
      error = true;
    }
    if(emailInput.value && !validator.isEmail(emailInput.value)){
      this.showErrors(emailInput, "E-mail inválido");
      error = true;
    }
    if(!emailInput.value && !telefoneInput.value){
      this.showErrors(emailInput, "Pelo menos um contato precisa ser enviado: email ou telefone");
      this.showErrors(telefoneInput, "Pelo menos um contato precisa ser enviado: email ou telefone");
      error = true;
    }
    if(!error) el.submit();

  }

  showErrors(input, msg){
    const errorEl = document.createElement("p");
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