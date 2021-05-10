const router = require("express").Router();
module.exports = router;
// Docker setup
const Docker = require("dockerode");
const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

router.post("/", async (req, res, next) => {
  try {
    // Create docker instance
    const myContainer = await docker.createContainer({
      Image: "solve-it/node-sandbox-app",
    });

    // Start container
    await myContainer.start();

    // Write files for tests and usercode in docker
    const code = req.body.code;
    await dockerExec(myContainer, [
      "node",
      "writeFile.js",
      "userCode.js",
      code,
    ]);

    const output = await dockerExec(myContainer, ["node", "userCode.js"]);

    await myContainer.stop();
    await myContainer.remove();

    //Sending results back
    res.json(output);
  } catch (error) {
    next(error);
  }
});

async function dockerExec(container, command) {
  const exec = await container.exec({
    Cmd: command,
    Tty: false,
    AttachStdout: true,
    AttachStderr: true,
  });

  // Run exec and convert output stream into a string
  const commandOutput = await new Promise((resolve, reject) => {
    exec.start(async (err, stream) => {
      if (err) return reject(err);
      let message = "";
      stream.on("data", (data) => (message += data.toString()));
      stream.on("end", () => resolve(message));
    });
  });

  // Get the exit code for the command (0 === success)
  const { ExitCode } = await exec.inspect();
  if (ExitCode !== 0) {
    throw new Error(commandOutput);
  }
  return commandOutput;
}
