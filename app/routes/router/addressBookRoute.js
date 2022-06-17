const express = require('express');
const router = express();
const addressBook = require('../../controller/addressBookController');
const passport = require('passport')
const { validator } = require('../../helper/validator');
const validateAddressBook = require('../../validation/addressBookValidate')
//this api use for create the address book
router.post('/createAddressBook', passport.authenticate('jwt', { session: false }), validator.body(validateAddressBook.createAddressBook), addressBook.createAddressBook);
//this api use for read the address book
router.get('/readAddressBook', passport.authenticate('jwt', { session: false }), addressBook.readAddressBook);
//this api use for update the data of address book by given id 
router.post('/updateAddressBook/:id', passport.authenticate('jwt', { session: false }), validator.body(validateAddressBook.updateAddressBook), addressBook.updateAddressBook);
//this api use for delete the data of address book by given id
router.get('/deleteAddressBook/:id', passport.authenticate('jwt', { session: false }), addressBook.deleteAddressBook)
module.exports = router;