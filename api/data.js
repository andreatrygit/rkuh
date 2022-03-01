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

function getDbCredentials(appid){
  return process.env[appid].split('###');
}

function executeTransaction(res,uri,user,password,txString,txData,thenCb){

  const neo4j = require('neo4j-driver')

  let driver;
  try {
     driver = neo4j.driver(uri, neo4j.auth.basic(user, password),
        {
            maxConnectionLifetime: 5,
            maxConnectionPoolSize: 1,
            connectionAcquisitionTimeout: 5,
            maxTransactionRetryTime: 0
        }
    );
    
  } catch (error) {
    driverError(res,error.code);
    return;
  }

  let session;

  try {
    session = driver.session();
  } catch (error) {
    sessionError(res, error.code);
    return;
  }

  const writeTxPromise = session.writeTransaction(tx => tx.run(txString,txData),{timeout: 5});

  writeTxPromise.catch(error => {
    transactionError(res,error.code);
    return;
  });

  writeTxPromise.then(result => {
      session.close();
      thenCb(res,result);
      return;    
    });
}

function extractKeys(obj,keys){
  output={}
}

const dataMapper = {
// entries are in the form "<funcName>":{
//                                        requestType:"<requestType>", one of "GlobalVisitor"|"NotRegistered"|"Registered"|"Logged"
//                                        extractionKeys: ["key0","key1",...]
//                                        cleaningPayloadLambda:<cleaningPayloadLambdaConstName>,
//                                        validationLambda:<validationLambdaConstName>,
//                                        transactionString:<transactionStringConstName>
//                                        processResultLambda:<processResultLambdaConstName>
//                                       }
}

module.exports = (req, res) => {
  const {funcName,...payload} = req.body;
  if (Object.keys(dataMapper).includes(funcName)) {
      dataMapper[funcName](req,res,payload);
  }
  else{
      funcNameError(res);
  }
}