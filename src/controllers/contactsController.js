const Contacts = require('../models/ContactsModel');

exports.index = (req, res) => {
    res.render('contacts', {
        contacts: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contacts = new Contacts(req.body);
        await contacts.register();

        if (contacts.errors.length > 0) {
            req.flash('errors', contacts.errors);
            req.session.save(() => res.redirect('/contacts/index'));
            return;
        }

        req.flash('success', 'Contato registrado com sucesso!');
        req.session.save(() => res.redirect(`/contacts/index/${contacts.contacts._id}`));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contacts = await Contacts.searchId(req.params.id);
    if (!contacts) return res.render('404');

    res.render('contacts', { contacts });
};

exports.edit = async (req, res) => {
    try {
        if (!req.params.id) return res.render('404');
        const contacts = new Contacts(req.body);
        await contacts.edit(req.params.id);

        if (contacts.errors.length > 0) {
            req.flash('errors', contacts.errors);
            req.session.save(() => res.redirect(req.get('referer')));
            return;
        }

        req.flash('success', 'Contato editado com sucesso!');
        req.session.save(() => res.redirect('back'));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404');

    const contacts = await Contacts.delete(req.params.id);
    if (!contacts) return res.render('404');

    req.flash('success', 'Contato apagado com sucesso!');
    req.session.save(() => res.redirect('back'));
    return;
}