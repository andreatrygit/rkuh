const { readFileSync } = require('fs');

const mapper = {
    '/':(req,res,payload)=>{
        res.status(200).send(readFileSync("src/lambdas/templates-html/not-registered/home.html", 'utf8'));
    }
}

module.exports = (req, res) => {
    const {frameName,...payload} = req.body;
    mapper[frameName](req,res,payload);
}