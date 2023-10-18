const Contacts = require('../models/ContactsModel');

exports.index = async(req, res) => {
  const contactsList = await Contacts.searchContacts();
  res.render('index', { contactsList });
};
