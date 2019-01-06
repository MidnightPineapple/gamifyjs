import PlayerFunction from './PlayerFunction';

const tester = PlayerFunction.fromString(
    "test",
    [],
    "this is a test",
    `    let a = [1,2,3]
    console.log(a[3].wee);`
)

tester.execute(2)
console.log(tester.toString())

