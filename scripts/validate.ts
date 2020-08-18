import { readFileSync } from "fs";
import libraryDecoder from "../validators";

const run = () => {
  const index = readFileSync("index.json", "utf-8");

  try {
    Object.values(JSON.parse(index)).forEach((item) => {
      Object.values(item).forEach((file) => {
        const content = readFileSync(`packages/${file}.json`, "utf-8");

        if (JSON.parse(content)) {
          const result = libraryDecoder.run(JSON.parse(content));
          if (result.ok) {
            console.log(`${file} - Parsed without errors`);
            return;
          } else {
            console.error(result);
            throw new Error(`Error in validating - ${file}`);
          }
        }
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

run();
