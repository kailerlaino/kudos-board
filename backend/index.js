const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Adopt-a-Pet</title>
      </head>
      <body>
        <h1>Hello, World!</h1>
        <p>Welcome to my kudos board server.</p>
      </body>
    </html>
  `)
})

app.listen(PORT, () => {
    console.log(`Kudos server running at http://localhost:${PORT}!`)
})