const {isPin, isPinAssertionsObject} = require('../src/lambdas/validation.js')
const {isAppId, isAppIdAssertionsObject} = require('../src/lambdas/validation.js')
const {isToken, isTokenAssertionsObject} = require('../src/lambdas/validation.js')
const {testTokenEncDec} = require('../src/lambdas/utils.js')


function testAssertionsObjects(){
    console.log('\n--ASSERTIONS TEST')
    canditates = [
        [isPin,isPinAssertionsObject],
        [isAppId, isAppIdAssertionsObject],
        [isToken, isTokenAssertionsObject]
    ]
    
    canditates.forEach(c => {
        console.log('\n\tTesting Function -> ' + c[1].functionName + '\n')
        c[1].assertions.forEach(a => {
            if (c[0](a[0])===a[1]) {
                console.log('\t\tOK at ' + a[2])
            } else {
                console.log('\t\tFAILS at ' + a[2])
                throw '\n!!! TESTS STOPPED !!!\n\n'
            }
        })
    });
   
}

function testLowLevelIntegrations(){
    console.log('\n--LOW LEVEL INTEGRATIONS TESTS');
    testTokenEncDec();

}

module.exports.testAll = function(){
    try{
        console.log('\n**************\n\nSTART OF TESTS\n\n**************')
        testAssertionsObjects();
        testLowLevelIntegrations();
        console.log('\n**************\n\nEND OF TESTS\n\n**************\n')
    }
    catch(e){
        console.log(e)
    }
}