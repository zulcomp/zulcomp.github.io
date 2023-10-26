'use strict'

import { publish } from "gh-pages";
import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fsExtra from fs-extra;

const __dirname = dirname(fileURLToPath(import.meta.url));

let sourceDir = join(__dirname, "src")
let destinationDir = join(__dirname, "dist")
console.log("destinationDir: " + destinationDir);

if (!existsSync(destinationDir)){
    mkdirSync(destinationDir, { recursive: true });
}
fsExtra.copy(sourceDir, destinationDir, (error) => {
    if (error) {
        throw error;
    } else {
      console.log("success!");
    }
});

publish('dist', {src: "**/*" }, err => {
    if (err) {
        throw err;
    } else {
      console.log("success!");
    }
});
