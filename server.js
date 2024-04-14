const express = require('express');
const userRoutes = require('./routes/Users/usersRoute');
const accountRoute = require('./routes/Acoounts/accountsRoute');
const transactionRoute = require('./routes/Transaction/transactionRoute');
require('./config/dbConnect')
const app  = express();

//middleware
app.use(express.json())

//User Route
app.use('/api/v1/users',userRoutes)
//Account Route
app.use('/api/v1/account',accountRoute)
//Transaction Route
app.use('/api/v1/transaction',transactionRoute)

//Error handlers

//listen app

const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`))