const ejs = require('ejs');
const templateString = '<div class="w-full h-full bg-purple-500 m-1"></div>';
const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).body(resBody);
}