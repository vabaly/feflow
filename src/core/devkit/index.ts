import path from 'path';

const resolveBuilder = (builderStr: string) => {
  const [packageName, builderName] = builderStr.split(':', 2);
  if (!builderName) {
    throw new Error('No builder name specified.');
  }
}

export function loadDevKit(configData: any) {
  const devkit = configData.devkit;
  return (ctx: any) => {
    for (const cmd in devkit.commands) {
      const builderStr = devkit.commands[cmd].builder;
      const [packageName, builderName] = builderStr.split(':', 2);
      const pkgPath = path.join(process.cwd(), 'node_modules', packageName);
      const kitJson = require(path.join(pkgPath, 'devkit.json'));
      const implementation = kitJson.builders[cmd].implementation;

      const handler = path.join(pkgPath, implementation);

      ctx.commander.register(cmd, 'desc', require(handler));
    }
  };
}
