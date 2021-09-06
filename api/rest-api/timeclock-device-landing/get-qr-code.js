import {makeTokenPair} from '../../../src/lambdas/utils.js';

module.exports = (req,res) => {
    if (req.cookies['__Host-rkuh_device']==='timeclock') {
        const tokenPair = makeTokenPair();
        console.log(tokenPair[0], tokenPair[1])
        res.status(200).json({data: tokenPair[0]});
    } else {
        res.status(200).json({error: 'No Privilege to call this endpoint.'});
    }
}