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

function soft404(res){
    resStatusWithHtmlFile(200,res,"src/lambdas/templates-html/global-visitor/no-frame-for-global-visitor-device.html");
}

function softBadAppidFrameRequest(res){
    resStatusWithHtmlFile(200,res,"src/lambdas/templates-html/global-visitor/no-frame-for-not-registered-device.html");
}

function softBadDeviceFrameRequest(res){
    resStatusWithHtmlFile(200,res,"src/lambdas/templates-html/global-visitor/no-frame-for-registered-device.html");
}

function softBadSessionFrameRequest(res){
    resStatusWithHtmlFile(200,res,"src/lambdas/templates-html/global-visitor/no-frame-for-logged-in-device.html");
}

function softBadParametersFrameRequest(res){
    resStatusWithHtmlFile(200,res,"src/lambdas/templates-html/global-visitor/no-frame-by-wrong-parameters.html");
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
                let requestValidationResult = null;
                let tokenValue = null;
                if (frameNameObj.deviceType==='NotRegistered'){
                    requestValidationResult = isRequestFromNotRegisteredDevice(req);
                    if (!requestValidationResult[1]){
                        softBadAppidFrameRequest(res)
                        return;
                    }
                    else{
                        tokenValue = requestValidationResult[0];
                    }
                }
                if (frameNameObj.deviceType==='Registered'){
                    requestValidationResult = isRequestFromRegisteredDevice(req)
                    if (!requestValidationResult[1]){
                        softBadDeviceFrameRequest(res)
                        return;
                    }
                    else{
                        tokenValue = requestValidationResult[0];
                    }
                }
                if (frameNameObj.deviceType==='LoggedIn'){
                    requestValidationResult = isRequestFromLoggedInDevice(req)
                    if (!requestValidationResult[1]){
                        softBadSessionFrameRequest(res)
                        return;
                    }
                    else{
                        tokenValue = requestValidationResult[0];
                    }
                }
                let finalPayload;
                finalPayload = extractKeys(payload,frameNameObj.extractionKeys);
                if(frameNameObj.transofrmingPayloadLambda){finalPayload=frameNameObj.transofrmingPayloadLambda(finalPayload)}
                let payloadValidationResult = true;
                if(frameNameObj.validationLambda){payloadValidationResult=frameNameObj.validationLambda(finalPayload)}
                if(!payloadValidationResult){
                    softBadParametersFrameRequest(res);
                    return;
                }
                else{
                    finalPayload['tokenValue']=tokenValue;
                    if(frameNameObj.deviceType!=='GlobalVisitor'){
                        const {executeTransaction} = require('../src/lambdas/utils.js');
                    }
                    //mettere la gestione del Global Visitor che non si sa a quale db eventualmente parla..
                }
            }
            else{
                soft404(res);
            }
        }
        else{
            soft404(res);
        }
    }
    else{
        soft404(res);
    }
}