//Import dependencies
var fs = require('fs');

//Queue object
var queue = { paths: {} };

//Add a new queue task
queue.add = function(path, cb)
{
  //Check if the path is listed
  if(typeof queue.paths[path] === 'undefined')
  {
    //Initialize the tasks list
    queue.paths[path] = [ cb ];

    //Run the queue
    return queue.run(path);
  }
  else
  {
    //Add the task method
    queue.paths[path].push(cb);
  }
};

//Run the queue
queue.run = function(path)
{
  //Check if the queue exists
  if(typeof queue.paths[path] !== 'object'){ return; }

  //Check the number of tasks on this path
  if(queue.paths[path].length === 0)
  {
    //Delete this path object
    delete queue.paths[path];
  }
  else
  {
    //Get the task to run
    var task = queue.paths[path].shift();

    //Run this task
    return task(function()
    {
      //Continue with the next task
      return queue.run(path)
    });
  }
};

//Parse the options
var parse_options = function(opt)
{
  //Return the options object
  return (typeof opt === 'function') ? {} : opt;
};

//Parse the callback method
var parse_callback = function(opt, cb)
{
  //Return the callback function
  return (typeof opt === 'function') ? opt : cb;
};

//Exports file read method
module.exports.read = function(path, opt, cb)
{
  //Parse the callback
  cb = parse_callback(opt, cb);

  //Parse the option
  opt = parse_options(opt);

  //Add to the queue
  return queue.add(path, function(next)
  {
    //Read the file
    return fs.readFile(path, opt, function(error, data)
    {
      //Do the callback
      cb(error, data);

      //Continue with the queue
      return next();
    })
  });
};

//Exports file write method
module.exports.write = function(path, content, opt, cb)
{
  //Parse the callback
  cb = parse_callback(opt, cb);

  //Parse the option
  opt = parse_options(opt);

  //Add to the queue
  return queue.add(path, function(next)
  {
    //Write to the file
    return fs.writeFile(path, content, opt, function(error)
    {
      //Do the callback
      cb(error);

      //Continue with the next task of the queue
      return next();
    });
  });
};

//Exports file append method
module.exports.append = function(path, content, opt, cb)
{
  //Parse the callback
  cb = parse_callback(opt, cb);

  //Parse the option
  opt = parse_options(opt);

  //Add to the queue
  return queue.add(path, function(next)
  {
    //Append to the file
    return fs.appendFile(path, content, opt, function(error)
    {
      //Do the callback
      cb(error);

      //Continue with the next task of the queue
      return next();
    });
  });
};

//Cancel a queue
module.exports.cancel = function(file)
{
  //Delete the queue associated with file
  delete queue.paths[file];
};
