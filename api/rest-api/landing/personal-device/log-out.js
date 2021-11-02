import {toughCookie} from '../../../../src/lambdas/utils.js';
import {appidList} from '../../../../src/lambdas/appid-list';

module.exports = (req, res) => {
    if(appidList.includes(req.query.appid) && req.cookies['__Host-rkuh_device-appid_'+(req.query.appid ? req.query.appid : '')]){

      res.setHeader('Set-Cookie',[toughCookie(('rkuh_session-appid_'+req.query.appid),'',-1)]); //TODO cancella anche sul db
      res.status(200).json({"info":"Session burnt!"});

    }
  }
