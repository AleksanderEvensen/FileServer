const express = require('express');
const path = require('path');
const fs = require('fs');
const ip = require('ip');
const app = express()
const port = 3000


const supportedFileTypes = ['png', 'jpeg']

app.post('/upload', (req, res) => {
    let ImageData = req.headers.imagedata;
    if (!typeof(ImageData) == 'string' || !ImageData.startsWith('data:image/') || !supportedFileTypes.includes(ImageData.split('/')[1].split(';')[0])) {return};
    let type = ImageData.split('/')[1].split(';')[0];

    let ID = Math.random().toString(36).substring(2);
    while(fs.existsSync(path.join(__dirname, `/public/images/${ID}.png`))) {
        ID = Math.random().toString(36).substring(2);
    }
    fs.writeFileSync(path.join(__dirname, `/public/images/${ID}.png`), ImageData.split(';base64,')[1], 'base64');
    res.send(`http://${ip.address()}:${port}/images/${ID}.png`);
})

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`File server is up and running on: http://localhost:${port}`)
})