function dataToResBody(obj){
  return JSON.stringify({data: obj});
}

function errorToResBody(errorName,errorMessage,errorData=null){
   return JSON.stringify({error: {name: errorName, message: errorMessage, data: errorData}});
}

function response(res,obj){
  res.status(200).send(dataToResBody(obj));
}

function requestBodyError(res){
  res.status(200).send(errorToResBody('requestBodyError','Request Body is not properly formatted.'));
}

function funcNameError(res){
  res.status(200).send(errorToResBody('FuncNameError','Function name unknown.'));
}

function requestError(res,errorMessage){
  res.status(200).send(errorToResBody('RequestError',errorMessage));
}


function dataValidationError(res,errorData){
  res.status(200).send(errorToResBody('DataValidationError','Failed data validation.',errorData));
}

function driverError(res,errorMessage){
  res.status(200).send(errorToResBody('DriverError',errorMessage));
}

function sessionError(res, errorMessage){
  res.status(200).send(errorToResBody('SessionError', errorMessage));
}

function transactionError(res,errorMessage){
  res.status(200).send(errorToResBody('TransactionError',errorMessage));
}

function privilegeError(res){
  res.status(200).send(errorToResBody('PrivilegeError','Transaction refuted for insufficient privilege.'));
}

function semanticValidationError(res){
  res.status(200).send(errorToResBody('SemanticValidationError','Transaction refuted for failed semantic validation.'));
}




const dataMapper = {
// entries are in the form "<funcName>":{
//                                        deviceType:"<deviceType>", one of "GlobalVisitor"|"NotRegistered"|"Registered"|"LoggedIn"
//                                        extractionKeys: ["key0","key1",...]
//                                        transformingPayloadLambda:<transformingPayloadLambdaConstName>,
//                                        validationLambda:<validationLambdaConstName>,
//                                        transactionString:<transactionStringConstName>,
//                                        processResultLambda:<processResultLambdaConstName>
//                                       }
}

module.exports = (req, res) => {
  if (req.body && typeof(req.body)==='object'){
    const {funcName,...payload} = req.body;
    if(funcName){
      if (Object.keys(dataMapper).includes(funcName)) {
          dataMapper[funcName](req,res,payload);
      }
      else{
          funcNameError(res);
      }
    }
    else{
      funcNameError(res);
    }
  }
  else{
    requestBodyError(res);
  }
}