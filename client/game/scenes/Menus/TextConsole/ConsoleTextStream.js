export default function ConsoleTextStream(inputLines, outputLines) {
    return {
        [Symbol.iterator]: function *() {
            const inputArray = inputLines.slice();
            const outputArray = outputLines.slice();
            let cursor = 0;

            while(true) {
                const inputLine = inputArray[cursor];
                const outputLine = outputArray[cursor] || "";
                let resultLine = "> ";
                if(!inputLine) return;

                yield resultLine;

                for( const char of inputLine ) {
                    resultLine += char;
                    if(char === "\n") resultLine += "... "
                    yield resultLine;
                }

                yield resultLine + "\n" + outputLine
                
                cursor++;
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

