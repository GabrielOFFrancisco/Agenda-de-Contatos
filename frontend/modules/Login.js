import validator from "validator";

export default class Login{
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        let error = false;

        this.errorMsg.removeAttribute('alert');

        if(!validator.isEmail(emailInput.value)){
            let message = document.createTextNode('E-mail inválido');
            let p = document.createElement('p');

            p.appendChild(message); 
            p.classList.add('error');
            this.errorMsg.classList.add('alert-danger');
            this.errorMsg.appendChild(p);
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50){
            let message = document.createTextNode('A senha precisa ter entre 3 e 50 caracteres.');
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