const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

/*
const path = require("path");

module.exports = {
  chainWebpack: config => {
    config
        .entry("app")
        .clear()
        .add("./src/vue/main.js")
        .end();
    config.resolve.alias
        .set("@", path.join(__dirname, "./src/vue"))
  }
};
*/
