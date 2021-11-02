import {toughCookie} from '../../../../src/lambdas/utils.js';
import {appidList} from '../../../../src/lambdas/appid-list';

module.exports = (req, res) => {
  if (appidList.includes(req.query.appid)
      && req.cookies['__Host-rkuh_device-appid_'+(req.query.appid ? req.query.appid : '')]
      && req.query.pin==="12345")
  { 
    res.setHeader('Set-Cookie',[toughCookie(('rkuh_session-appid_'+req.query.appid),'@@@@@',3*60)]); //TODO anche sul db
    res.status(200).json({"info":"logged-in: personal"});
  }
  else
  {
    res.status(200).json({"error":"wrong PIN"});
  }
}