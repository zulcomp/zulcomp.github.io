'use strict'

import { publish } from "gh-pages";
import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {copy} from 'fs-extra/esm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseDist = "dist";

let sourceDir = join(__dirname, "src")
console.log("sourceDir: " + destinationDir);
let destinationDir = join(__dirname, baseDist)
console.log("destinationDir: " + destinationDir);

if (!existsSync(destinationDir)){
    mkdirSync(destinationDir, { recursive: true });
}

const filterFunc = (src, dest) => {
    if(src.endsWith(".md")) return false;
    else return true; 
}

copy(sourceDir, destinationDir, {filter: filterFunc}, (error) => {
    if (error) {
        throw error;
    } else {
      console.log("copy src to dist successful!");
    }
});

publish(baseDist, {src: ["**/*.html", "**/*.htm", "**/*.js", "**/scripts/*"] }, err => {
    if (err) {
        throw err;
    } else {
      console.log("gh pages publish successful!");
    }
});
