const assert = require('assert/strict');
const fs = require('fs');

function testAssertionsObjects(path='./src'){
    const dir = fs.opendirSync(path);
    let dirent;
    let _module;
    let funcName;
    let assertionsObjectName;
    while (true) {
        dirent = dir.readSync();
        if (dirent) {
            if(dirent.isDirectory()){
                testAssertionsObjects(path+'/'+dirent.name)
            }
            if (dirent.isFile() && dirent.name.endsWith('.js')) {
                _module = require('.' + path + '/' + dirent.name) //require stack is function local, not script based
                Object.keys(_module).forEach(key => {
                    if (key.endsWith('AssertionsObject')) {
                        assertionsObjectName = key 
                        funcName = key.replace('AssertionsObject','');

                        console.log('\n\tTesting Function -> ' + _module[assertionsObjectName].functionName + ' from ' + dirent.name + '\n')
                        _module[assertionsObjectName].assertions.forEach(a => {
                            console.log('\t\tTesting ' + a[2])
                            assert.deepStrictEqual(_module[funcName](a[0]),a[1])
                        })

                    }
                })
            }
        } 
        else {
            break;
        }
    }
}

function testIntegrations(path='./src'){
    const dir = fs.opendirSync(path);
    let dirent;
    let _module;
    let funcName;
    while (true) {
        dirent = dir.readSync();
        if (dirent) {
            if(dirent.isDirectory()){
                testIntegrations(path+'/'+dirent.name)
            }
            if (dirent.isFile() && dirent.name.endsWith('.js')) {
                _module = require('.' + path + '/' + dirent.name) //require stack is function local, not script based
                Object.keys(_module).forEach(key => {
                    if (key.startsWith('testIntegration')) {
                        funcName = key;

                        console.log('\n\tTesting Function -> ' + funcName + ' from ' + dirent.name + '\n');
                       _module[funcName]();

                    }
                })
            }
        } 
        else {
            break;
        }
    }
}


module.exports.testAll = function(){
    try{
        console.log('\n**************\n\nSTART OF TESTS\n\n**************')
        console.log('\n--ASSERTIONS TEST')
        testAssertionsObjects();
        console.log('\n--LOW LEVEL INTEGRATIONS TESTS');
        testIntegrations();
        console.log('\n**************\n\nEND OF TESTS\n\n**************\n')
    }
    catch(e){
        console.log('\n!!! FAILURE: TESTS STOPPED !!! \n\n##############################' + e)
    }
}