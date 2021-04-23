const ejs = require('ejs');
const templateString =
`<turbo-frame id="/api/site-pages-frames/landing2">`+
    `<div @click="$dispatch('log-out')" class="w-full h-40 bg-base-200">`+
`</div></turbo-frame>`;

const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}