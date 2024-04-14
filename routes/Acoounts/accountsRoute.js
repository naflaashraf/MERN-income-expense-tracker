const express = require('express');
const { createAccountCtrl, getsingleAccountCtrl, getallAccountCtrl, deleteAcountCtrl, updateAccountCtrl } = require('../../controller/Accounts/accountCntrl');
const isLogin = require('../../middleware/isLogin')
const accountRoute = express.Router();

accountRoute.post('/', isLogin, createAccountCtrl)
accountRoute.get('/:id', getsingleAccountCtrl)
accountRoute.get('/', getallAccountCtrl)
accountRoute.delete('/:id', deleteAcountCtrl)
accountRoute.put('/:id', updateAccountCtrl)

module.exports = accountRoute