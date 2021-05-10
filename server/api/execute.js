const router = require('express').Router();
const fs = require('fs'); // for writing files
const { promisify } = require('util');
module.exports = router;
const path = require('path');
// For copying file into docker container
//const {exec} = require('child_process')
// Docker setup
const Docker = require('dockerode');
const docker = new Docker({
  host: '127.0.0.1',
  port: '8080',
  // socketPath: '/usr/src/app',
});
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const removeFileAsync = promisify(fs.unlink);
//const execAsync = promisify(exec);

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body.code);
    fs.writeFileSync(
      path.join(__dirname, '..', 'docker/codeTest.js'),
      req.body.code,
      (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }
    );
    const contents = fs.readFileSync(
      path.join(__dirname, '..', 'docker/codeTest.js')
    );

    // Create docker instance
    const myContainer = await docker.createContainer({
      Image: 'solve-it/node-sandbox-app',
    });

    // Start container
    await myContainer.start();

    // Write files for tests and usercode in docker
    const userCode = req.body.code;
    const userOutput = myContainer.exec({
      cmd: ['node', 'codeTest.js'],
      tty: false,
      AttachStdout: true,
      AttachStderr: true,
    });
    // //Sending results back
    res.json({ ...userOutput });
  } catch (error) {
    next(error);
  }
});

//Initiate docker with codefile passed into it
//docker renders code
//new file written with rendered code on it
//file returned
//contents taken and res.send(contents)
