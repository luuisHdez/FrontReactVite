
const { execSync } = require('child_process');

if (process.platform === "win32") {
  console.log("Installing @rollup/rollup-win32-x64-msvc...");
  execSync('npm install @rollup/rollup-win32-x64-msvc@^4.13.0', { stdio: 'inherit' });
}