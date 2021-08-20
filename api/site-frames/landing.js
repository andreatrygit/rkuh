const { readFileSync } = require('fs')

module.exports = (req, res) => {

  switch(req.cookies.__Host-rkuh_device){
    case 'timeclock':
      res.status(200).send(readFileSync("src/lambdas/templates-html/timeclock-device-landing.html", 'utf8'));
      break;
    case 'shared':
      res.status(200).send(readFileSync("src/lambdas/templates-html/shared-device-landing.html", 'utf8'));
      break;
    case 'personal':
      res.status(200).send(readFileSync("src/lambdas/templates-html/personal-device-landing.html", 'utf8'));
      break;  
    default:
      res.status(200).send(readFileSync("src/lambdas/templates-html/visitor-device-landing.html", 'utf8'));
      break;  
  }
  
}