const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Keep Metro focused on the Expo app. The backend has its own node_modules tree,
// which can exhaust Windows file handles when Metro crawls the project root.
const projectRoot = path.resolve(__dirname);
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rootFolder = (folder) =>
  new RegExp(`^${escapeRegExp(projectRoot)}[\\\\/]${escapeRegExp(folder)}(?:[\\\\/]|$)`);

const appOnlyBlockList = [
  rootFolder('functions'),
  rootFolder('android'),
  rootFolder('ios'),
  rootFolder('.eas'),
  rootFolder('build'),
  rootFolder('dist'),
  rootFolder('.git'),
];

config.resolver.blockList = [
  ...(config.resolver.blockList || []),
  ...appOnlyBlockList,
];

module.exports = config;
