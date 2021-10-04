import {makeTokenPair} from '../../../../src/lambdas/utils.js';

module.exports = (req,res) => {
    if (req.cookies['__Host-rkuh_device']==='shared') {
        const tokenPair = makeTokenPair();
        res.status(200).json({data: tokenPair[0]});
    } else {
        res.status(200).json({error: 'No Privilege to call this endpoint.'});
    }
}