/*
    webpack-scaffold-<name> - By <author>
    ----------------------
    Created using https://github.com/rishabh3112/webpack-scaffold-starter
*/
const Generator = require('yeoman-generator');
const {
    List,
    Input,
    InputValidate,
    Confirm
} = require("@webpack-cli/generators/lib/utils/scaffold-utils");

const {getPackageManager} = require("webpack-cli").utils;

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.dependences = ["webpack", "webpack-cli"];
    this.configuration = {
        config: {
            configName: "config",
            topScope: ["// generated using webpack-scaffold-<name>"],
            webpackOptions: {}
        }
    }
  }

  prompting() {
      const done = this.async();
      console.log(
`
  webpack-scaffold-<name>
  -----------------------
  <description>
`);
        Confirm(this, "start", "Do you want to scaffold? ")
        .then((answer) => {
            if (answer.start) {
                console.log("Let's start scaffolding!");
                done();
            } else {
                console.log("Okay, Exiting...");
                process.exit(0);
            }
        })
  }
/**
 * writing()
 * @description write files in user directory
 */
  writing() {
    this.config.set('configuration', this.configuration);
  }

  /**
   * install()
   * @description install dependencies in user directory
   */
  install() {
    const pkgManager = getPackageManager();
    const opts = pkgManager === 'yarn' ? { dev: true } : { 'save-dev': true };
    this.scheduleInstallTask(pkgManager, this.dependences, opts);
  }
};