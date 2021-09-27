// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// Licenses from GitHub
const licenses = [
    {
      "key": "agpl-3.0",
      "name": "GNU Affero General Public License v3.0", 
      "spdx_id": "AGPL-3.0",
      "url": "https://api.github.com/licenses/agpl-3.0",
      "node_id": "MDc6TGljZW5zZTE="
    },
    {
      "key": "apache-2.0",
      "name": "Apache License 2.0",
      "spdx_id": "Apache-2.0",
      "url": "https://api.github.com/licenses/apache-2.0",
      "node_id": "MDc6TGljZW5zZTI="
    },
    {
      "key": "bsd-2-clause",
      "name": "BSD 2-Clause \"Simplified\" License",
      "spdx_id": "BSD-2-Clause",
      "url": "https://api.github.com/licenses/bsd-2-clause",
      "node_id": "MDc6TGljZW5zZTQ="
    },
    {
      "key": "bsd-3-clause",
      "name": "BSD 3-Clause \"New\" or \"Revised\" License",
      "spdx_id": "BSD-3-Clause",
      "url": "https://api.github.com/licenses/bsd-3-clause",
      "node_id": "MDc6TGljZW5zZTU="
    },
    {
      "key": "bsl-1.0",
      "name": "Boost Software License 1.0",
      "spdx_id": "BSL-1.0",
      "url": "https://api.github.com/licenses/bsl-1.0",
      "node_id": "MDc6TGljZW5zZTI4"
    },
    {
      "key": "cc0-1.0",
      "name": "Creative Commons Zero v1.0 Universal",
      "spdx_id": "CC0-1.0",
      "url": "https://api.github.com/licenses/cc0-1.0",
      "node_id": "MDc6TGljZW5zZTY="
    },
    {
      "key": "epl-2.0",
      "name": "Eclipse Public License 2.0",
      "spdx_id": "EPL-2.0",
      "url": "https://api.github.com/licenses/epl-2.0",
      "node_id": "MDc6TGljZW5zZTMy"
    },
    {
      "key": "gpl-2.0",
      "name": "GNU General Public License v2.0",
      "spdx_id": "GPL-2.0",
      "url": "https://api.github.com/licenses/gpl-2.0",
      "node_id": "MDc6TGljZW5zZTg="
    },
    {
      "key": "gpl-3.0",
      "name": "GNU General Public License v3.0",
      "spdx_id": "GPL-3.0",
      "url": "https://api.github.com/licenses/gpl-3.0",
      "node_id": "MDc6TGljZW5zZTk="
    },
    {
      "key": "lgpl-3.0",
      "name": "GNU Lesser General Public License v3.0",
      "spdx_id": "LGPL-3.0",
      "url": "https://api.github.com/licenses/lgpl-3.0",
      "node_id": "MDc6TGljZW5zZTEy"
    },
    {
      "key": "mit",
      "name": "MIT License",
      "spdx_id": "MIT",
      "url": "https://api.github.com/licenses/mit",
      "node_id": "MDc6TGljZW5zZTEz"
    },
    {
      "key": "mpl-2.0",
      "name": "Mozilla Public License 2.0",
      "spdx_id": "MPL-2.0",
      "url": "https://api.github.com/licenses/mpl-2.0",
      "node_id": "MDc6TGljZW5zZTE0"
    },
    {
      "key": "unlicense",
      "name": "The Unlicense",
      "spdx_id": "Unlicense",
      "url": "https://api.github.com/licenses/unlicense",
      "node_id": "MDc6TGljZW5zZTE1"
    }
  ];


// Array of questions for user input
const questions = [
    {
        name: 'title',
        message: 'Project Title',
        default: 'My Project'
        // default: process.env.OS.toLowerCase().includes('windows')  ? process.cwd().split('\\').pop() : process.cwd().split('/').pop()
    },
    {
        name: 'email',
        message: 'Email Address'
    },
    {
        name: 'github',
        message: 'GitHub Username'
    },
    {
        name: 'license',
        message: 'License',
        type: 'list',
        choices: licenses.map(
          license => ({value:license.spdx_id, name: license.name, short: license.spdx_id}))
    },
    {
        name: 'description',
        type: 'input',
        message: 'Project Description',
        default: `Short description of the project`
    },
    {
        name: 'install',
        type: 'editor',
        message: 'Installation Instructions',
        default: `What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.`
    },
    {
        name: 'usage',
        type: 'editor',
        message: 'Usage',
        default: `Provide instructions and examples for use. Include screenshots as needed.`
    },
    {
        name: 'contributing',
        type: 'input',
        message: 'Contributing Guidelines'
    },
    {
        name: 'tests',
        type: 'input',
        message: 'Tests'   
    }
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Your readme file was successfully generated as '${fileName}'`);
    }
  });
}

function init() {
  inquirer.prompt(questions)
  .then(answers => {
    const markdown = generateMarkdown(answers);
    writeToFile('README.md', markdown);
  })
}

// Function call to initialize app
init();
