const {isPin} = require('../src/lambdas/validation.js')
const {isPinAssertionsObject} = require('../src/lambdas/validation.js')


function testAssertionsObjects(){
    console.log('--ASSERTIONS TEST\n')
    canditates = [
        [isPin,isPinAssertionsObject]
    ]
    canditates.forEach(c => {
        console.log('\tTesting Function -> ' + c[1].functionName)
        c[1].assertions.forEach(a => {
            console.log(isPin(''))
        })
    });
}

module.exports.testAll = function(){
    console.log('\n**************\n\nSTART OF TESTS\n\n**************\n')
    testAssertionsObjects();

}