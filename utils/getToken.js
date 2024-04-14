const getToken = req => {
    const headerObj = req.headers
    const token = headerObj["authorisation"].split(" ")[1]
    if (token !== undefined) {
        return token
    }
    else {
        return {
            status: 'failed',
            message: "There is no token attached"
        }
    }
}

module.exports = getToken