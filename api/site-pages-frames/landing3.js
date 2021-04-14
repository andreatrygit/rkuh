const ejs = require('ejs');
const templateString =
`<turbo-frame id="/api/site-pages-frames/landing3">`+
    `<div @click="$dispatch('set-title','hey')" class="w-full h-40 bg-base-200">`+
`</div></turbo-frame>`;

const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}