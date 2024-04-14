const mongoose = require('mongoose')

const dbconnect = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/income-expense-app')
        console.log('Db connected successfully');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

dbconnect()