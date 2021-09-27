// Returns a license badge based on which license is passed in.
// If there is no license, returns an empty string.
function renderLicenseBadge(license) {
  const licensesToBadges = {
    "AGPL-3.0": "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
    "Apache-2.0": "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "BSD-2-Clause": "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
    "BSD-3-Clause": "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    "BSL-1.0": "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
    "CC0-1.0": "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)",
    "EPL-2.0": "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
    "GPL-2.0": "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
    "GPL-3.0": "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    "LGPL-3.0": "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
    "MIT": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    "MPL-2.0": "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    "Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
  };
  return license ? licensesToBadges[license] : '';
}

function getLicenseName(license) {
  const spdxIdsToNames = {
    "AGPL-3.0": "GNU Affero General Public License v3.0",
    "Apache-2.0": "Apache License 2.0",
    "BSD-2-Clause": "BSD 2-Clause \"Simplified\" License",
    "BSD-3-Clause": "BSD 3-Clause \"New\" or \"Revised\" License",
    "BSL-1.0": "Boost Software License 1.0",
    "CC0-1.0": "Creative Commons Zero v1.0 Universal",
    "EPL-2.0": "Eclipse Public License 2.0",
    "GPL-2.0": "GNU General Public License v2.0",
    "GPL-3.0": "GNU General Public License v3.0",
    "LGPL-3.0": "GNU Lesser General Public License v3.0",
    "MIT": "MIT License",
    "MPL-2.0": "Mozilla Public License 2.0",
    "Unlicense": "The Unlicense",
  };
  return license ? spdxIdsToNames[license] : '';
}

// Returns a link in markdown to the license given.
// If there is no license, returns an empty string.
function renderLicenseLink(license, useLocalLicenseFile = true) {
  const licensesToURLs = {
    "AGPL-3.0": "https://www.gnu.org/licenses/agpl-3.0",
    "Apache-2.0": "https://opensource.org/licenses/Apache-2.0",
    "BSD-2-Clause": "https://opensource.org/licenses/BSD-2-Clause",
    "BSD-3-Clause": "https://opensource.org/licenses/BSD-3-Clause",
    "BSL-1.0": "https://www.boost.org/LICENSE_1_0.txt",
    "CC0-1.0": "http://creativecommons.org/publicdomain/zero/1.0/",
    "EPL-2.0": "https://opensource.org/licenses/EPL-1.0",
    "GPL-2.0": "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",
    "GPL-3.0": "https://www.gnu.org/licenses/gpl-3.0",
    "LGPL-3.0": "https://www.gnu.org/licenses/lgpl-3.0",
    "MIT": "https://opensource.org/licenses/MIT",
    "MPL-2.0": "https://opensource.org/licenses/MPL-2.0",
    "Unlicense": "http://unlicense.org/"
  };
  return license ? `[${getLicenseName(license)}](${useLocalLicenseFile ? "./LICENSE" : licensesToURLs[license]})` 
                 : '';
}

// Returns the license section of a README.md
// If there is no license, returns an empty string
function renderLicenseSection(license) {
  if (!license) return '';
  return `
## License

This application is distributed under the terms of ${renderLicenseLink(license)}.
`;
}

// Returns the questions section of a README.md based on the properties
// 'email' and 'github' on the data object parameter.
// If both of those parameters are absent, returns an empty string.
function renderQuestionsSection(data) {
  const {email, github} = data;
  if (email && github) {
    return `
## Questions

If you have any questions, feel free to reach out via one of the following:

- Email: [${email}](mailto:${email})
- Github: @${github}
`;
  } else if (email) {
    return `
## Questions

If you have any questions, feel free to reach out via email to [${email}](mailto:${email})
`;
  } else if (github) {
    return `
## Questions

If you have any questions, feel free to reach out via on GitHub to @${github}.
`;
  } else {
    return '';
  }
}

function renderTableOfContents(data) {
  return `
## Contents

- [Installation](#installation)
- [Usage](#usage)
` + (data.contributing         ? "- [Contributing](#contributing)\n" : "")
  + (data.tests                ? "- [Tests](#tests)\n"               : "")
  + (data.email || data.github ? "- [Questions](#questions)\n"       : "")
  + (data.license              ? "- [License](#license)\n"           : "");
}

// Generates markdown for README.md
function generateMarkdown(data) {
  return `# ${data.title} ${renderLicenseBadge(data.license)}

## Description

${data.description}

${renderTableOfContents(data)}

## Installation

${data.install}

## Usage

${data.usage}

${data.contributing ?
`## Contributing

${data.contributing}
` : ''}
${data.tests ? 
`## Tests

${data.tests}
` : ''}
${renderQuestionsSection(data)}
${renderLicenseSection(data.license)}`;
}

module.exports = generateMarkdown;
