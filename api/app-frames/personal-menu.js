const ejs = require('ejs');
const templateString =
`<turbo-frame id="/api/app-frames/personal-menu">`+
    `<ol>`+
        `<li>Opzione 1</li>`+
        `<li>Opzione 2</li>`+
    `<ol>`+
`</turbo-frame>`;

const resBody = ejs.render(templateString);

module.exports = (req, res) => {
  res.status(200).send(resBody);
}