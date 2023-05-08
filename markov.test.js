const markov = require("./markov");

test('makeText should return string', function () {
    let mm = new markov.MarkovMachine("I love green eggs and ham oh my god.")
    expect(mm.makeText()).toEqual(expect.any(String));
})

test('makeText should not return words that are not in original text', function () {
    let mm = new markov.MarkovMachine("I love green eggs and ham oh my god. Eggs and ham are so good.")
    expect(mm.makeText()).not.toContain("random");
})