const mongoose = require('mongoose');
const validator = require('validator');

const ContactsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telephone: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now },
});

const ContactsModel = mongoose.model('Contacts', ContactsSchema);

function Contacts(body) {
    this.body = body;
    this.errors = [];
    this.contacts = null;
}

Contacts.searchId = async function(id){
    if(typeof id !== 'string') return;
    const user = await ContactsModel.findById(id);
    return user;
}

Contacts.prototype.register = async function() {
    this.validate();

    if (this.errors.length > 0) return;
    this.contacts = await ContactsModel.create(this.body);
};

Contacts.prototype.validate = function() {
    this.cleanUp();

    // Validar email
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    if (!this.body.name) this.errors.push('Nome é um campo obrigatório');
    if (!this.body.email && !this.body.telephone) {
        this.errors.push('Pelo menos uma informação de contato precisa ser registrada: e-mail ou telefone');
    }

    console.log(this.errors);
};

Contacts.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        lastName: this.body.lastName,
        email: this.body.email,
        telephone: this.body.telephone,
    };
};

module.exports = Contacts;
