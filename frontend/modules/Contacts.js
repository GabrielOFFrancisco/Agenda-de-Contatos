import validator from "validator";

export default class Contacts{
    constructor(formClass){
        this.form = document.querySelector(formClass);
        this.errorMsg = document.querySelector('.errorMsg');
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e =>{
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e){
        const errors = document.querySelectorAll('.error');
        for (let p of errors) {
            p.remove();
        };

        const el = e.target;
        const nameInput = el.querySelector('input[name="name"]');
        const lastNameInput = el.querySelector('input[name="lastName"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telephoneInput = el.querySelector('input[name="telephone"]');

        let error = false;
        
        this.errorMsg.removeAttribute('alert');

        if(!nameInput.value){
            let message = document.createTextNode('Nome é um campo obrigatório');
            let p = document.createElement('p');

            p.appendChild(message); 
            p.classList.add('error');
            this.errorMsg.classList.add('alert-danger');
            this.errorMsg.appendChild(p);
            error = true;
        }

        if (!emailInput.value && !telephoneInput.value) {
            let message = document.createTextNode('Pelo menos uma informação de contato precisa ser registrada: e-mail ou telefone');

            let p = document.createElement('p');

            p.appendChild(message); 
            p.classList.add('error');
            this.errorMsg.classList.add('alert-danger');
            this.errorMsg.appendChild(p);
            error = true;
        }

        if(emailInput.value && !validator.isEmail(emailInput.value)){
            let message = document.createTextNode('E-mail inválido');
            let p = document.createElement('p');

            p.appendChild(message); 
            p.classList.add('error');
            this.errorMsg.classList.add('alert-danger');
            this.errorMsg.appendChild(p);
            error = true;
        }

        this.errorMsg.removeAttribute('alert');
        if(!error) el.submit();
    }
}