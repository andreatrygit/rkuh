import {makeTokenPair} from '../../../src/lambdas/utils.js';

module.exports = (req,res) => {
    if (req.cookies['__Host-rkuh-device']==='timeclock') {
        const tokenPair = makeTokenPair();
        console.log(tokenPair)
        res.status(200).json({data: tokenPair[0]});
    } else {
        res.status(200).json({error: 'No Privilege to call this endpoint.'});
    }
}