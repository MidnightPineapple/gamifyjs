import Phaser from 'phaser';

export default function ConsoleTextStream(inputLines, outputLines, { random } = {}) {
    return {
        [Symbol.iterator]: function *() {
            const inputArray = inputLines.slice();
            const outputArray = outputLines.slice();
            let cursor = -1;
            while(true) {
                if(random === true) {
                    // find a random cursor & make sure new cursor isn't equal to the old one
                    while(true) {
                        const rn = Phaser.Math.RND.between(0, inputArray.length - 1);
                        if( cursor !== rn ) {
                            cursor = rn;
                            break;
                        }
                    }
                } else {
                    cursor++;
                    if(!inputArray[cursor]) return;
                }

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

ConsoleTextStream.delayed = function(ms, inputLines, outputLines, config) {
    return delayIterator(ms, ConsoleTextStream(inputLines, outputLines, config))
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

