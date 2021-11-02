import {toughCookie} from '../../../../src/lambdas/utils.js';
import {appidList} from '../../../../src/lambdas/appid-list';

module.exports = (req, res) => {
  if (req.query.pin==="12345" && appidList.includes(req.query.appid))
  { 
    res.setHeader('Set-Cookie',[toughCookie(('rkuh_session-appid_'+req.query.appid),'@@@@@',3*60)]); //TODO anche sul db
    res.status(200).json({"info":"logged-in: personal"});
  }
  else
  {
    res.status(200).json({"error":"wrong PIN"});
  }
}