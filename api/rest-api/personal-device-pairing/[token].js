const ejs = require('ejs');

const successString =

`<!DOCTYPE html>`+
`<html lang="en">`+
`<head>`+
    `<meta name="description" content="Rkuh Personal Device Pairing Successful" />`+
    `<meta charset="utf-8">`+
    `<title>Rkuh Personal Device Pairing Successful</title>`+
    `<meta name="viewport" content="width=device-width, initial-scale=1">`+
    `<meta name="author" content="Andrea Scotti">`+
    `<link rel="stylesheet" type="text/css" href="../../../../public/global.css">`+
`<head>`+
`<body>`+
    `<div class="w-screen h-screen p-4 flex flex-col flex-nowrap justify-center items-center space-y-10">`+
        `<div class="text-9xl animate-bounce">&#128516</div>`+
        `<div class="text-6xl text-center">Il tuo dispositivo è associato ad Rkuh!</div>`
        `<button class="btn btn-primary btn-large">EFFETTUA L&#39&nbspACCESSO</button>`+
    `</div>`
`</body>`


const failureString =""


const resBody = ejs.render(successString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}