const ejs = require('ejs');
const templateString = "<turbo-frame id='/api/site-pages-frames/landing' x-init='()=>{$el.classList.add('opacity-100')}'><div class='w-full h-40 bg-purple-500 opacity-0 m-1'></div></turbo-frame>";
const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}