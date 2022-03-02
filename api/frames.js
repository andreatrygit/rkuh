const { readFileSync } = require('fs');

function htmlStringToResBody(s){
    return JSON.stringify({htmlString : s});
}

function filePathToResBody(filePath){
    return htmlStringToResBody(readFileSync(filePath,'utf8'));
}

function resStatusWithHtmlFile(status,res,filePath){
    res.status(status).send(filePathToResBody(filePath));
}

function _200WithHtmlFile(res,filePath){
    resStatusWithHtmlFile(200,res,filePath);
}

function _soft404(res){
    resStatusWithHtmlFile(200,res,"src/lambdas/templates-html/not-registered/frame-not-found.html");
}

const framesMapper = {
// entries are in the form "<frameName>":{
//                                        requestType:"<requestType>", one of "GlobalVisitor"|"NotRegistered"|"Registered"|"Logged"
//                                        extractionKeys: ["key0","key1",...]
//                                        transformingPayloadLambda:<transformingPayloadLambdaConstName>,
//                                        validationLambda:<validationLambdaConstName>,
//                                        transactionString:<transactionStringConstName>,
//                                        fileSelectionLambda:<fileSelectionLambdaConstName>,
//                                        filetransformationLambda:<filetransformationLambdaConstName>
//                                       }
    '/':(req,res,payload)=>{
        _200WithHtmlFile(res,"src/lambdas/templates-html/not-registered/home.html");
    }
}

module.exports = (req, res) => {
    if (req.body && typeof(req.body)==='object'){
        const {frameName,...payload} = req.body;
        if(frameName){
            if (Object.keys(framesMapper).includes(frameName)) {
                framesMapper[frameName](req,res,payload);
            }
            else{
                _soft404(res);
            }
        }
        else{
            _soft404(res);
        }
    }
    else{
        _soft404(res);
    }
}