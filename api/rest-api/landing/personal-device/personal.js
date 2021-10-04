import {toughCookie} from '../../../src/lambdas/utils.js';

module.exports = (req, res) => {
  if (req.query.pin==="12345")
  { 
    res.setHeader('Set-Cookie',[toughCookie('rkuh_session','@@@@@',3*60)]);
    res.status(200).json({"info":"logged-in: personal"});
  }
  else
  {
    res.setHeader('Set-Cookie',[toughCookie('rkuh_session','',-1)]);
    res.status(200).json({"error":"wrong PIN"});
  }
}