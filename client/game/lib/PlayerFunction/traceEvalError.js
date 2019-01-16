import StackTracey from 'stacktracey';
import { SourceMapConsumer } from 'source-map';

export default async function traceEvalError(error, sourceMap) {

    const stackframes = new StackTracey(error.stack);
    const { callee, line:sLine, column:sCol } = stackframes[0];
    const consumer = await new SourceMapConsumer(sourceMap); 
    const { line:mLine, column: mCol } = consumer.originalPositionFor({ line:sLine, column:sCol });
    
    // make code preview
    const sourceContent = sourceMap.sourcesContent[0].split("\n")
    const linePrefixLength = (sourceContent.length - 1).toString().length + 5;
    const decoratedSource = sourceContent.map((v,k) => {
        if(k === 0) v = v.replace(/^funFromEval=/, "");
        const lineNumDigits = k.toString().length;
        const linePrefixSpaces = (new Array(linePrefixLength - 5 - lineNumDigits + 1)).join(" ");

        return "  " + linePrefixSpaces + (k+1) + " | " + v;
    })
    const lineIdx = mLine - 1;
    const line = decoratedSource[lineIdx];
    let linesDisplay, start = lineIdx - 2, end = lineIdx + 2;

    if( sourceContent.length < 5 ) {
        linesDisplay = decoratedSource.slice();
    } else if( sourceContent.length - 1 < end ) {
        const offset = end - sourceContent.length - 1;
        start -= offset;
        end = sourceContent.length - 1;
        linesDisplay = decoratedSource.slice(start);
    } else if(start < 0) {
        const offset = 0 - start;
        end += offset;
        linesDisplay = decoratedSource.slice(0, end+1);
    } else {
        linesDisplay = decoratedSource.slice(start, end+1);
    }
    
    const lineDisplayIdx = linesDisplay.indexOf(line);
    linesDisplay[lineDisplayIdx] = ">" + linesDisplay[lineDisplayIdx].substring(1);
    const errorIndicatorLine = (new Array(linePrefixLength - 2 + 1)).join(" ") + "| " + (new Array(mCol + 1).join(" ")) + "^"
    linesDisplay.splice(lineDisplayIdx + 1, 0, errorIndicatorLine)
    
    return Object.assign(error, { 
        loc:{ 
            line: mLine, 
            column: mCol 
        }, 
        code:linesDisplay.join("\n"), 
    })
}