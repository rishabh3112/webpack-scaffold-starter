/*
    webpack-scaffold-<name> - By <author>
    ----------------------
    Created using https://github.com/rishabh3112/webpack-scaffold-starter
*/
const Generator = require('yeoman-generator');
const {
    List,
    RawList,
    CheckList,
    Input,
    InputValidate,
    Confirm
} = require("@webpack-cli/webpack-scaffold");

module.exports = class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    opts.env.configuration = {
        dev: {
            topScope: [],
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
        this.prompt(Confirm("start", "Do you want to scaffold? "))
        .then((answer) => {
            if (answer.start) {
                console.log("Let's start scaffolding!");
                done();
            }
            done(); // to end questioning
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
    this.installDependencies();
  }
};