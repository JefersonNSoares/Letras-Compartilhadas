// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname)

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      alias: {
        "@assets": "./src/app/assets",
        "@components": "./src/app/components",
        "@pages": "./src/app/pages",
        "@routes": "./src/app/routes",
      },
    },
  }
})()
