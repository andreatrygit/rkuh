const { readFileSync } = require('fs');

function htmlStringToJSON(s){
    return JSON.stringify({htmlString : s});
}

function filePathToJSON(filePath){
    return htmlStringToJSON(readFileSync(filePath,'utf8'));
}

function resStatusWithHtmlFile(status,res,filePath){
    res.status(status).send(filePathToJSON(filePath));
}

function _200WithHtmlFile(res,filePath){
    resStatusWithHtmlFile(200,res,filePath);
}

function _404WithHtmlFile(res){
    resStatusWithHtmlFile(404,res,"src/lambdas/templates-html/not-registered/frame-not-found.html");
}

const mapper = {
    '/':(req,res,payload)=>{
        _200WithHtmlFile(res,"src/lambdas/templates-html/not-registered/home.html");
    }
}

module.exports = (req, res) => {
    console.log(req.body);
    const {frameName,...payload} = req.body;
    if (Object.keys(mapper).includes(frameName)) {
        mapper[frameName](req,res,payload);
    }
    else{
        _404WithHtmlFile(res);
    }
}