import PlayerFunction from './PlayerFunction';

const tester = PlayerFunction.fromString(
    "test",
    [],
    "this is a test",
    `    console.log(3);`
)

tester.execute(2)
console.log(tester.toString())

