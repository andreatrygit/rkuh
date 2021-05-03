const ejs = require('ejs');
const templateString =
`<turbo-frame id="/api/site-pages-frames/landing">`+
    `<button @click="$dispatch('logged-in')" class="w-full btn btn-primary btn-lg">Entra nell'App<button>`+
`</turbo-frame>`;

const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}