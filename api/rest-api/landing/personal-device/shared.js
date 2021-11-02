import {appidList} from '../../../../src/lambdas/appid-list';

module.exports = (req, res) => {
    if (appidList.includes(req.query.appid)
        && req.cookies['__Host-rkuh_device-appid_'+(req.query.appid ? req.query.appid : '')]
        && req.query.qrcode==="rkuh-shared-12345"
        && req.query.pin==='12345')
    { 
      res.status(200).json({"info":"logged-in: shared"}); //TODO anche sul db
    }
    else
    {
      res.status(200).json({"error":"wrong PIN or qrCode."});
    }
  }