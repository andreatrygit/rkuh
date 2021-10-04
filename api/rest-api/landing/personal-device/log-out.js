import {toughCookie} from '../../../src/lambdas/utils.js';

module.exports = (req, res) => {
    res.setHeader('Set-Cookie',[toughCookie('rkuh_session','',-1)]); //TODO cancella anche sul db
    res.status(200).json({"info":"Session burnt!"});
  }
