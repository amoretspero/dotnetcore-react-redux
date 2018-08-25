var path = require("path");
console.log(__dirname);
console.log(path.join(__dirname, ".."));
console.log(path.join(__dirname, "..", "wwwroot"));
console.log(path.join(__dirname, "..", "wwwroot", "dist"));