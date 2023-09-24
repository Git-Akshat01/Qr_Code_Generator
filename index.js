/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([{
    message: "Type in your URL: ",
    name: "URL",
    type: "input"
  }])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("./qr_image.png"));

    fs.writeFile("url.txt", url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      alert("Prompt couldn't be rendered in the current environment");
    } else {
      alert("Something else went wrong");
    }
  });