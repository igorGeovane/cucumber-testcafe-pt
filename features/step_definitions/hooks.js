var { defineSupportCode } = require('cucumber');
const fs                   = require('fs');
const createTestCafe       = require('testcafe');
const testControllerHolder = require('../support/testControllerHolder');

const DELAY  = 10 * 1000;

function createTestFile () {
    fs.writeFileSync('test.js',
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

        'fixture("fixture")\n' +

        'test("test", testControllerHolder.capture);');
}

function runTest () {
    var runner = null;

    createTestCafe('localhost', 1337, 1338)
        .then(function (tc) {
            runner   = tc.createRunner();

            return runner
                .src('./test.js')
                .browsers('firefox')
                .run()
                .catch(function (error) {
                    console.log('error - ' + error);
                });
        })
        .then(function (report) {
            console.log('report - ' + report);
        });
}

defineSupportCode(function({ setDefaultTimeout }) {
  setDefaultTimeout(DELAY);
});

defineSupportCode(function ({ registerHandler }) {
    registerHandler('BeforeFeatures', function (features, callback) {
        createTestFile();
        runTest();

        setTimeout(callback, DELAY);
    });

    registerHandler('AfterFeatures', function (features, callback) {
        testControllerHolder.free();
        fs.unlinkSync('test.js');
        setTimeout(callback, DELAY);
    });
});