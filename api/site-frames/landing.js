const fs = require('fs')

let resBody="";

try {
  resBody = fs.readFileSync('../../src/templates-html/personal-device-landing.html', 'utf8')
} catch (err) {
  console.error(err)
}

module.exports = (req, res) => {
  res.status(200).send(resBody);
}