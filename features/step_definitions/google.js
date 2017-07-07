var { defineSupportCode } = require('cucumber');
var Selector       = require('testcafe').Selector;

defineSupportCode(function ({ Given, When, Then }) {
    var testController = null;

    Given('Que estou com a página do Google aberta', function () {
        return this.waitForTestController()
            .then(function (tc) {
                testController = tc;
                return testController.navigateTo('http://google.com');
            });
    });

    When('Eu estou digitando minha pesquisa {stringInDoubleQuotes} no Google', function (text) {
        var input = Selector('#lst-ib').with({ boundTestRun: testController });

        return testController.typeText(input, text);
    });

    When('Eu estou pressionando a tecla {stringInDoubleQuotes} no Google', function (text) {
        return testController.pressKey(text);
    });

    Then('Eu deveria ver que o primeiro resultado do Google é {stringInDoubleQuotes}', function (text) {
        var firstLink = Selector('#rso > div:nth-child(1) > div > div > div > div > h3 > a').with({ boundTestRun: testController });

        return testController.expect(firstLink.innerText).contains(text);
    });
});