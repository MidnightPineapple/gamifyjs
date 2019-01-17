const fs = require('fs');
const util = require('util');
const path = require("path");
const INDEX_HTML_PATH = path.resolve(__dirname,"../../.tmp/public/index.html");
const readFile = util.promisify(fs.readFile)

module.exports = async function(req, res) {

    if(req.wantsJSON) {
        res.status(404);
        return res.send(JSON.stringify("Not Found"));
    }
    
    try {
        let file = await readFile(INDEX_HTML_PATH, 'utf-8');
        // make the path to react bundle from html-webpack-plugin an absolute path 
        file = file.replace(/(<script src=")(assets\/js\/[\w.-_]+.bundle.js)/,'$1/$2');
        res.status(200);
        return res.send(file)
    } catch(e) {
        return res.notFound();
    }
    
}