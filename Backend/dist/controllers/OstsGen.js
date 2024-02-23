"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require("path");
let ostDirectory = path.join(__dirname, "../", "../", "../", "public/Osts", "/");
//let ostDirectory: string = "../../../public/Osts/";
console.log(ostDirectory);
let osts = [];
fs.readdir(ostDirectory, (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        for (let file of files) {
            ((file) => {
                osts.push(file);
            })(file);
        }
        console.log(osts);
    }
});
console.log(osts);
module.exports = osts;
