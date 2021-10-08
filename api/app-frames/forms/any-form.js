const { readFileSync } = require('fs')

module.exports = (req, res) => {

    res.status(200).send(readFileSync("src/lambdas/templates-html/forms/any-form.html", 'utf8'));
   
}