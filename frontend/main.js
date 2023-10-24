import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Contacts from './modules/Contacts';

const signup = new Login('.form-signup');
const login = new Login('.form-login');
login.init();
signup.init();

const contacts = new Contacts('.form-contacts');
contacts.init();