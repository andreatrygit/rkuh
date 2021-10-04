const { readFileSync } = require('fs')

module.exports = (req, res) => {

  switch(req.cookies['__Host-rkuh_device']){
    case 'timeclock':
      res.status(200).send(readFileSync("src/lambdas/templates-html/landing/timeclock-device.html", 'utf8'));
      break;
    case 'shared':
      res.status(200).send(readFileSync("src/lambdas/templates-html/landing/shared-device.html", 'utf8'));
      break;
    case 'personal':
      if (req.query['force_site']==='1') {
        const tempString = readFileSync("src/lambdas/templates-html/landing/visitor-device.html", 'utf8');
        const finalString = tempString.replace('?_vercel_no_cache=1','?force_site=1&_vercel_no_cache=1');
        res.status(200).send(finalString);  
      } else {
        res.status(200).send(readFileSync("src/lambdas/templates-html/landing/personal-device.html", 'utf8'));
      }
      break;  
    default:
      res.status(200).send(readFileSync("src/lambdas/templates-html/landing/visitor-device.html", 'utf8'));
      break;  
  }
  
}