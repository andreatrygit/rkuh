const ejs = require('ejs');
const templateString = "<turbo-frame id='/api/site-pages-frames/landing2'><div class='w-full h-40 bg-purple-500 m-1'></div></turbo-frame>";
const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}