//Import dependencies
var path = require('path');
var qufy = require('../index.js');

//File to test
var file = path.join(process.cwd(), './file.txt');

//Write to the file
console.log('Register step 1');
qufy.write(file, 'This is a line\nThis is another line', 'utf8', function(error)
{
  console.log('Step 1 Done');
  console.log(error);
});

//Read the file content
console.log('Register step 2');
qufy.read(file, 'utf8', function(error, data)
{
  console.log('Step 2 Done');
  console.log(error);
  console.log(data);
});

//Append to the file
console.log('Register step 3');
qufy.append(file, '\nNew line', 'utf8', function(error)
{
  console.log('Step 3 Done');
  console.log(error);
});

//Read the file again
console.log('Register step 4');
qufy.read(file, 'utf8', function(error, data)
{
  console.log('Step 4 Done');
  console.log(error);
  console.log(data);
});

console.log('Tasks register completed');
