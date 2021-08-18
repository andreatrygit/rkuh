const baseString =
`<!DOCTYPE html>`+
`<html lang="en">`+
`<head>`+
    `<meta name="description" content="Rkuh Device Pairing" />`+
    `<meta charset="utf-8">`+
    `<title>Rkuh Device Pairing</title>`+
    `<meta name="viewport" content="width=device-width, initial-scale=1">`+
    `<meta name="author" content="Andrea Scotti">`+
    `<link rel="stylesheet" type="text/css" href="../../../../global.css">`+
`<head>`;

const successString =
`<body>`+
    `<div class="w-screen h-screen p-4 flex flex-col flex-nowrap justify-center items-center space-y-5 md:space-y-10">`+
        `<div class="text-6xl md:text-9xl animate-bounce">&#128516</div>`+
        `<div class="text-4xl md:text-6xl text-center">Questo dispositivo è ora associato ad Rkuh!</div>`+
        `<a href="../../../.." class="btn btn-primary btn-large">EFFETTUA L&#39&nbspACCESSO</a>`+
    `</div>`+
`</body>`;

const failureString =
`<body>`+
    `<div class="w-screen h-screen p-4 flex flex-col flex-nowrap justify-center items-center space-y-5 md:space-y-10">`+
        `<div class="text-6xl md:text-9xl animate-bounce">&#128562</div>`+
        `<div class="text-4xl md:text-6xl text-center">Qualcosa non va...questo dispositivo NON è stato associato ad Rkuh!</div>`+
        `<a href="../../../.." class="btn btn-primary btn-large">VAI ALLA HOME PAGE</a>`+
    `</div>`+
`</body>`;



module.exports = (req, res) => {
  console.log(req.query.token);
  const outputString = baseString + (['personal','shared','timeclock'].includes(req.query.token) ? successString : failureString);
  var deviceToken = 'rkuh_device=NID=221=ldgZ1D3bDS4K42ACUdKRW7iyiZG2bUulL9bflcCtuhhWrHKaqGfGgYZOfnOvbcN1Lj22qK4GDVUfOHctmYKtI7XWwYPPsaPlprnEvX83FSy0LkBK4X0UGKRxbMIqTseWsdxoiyVrVbjrKpdd1FrQmuGab2uMftJ5j6nSa3dq1_c; expires=Thu, 17-Feb-2022 21:21:57 GMT; path=/; domain=rkuh.vercel.app ; HttpOnly'; 
  deviceToken += ';Max-Age=' + (60*60*24*30).toString();
  res.setHeader('Set-Cookie',[deviceToken]);
  res.status(200).send(outputString);
}