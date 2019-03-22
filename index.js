#!/usr/bin/env node
const c = require("ansi-colors");
const inquirer = require("inquirer");
const { execSync } = require("child_process");
const fs = require("fs");
const { resolve } = require("path");

const USER_DIRECTORY = process.env.PWD;
const TEMPLATE_DIRECTORY = resolve(__dirname, "template");
const QUESTIONS = [
    {
        type: "input",
        prefix: c.greenBright(">"),
        message: "What is name of your scaffold?",
        name: "name",
        validate: (name) => {
            if (name === "") {
                return "Name cannot be left blank"
            }
            // Regular expression for valid npm package name
            if (!RegExp("^(?:@[a-z0-9-~][a-z0-9-._~]*/)?[a-z0-9-~][a-z0-9-._~]*$").test(name)){
                return "Invalid name"
            }
            return true;
        }
    },
    {
        type: "input",
        prefix:  c.greenBright(">"),
        message: "Enter description of your scaffold:",
        name: "description",
    },
    {
        type: "input",
        prefix:  c.greenBright(">"),
        message: "What is your name?",
        name: "author",
    },
];

const resolveTemplate = (path) => resolve(TEMPLATE_DIRECTORY, path);
const resolveUser = (path) => resolve(USER_DIRECTORY, path);
const l = (message) => { console.log(message); };
const info = (message) => { l(c.bold("\n" + c.blue("i") + c.italic(` ${message}`))); }
const done = () => {l(c.greenBright("\u2713 Done")); };

function start() {
    l(
`
        ${c.blueBright("webpack-scaffold-starter")}
        ------------------------
        Start your webpack scaffold on the go
`
    )
}

async function question() {
    info("Details of your scaffold");
    let answers = {};
    const details = await inquirer.prompt(QUESTIONS);
    answers = {answers, ...details};
    return answers;
}

function scaffold(answers) {
    info("Scaffolding files ...");
    const packageJSON = require("./template/package.json");
    packageJSON.name = answers.name;
    packageJSON.description = answers.description;
    packageJSON.author = answers.author;

    let index = fs.readFileSync(resolveTemplate("./index.js")).toString();
    index = index.replace(/<name>/g, answers.name);
    index = index.replace(/<description>/, answers.description);
    index = index.replace(/<author>/, answers.author);

    fs.writeFileSync(resolveUser("./package.json"), JSON.stringify(packageJSON, null, 2));
    fs.writeFileSync(resolveUser("./index.js"), index);
    done();
}

function install() {
    info("Installing Dependencies");
    l(c.gray("  May take few minutes..."));
    execSync(`cd ${USER_DIRECTORY} && npm install --quiet`);
    done();
}

(async() => {
    start();
    const answers = await question();
    scaffold(answers);
    install();
})();