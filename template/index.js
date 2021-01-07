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
    opts.env.configuration = {
        dev: {
            topScope: ["// genrated using webpack-scaffold-<name>"],
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
                process.exit();
            }
        })
  }
/**
 * writing()
 * @description write files in user directory
 */
  writing() {
    this.config.set('configuration', this.options.env.configuration);
  }

  /**
   * install()
   * @description install dependencies in user directory
   */
  install() {
    const pkgManager = getPackageManager();
    this.scheduleInstallTask(pkgManager, this.dependences);
  }
};