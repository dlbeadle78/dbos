const expectedNode = "v24.14.0";
const expectedNpm = "11.9.0";
if (process.version !== expectedNode) {
  console.error(`DBOS requires Node.js ${expectedNode}; received ${process.version}.`);
  process.exit(1);
}
if (process.env.npm_config_user_agent) {
  const match = /^npm\/([^ ]+)/u.exec(process.env.npm_config_user_agent);
  if (match?.[1] !== expectedNpm) {
    console.error(`DBOS requires npm ${expectedNpm}; received ${match?.[1] ?? "unknown"}.`);
    process.exit(1);
  }
}
