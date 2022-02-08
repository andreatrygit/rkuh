const { readFileSync } = require('fs');

const mapper = {
    '/':(req,res,payload)=>{
        res.status(200).send(readFileSync("src/lambdas/templates-html/not-registered/home.html", 'utf8'));
    }
}

module.exports = (req, res) => {
    const {frameName,...payload} = req.body;
    if (Object.keys(mapper).includes(frameName)) {
        mapper[frameName](req,res,payload);
    }
    else{
        res.status(200).send(readFileSync("src/lambdas/templates-html/not-registered/frame-not-found.html", 'utf8')); //soft 404
    }
}