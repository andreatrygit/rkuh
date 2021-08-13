const menus = {
    baseOperator:{
        Ruoli:{

        }
    }
}
const templateString =
`<turbo-frame id="/api/app-frames/personal-menu">`+
   `<div class="bg-base-100 flex flex-col justify-center transition-all duration-500"> `+
        `<div class="w-full flex flex-row flex-wrap content-center justify-center items-start">`+
               
        `</div>`+
    `<div>`+
`</turbo-frame>`;

module.exports = (req, res) => {
  res.status(200).send(templateString);
}