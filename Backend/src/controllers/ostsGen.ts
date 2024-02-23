const fs = require('fs');
import path = require("path");
let ostDirectory: string = path.join(__dirname, "../", "../", "../", "public/Osts", "/");
//let ostDirectory: string = "../../../public/Osts/";
console.log(ostDirectory);
let osts: string[] = [];

// osts: [ // Gonna restructure it into this later. 
//  {      //You gon also need ta make a subfolder in osts "icons"
//    name: "example",
//    icon: "example.png"
//  }
//]

fs.readdir(ostDirectory, (err: any, files: any) => {
  if (err) {
      console.log(err);
  } else {
      for (let file of files) {
          ((file: any) => {
              osts.push(file);
          })(file);
      }
      console.log(osts); //If you delete this line, it breaks for some reason.
  }
});


console.log(osts);
module.exports = osts;  