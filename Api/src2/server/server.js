const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')

const apiUrl = 'https://mydaco.conradconnect.de/api'

const app = express()
app.use(bodyParser.json())

app.post('/data', (request, response) => {
    const token = request.body.token
    console.info('Token received:', token)
    response.sendStatus(200)
    // Invoke action after 10 seconds
    setTimeout(() => contactApi(token), 10000)
})

app.listen(3333)


const contactApi = async (token) => {
    console.info('Send POST request to action with token:', token)
    const result = await axios({
        method: 'POST',
        url: apiUrl,
        data: {
            message: 'The server\'s time is:' + new Date(),
        },
        headers: { 'authorization': 'Bearer ' + token, 'accept': 'application/json' }
    })
    console.info('The action replied with:', result.data)
}
