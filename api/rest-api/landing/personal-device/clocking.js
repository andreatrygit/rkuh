import {appidList} from '../../../../src/lambdas/appid-list';

module.exports = (req, res) => {
    if (req.query.qrcode==="rkuh-clocking-12345" && appidList.includes(req.query.appid))
    { 
      res.status(200).json({"info":"clocked correctly"});
    }
    else
    {
      res.status(200).json({"error":"wrong qrCode."});
    }
  }