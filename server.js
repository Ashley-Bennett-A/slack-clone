const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const app = express()

const chatkit = new Chatkit.default({
   instanceLocator: 'v1:us1:e26280f8-acac-4da9-9e2a-80cd549547f8',
   key: '72fd743a-9401-42ad-8891-68a82a27cf9e:POglekpgNCHcvxtGOIyKWRvUzwtPr0r81gQgs4pv0i4=',

})

app.use(bodyParser.urlencoded({
   extended: false
}))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
console.log("We are here")
   const {
      username
   } = req.body
   chatkit
      .createUser({
         id: username,
         name: username
      })
      .then(() => res.sendStatus(201))
      .catch(error => {

         if (error.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
         } else {
            res.status(error.status).json(error)
         }
      })
})


app.post('/authenticate', (req, res) => {

   const authData = chatkit.authenticate({
      userId: req.query.user_id
   })
   res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err => {
   if (err) {
      console.error(err)
   } else {
      console.log(`Running on port ${PORT}`)
   }
})