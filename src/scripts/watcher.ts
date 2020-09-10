import chokidar from "chokidar";
import { exec } from "child_process";

const watcher = chokidar.watch(["packages/*.json"]);

watcher.on("change", () => {
  exec(`yarn validate`, (err, stdout, stderr) => {
    console.error(stdout);
    console.error(stderr);
  });
});
