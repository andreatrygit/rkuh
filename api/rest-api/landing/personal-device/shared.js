import {appidList} from '../../../../src/lambdas/appid-list';

module.exports = (req, res) => {
    if (req.query.qrcode==="rkuh-shared-12345" && req.query.pin==='12345' && appidList.includes(req.query.appid))
    { 
      res.status(200).json({"info":"logged-in: shared"}); //TODO anche sul db
    }
    else
    {
      res.status(200).json({"error":"wrong PIN or qrCode."});
    }
  }