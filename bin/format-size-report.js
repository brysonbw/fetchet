import fs from "fs/promises";

const report = JSON.parse(await fs.readFile("size-report.json", "utf8"));

const markdown = report
  .map((entry) => {
    const size = entry.gzip
      ? `${(entry.gzip / 1024).toFixed(2)} KB`
      : `${(entry.size / 1024).toFixed(2)} KB`;
    return `- **${entry.name || entry.path}**: \`${size}\``;
  })
  .join("\n");

console.log(`## Bundle Size Report\n\n${markdown}`);
