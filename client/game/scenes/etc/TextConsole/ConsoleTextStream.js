import Phaser from 'phaser';

export default function ConsoleTextStream(inputLines, outputLines) {
    return {
        [Symbol.iterator]: function *() {
            const inputArray = inputLines.slice();
            const outputArray = outputLines.slice();
            
            while(true) {
                const cursor = Phaser.Math.RND.between(0, inputArray.length - 1);
                const inputLine = inputArray[cursor];
                const outputLine = outputArray[cursor] || "";
                let resultLine = "> ";

                yield resultLine + "\u25ae";

                for( const char of inputLine ) {
                    resultLine += char;
                    if(char === "\n") resultLine += "... "
                    yield resultLine + "\u25ae";
                }

                yield resultLine + "\n" + outputLine
            }

        }
    }
}

ConsoleTextStream.delayed = function(ms, inputLines, outputLines) {
    return delayIterator(ms, ConsoleTextStream(inputLines, outputLines))
}

function delayIterator(ms, iterable) {
    const delay = ms => new Promise( s => setTimeout(s, ms) )
    return {
        [Symbol.asyncIterator]: async function*() {
            for(const it of iterable) {
              await delay(ms)
              yield it;
            }
        }
    }
}

