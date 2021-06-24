const { readFileSync } = require('fs')

const resBody = readFileSync("src/templates-html/personal-device-landing.html", 'utf8')

module.exports = (req, res) => {
  res.status(200).send(resBody);
}