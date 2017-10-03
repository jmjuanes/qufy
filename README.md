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
var file1 = './my-file.txt';

//Write to the file 
// This will register a new queue associated to `file1`, and will add this write task.
// Also, this task will be executed directly because there is not waiting tasks on this queue.
qufy.write(file1, 'data-to-write', 'utf8', function(error)
{
  console.log('Write task to file1 done!');
});

//Append data to the file
// This will be added to the queue associated to `file1`. When the previous write task is 
// completed, this task will be executed.
qufy.append(file1, 'more-data', 'utf8', function(error)
{
  console.log('Append task to file1 done!');
});

//Read the file 
// This will be added to the queue associated to `file1`. When the previous append task is
// completed, this task will be executed.
qufy.read(file1, 'utf8', function(error, data)
{
  console.log('Read task to file1 done!');
});

//Another file 
var file2 = './my-file-2.txt';

//Write task to file2
// This will create a new task associated to `file2`. This queue is independent of the queue associated 
// with `file1`, because paths are not equals.
qufy.write(file2, 'data-to-write', 'utf8', function(error)
{
  console.log('Write task fo file2 done!');
});
```

This will print in console: 

```
Write task to file1 done!
Write task to file2 done!
Append task to file1 done!
Read task to file1 done!
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

### qufy.unlink(path, callback)

Same API as [fs.unlink](https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback). 

This method will create a **unlink** task in the queue associated to `path`.

### qufy.cancel(path)

Stop the queue associated to `path`.


## License

[MIT](./LICENSE) &copy; Josemi Juanes.
