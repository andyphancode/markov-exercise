/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

let method = process.argv[2];
let path = process.argv[3];


function makeText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function file(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.error(`Read file error: ${path}: ${err}`);
            process.exit(1);
        } else {
            makeText(data);
        }
    })
}

async function url(path){
    let resp;
    try {
        resp = await axios.get(path);

    } catch (err) {
        console.error(`Read URL error: ${url}: ${err}`);
        process.exit(1);
    }
    makeText(resp.data)
}

if (method === "file") {
    file(path);
} else if (method === "url") {
    url(path);
} else {
    console.error(`Incorrect method: ${method}`);
    process.exit(1);
}


module.exports = {file, url, makeText};