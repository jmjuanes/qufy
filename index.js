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
    queue.paths[path] = [];
  }

  //Add the task method
  queue.paths[path].push(cb);

  //Check the number of element
  if(queue.paths[path].length === 1)
  {
    //Run the queue
    return queue.run(path);
  }
};

//Run the queue
queue.run = function(path)
{
  //Check the number of tasks on this path
  if(queue.paths[path].length === 0)
  {
    //Delete the paths
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

//Exports file read method
module.exports.read = function(path, opt, cb)
{
  //Check the options
  if(typeof opt === 'function')
  {
    //Save the callback function
    var cb = opt;

    //Reset the options
    opt = {};
  }

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
  //Check the options
  if(typeof opt === 'function')
  {
    //Save the callback function
    var cb = opt;

    //Reset the options
    opt = {};
  }

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
