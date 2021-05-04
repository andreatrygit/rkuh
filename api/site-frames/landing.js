const ejs = require('ejs');
const templateString =
`<turbo-frame id="/api/site-frames/landing">`+
    `<button @click="$dispatch('logged-in')" class="w-full btn btn-primary btn-lg">Entra nell&#39&nbspApp<button>`+
`</turbo-frame>`;

const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}