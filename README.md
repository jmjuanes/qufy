# qufy

> A basic queue system to control file system operations

[![npm](https://img.shields.io/npm/v/qufy.svg?style=flat-square)](https://www.npmjs.com/package/qufy)
[![npm](https://img.shields.io/npm/dt/qufy.svg?style=flat-square)](https://www.npmjs.com/package/qufy)


## Install

Use [npm](https://www.npmjs.com) to install this module in your project:

```
npm install --save qufy
```

## Usage 

```javascript
//Import qufy 
var qufy = require('qufy');

//File to manage 
var file = './my-file.txt';

//Write to the file 
qufy.write(file, 'data-to-write', 'utf8', function(error)
{
  console.log('Write task done!');
});

//Append data to the file
//This will be called when the previous write task is finished
qufy.append(file, 'more-data', 'utf8', function(error)
{
  console.log('Append task done!');
});

//Read the file 
//This will be called when the previous write and append tasks are finished
qufy.read(file, 'utf8', function(error, data)
{
  console.log('Read task done!');
});
```

This will print in console: 

```
Write task done!
Append task done!
Read task done!
```

## API 

### qufy.append(path, data\[, options\], callback)

Same API than [fs.appendFile](https://nodejs.org/api/fs.html#fs_fs_appendfile_file_data_options_callback). 

This method will create an **append to file** task in the queue associated to `path`.

### qufy.read(path\[, options\], callback)

Same API than [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback).

This method will create a **read file** task in the queue associated to `path`.

### qufy.write(path, data\[, options\], callback)

Same API than [fs.writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback). 

This method will create a **write file** task in the queue associated to `path`.

### qufy.cancel(path)

Stop the queue associated to `path`.


## License

[MIT](./LICENSE) &copy; Josemi Juanes.
