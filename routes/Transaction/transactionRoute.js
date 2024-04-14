const express = require('express');
const { createtransactionCtrl, getAllTransactionCtrl, getSingleTransactionCtrl, updateTransactionCtrl, deleteTransactionCtrl } = require('../../controller/Transaction/transactionCtrl');
const isLogin = require('../../middleware/isLogin');
const transactionRoute = express.Router();

transactionRoute.post('/', isLogin, createtransactionCtrl)

transactionRoute.get('/', getAllTransactionCtrl)

transactionRoute.get('/:id', getSingleTransactionCtrl)

transactionRoute.put('/:id', updateTransactionCtrl)

transactionRoute.delete('/:id', deleteTransactionCtrl)

module.exports = transactionRoute