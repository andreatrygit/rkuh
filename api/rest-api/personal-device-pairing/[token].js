const ejs = require('ejs');

const baseString =
`<!DOCTYPE html>`+
`<html lang="en">`+
`<head>`+
    `<meta name="description" content="Rkuh Personal Device Pairing Successful" />`+
    `<meta charset="utf-8">`+
    `<title>Rkuh Personal Device Pairing Successful</title>`+
    `<meta name="viewport" content="width=device-width, initial-scale=1">`+
    `<meta name="author" content="Andrea Scotti">`+
    `<link rel="stylesheet" type="text/css" href="../../../../global.css">`+
`<head>`;

const successString =
`<body>`+
    `<div class="w-screen h-screen p-4 flex flex-col flex-nowrap justify-center items-center space-y-5 md:space-y-10">`+
        `<div class="text-6xl md:text-9xl animate-bounce">&#128516</div>`+
        `<div class="text-4xl md:text-6xl text-center">Il tuo dispositivo è associato ad Rkuh!</div>`+
        `<a href="../../../../index.html" class="btn btn-primary btn-large">EFFETTUA L&#39&nbspACCESSO</a>`+
    `</div>`+
`</body>`;

const failureString =
`<body>`+
    `<div class="w-screen h-screen p-4 flex flex-col flex-nowrap justify-center items-center space-y-5 md:space-y-10">`+
        `<div class="text-6xl md:text-9xl animate-bounce">&#128562</div>`+
        `<div class="text-4xl md:text-6xl text-center">Qualcosa non va... il tuo dispositivo NON è associato ad Rkuh!</div>`+
        `<a href="../../../../index.html" class="btn btn-primary btn-large">VAI ALLA HOME PAGE</a>`+
    `</div>`+
`</body>`;



module.exports = (req, res) => {
  const outputString = baseString + (req.query.token==='000' ? successString : failureString);
  const resBody = ejs.render(outputString);
  res.status(200).send(resBody);
}