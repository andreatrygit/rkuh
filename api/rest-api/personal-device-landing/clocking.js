import {toughCookie} from '../../../src/lambdas/utils.js';

module.exports = (req, res) => {
    if (req.query.qrcode==="rkuh-clocking-12345")
    { 
      res.setHeader('Set-Cookie',[toughCookie('rkuh_session','',-1)]);
      res.status(200).json({"info":"clocked correctly"});
    }
    else
    {
      res.setHeader('Set-Cookie',[toughCookie('rkuh_session','',-1)]);
      res.status(200).json({"error":"wrong qrCode."});
    }
  }