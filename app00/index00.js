import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let parsedPath = path.parse(__filename);
console.log(parsedPath);
