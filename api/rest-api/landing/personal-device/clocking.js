import {appidList} from '../../../../src/lambdas/appid-list';

module.exports = (req, res) => {
    if (appidList.includes(req.query.appid)
        && req.cookies['__Host-rkuh_device-appid_'+(req.query.appid ? req.query.appid : '')]
        && req.query.qrcode==="rkuh-clocking-12345")
    { 
      res.status(200).json({"info":"clocked correctly"});
    }
    else
    {
      res.status(200).json({"error":"wrong qrCode."});
    }
  }