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
    resStatusWithHtmlFile(200,res,"src/lambdas/templates-html/global-visitor/no-frame-for-global-visitor-device.html");
}

const framesMapper = {
// entries are in the form "<frameName>":{
//                                        deviceType:"<deviceType>", one of "GlobalVisitor"|"NotRegistered"|"Registered"|"LoggedIn"
//                                        extractionKeys: ["key0","key1",...]
//                                        transformingPayloadLambda:<transformingPayloadLambdaConstName>,
//                                        validationLambda:<validationLambdaConstName>,
//                                        transactionString:<transactionStringConstName>,
//                                        fileSelectionLambda:<fileSelectionLambdaConstName>,
//                                        filetransformationLambda:<filetransformationLambdaConstName>
//                                       }
    '/':(req,res,payload)=>{
        _200WithHtmlFile(res,"src/lambdas/templates-html/global-visitor/home.html");
    }
}

module.exports = (req, res) => {
    const {isRequestFromLoggedInDevice, isRequestFromRegisteredDevice, isRequestFromNotRegisteredDevice} = require('../src/lambdas/validation.js');
    const {extractKeys} = require('../src/lambdas/utils.js');
    if (req.body && typeof(req.body)==='object'){
        const {frameName,...payload} = req.body;
        if(frameName){
            if (Object.keys(framesMapper).includes(frameName)) {
                const frameNameObj = framesMapper[frameName];
                let requestValidationResult;
                if (frameNameObj.deviceType==='NotRegistered'){
                    requestValidationResult = isRequestFromNotRegisteredDeviceAssertionsObject(req);
                    
                }
                if (frameNameObj.deviceType==='Registered'){requestValidationResult = isRequestFromRegisteredDevice(req)}
                if (frameNameObj.deviceType==='LoggedIn'){requestValidationResult = isRequestFromLoggedInDevice(req)}
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