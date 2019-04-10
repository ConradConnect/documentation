const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')

const apiUrl = 'https://mydaco.conradconnect.de/api'

const app = express()
app.use(bodyParser.json())

app.post('/data', (request, response) => {
    const token = request.body.token
    response.sendStatus(200)
    // Invoke action after 1 minute
    setTimeout(() => contactApi(token), 60000)
})

app.listen(3000)


const contactApi = (token) => {
    axios({
        method: 'POST',
        url: apiUrl,
        data: {
            message: 'The server\'s time is:' + new Date(),
        },
        headers: { 'authorization': 'Bearer ' + token }
    })
}
