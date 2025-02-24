const { EOL } = require('node:os');

const exec = require('../utils/promisifiedExec.js');

const downloadApp = require('../utils/downloadApp.js');
const getDeviceArch = require('../utils/getDeviceArch.js');

/**
 * @param {Record<string, any>} message
 * @param {import('ws').WebSocket} ws
 */
module.exports = async function selectAppVersion(message, ws) {
  let arch = message.arch;

  if (
    (global.jarNames.selectedApp === 'music' && global.jarNames.devices[0]) ||
    process.platform === 'android'
  ) {
    arch = await getDeviceArch(ws);
  }

  global.apkInfo = {
    version: message.versionChoosen,
    arch
  };

  await downloadApp(ws);
};
