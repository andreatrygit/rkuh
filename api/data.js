function dataToResBody(obj){
  return JSON.stringify({data: obj});
}

function errorToResBody(errorName,errorMessage,errorData=null){
   return JSON.stringify({error: {name: errorName, message: errorMessage, data: errorData}});
}

function response(res,obj){
  res.status(200).send(dataToResBody(obj));
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

function sessionError(res){
  res.status(200).send(errorToResBody('SessionError','Failed to start a session.'));
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

module.exports = (req, res) => {
    

    
    
  }