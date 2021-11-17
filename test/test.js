const assert = require('assert/strict');
const { Console } = require('console');
const fs = require('fs');
const {isPin, isPinAssertionsObject} = require('../src/lambdas/validation.js')
const {isAppId, isAppIdAssertionsObject} = require('../src/lambdas/validation.js')
const {isToken, isTokenAssertionsObject} = require('../src/lambdas/validation.js')


function testAssertionsObjects(path='./src'){
    const dir = fs.opendirSync(path);
    let dirent;
    while (true) {
        dirent = dir.readSync();
        if (dirent) {
            if(dirent.isDirectory()){
                testAssertionsObjects(path+'/'+dirent.name)
            }
            if (dirent.isFile() && dirent.name.endsWith('.js')) {
                console.log('requiring ' + dirent.name)
                m = require('.' + path + '/' + dirent.name) //require stack is function local, not script based
                console.log(Object.keys(m))
            }
        } 
        else {
            break;
        }
    }
    // canditates = [
    //     [isPin,isPinAssertionsObject],
    //     [isAppId, isAppIdAssertionsObject],
    //     [isToken, isTokenAssertionsObject]
    // ]
    
    // canditates.forEach(c => {
    //     console.log('\n\tTesting Function -> ' + c[1].functionName + '\n')
    //     c[1].assertions.forEach(a => {
    //         console.log('\t\tTesting ' + a[2])
    //         assert.deepStrictEqual(c[0](a[0]),a[1])
    //     })
    // });
   
}

function testLowLevelIntegrations(){
}

module.exports.testAll = function(){
    try{
        console.log('\n**************\n\nSTART OF TESTS\n\n**************')
        console.log('\n--ASSERTIONS TEST')
        testAssertionsObjects();
        console.log('\n--LOW LEVEL INTEGRATIONS TESTS');
        testLowLevelIntegrations();
        console.log('\n**************\n\nEND OF TESTS\n\n**************\n')
    }
    catch(e){
        console.log(e) //'\n!!! FAILURE: TESTS STOPPED !!! \n\n'
    }
}