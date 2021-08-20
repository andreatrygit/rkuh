import {toughCookie} from '../../../src/lambdas/utils.js';

module.exports = (req, res) => {
    if (req.query.qrcode==="rkuh-shared-12345" && req.query.pin==='12345')
    { 
      res.setHeader('Set-Cookie',[toughCookie('rkuh_session','',-1)]);
      res.status(200).json({"info":"logged-in: shared"});
    }
    else
    {
      res.setHeader('Set-Cookie',[toughCookie('rkuh_session','',-1)]);
      res.status(200).json({"error":"wrong PIN or qrCode."});
    }
  }