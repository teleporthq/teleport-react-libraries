import { readFileSync } from "fs";
import validate from "validate-npm-package-name";
import libraryDecoder from "../src/validators";
import { LibraryDefinition } from "../src/types";

const run = () => {
  const index = readFileSync("index.json", "utf-8");

  try {
    Object.values(JSON.parse(index)).forEach((item) => {
      Object.values(item).forEach((files) => {
        files.forEach((file: string) => {
          const content = readFileSync(`packages/${file}.json`, "utf-8");
          const parsedContent: LibraryDefinition = JSON.parse(content);
          if (parsedContent) {
            const result = libraryDecoder.run(parsedContent);
            if (result.ok) {
              console.log(`${file} - Parsed without errors`);

              if (!validate(parsedContent.name)) {
                throw new Error(`Invalid package name ${parsedContent.name}`);
              }

              if (parsedContent.slug !== file) {
                throw new Error("File name and slug name are not equal");
              }

              return;
            } else {
              console.error(result);
              throw new Error(`Error in validating - ${file}`);
            }
          }
        });
      });
    });
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

run();
