import { createRequire } from "module";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Use tsx loader via dynamic import of compiled path — run with: npx tsx scripts/check-defs.ts
console.log("use check-defs.ts");
