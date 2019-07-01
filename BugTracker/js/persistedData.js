const fs = require('fs') 
let data = "Learning how to write in a file."
fs.writeFile('persistedData.txt', data, (err) => { 
    if (err) throw err; 
}) 