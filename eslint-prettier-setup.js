#!/usr/bin/env node
const { execSync } = require('child_process');

const fs = require('fs');
const path = require('path');

//eslint require package.json in other to init
if (!fs.existsSync(path.join(__dirname, "package.json"))) {
  throw Error("A package.json file is necessary to initialize ESLint. Run `npm init` to create a package.json file and try again.")
}

// Function to execute commands
const executeCommand = (command) => {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

// Run ESLint config wizard
executeCommand('npm init @eslint/config');

// Create Prettier configuration file
console.log('Creating Prettier configuration file...');
const prettierConfig = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
};

fs.writeFileSync('.prettierrc', JSON.stringify(prettierConfig, null, 2));

// Install Prettier as a devDependency
console.log('Installing Prettier as a devDependency...');
executeCommand('npm install --save-dev prettier');

// Install ESLint and Prettier integration packages
console.log('Installing ESLint and Prettier integration packages...');
executeCommand(
  'npm install --save-dev eslint-plugin-prettier eslint-config-prettier',
);

// Detect ESLint configuration file format (json or js)
const eslintConfigPath = path.join(process.cwd(), '.eslintrc');

const eslintConfigFormat = fs.existsSync(`${eslintConfigPath}.js`)
  ? 'js'
  : 'json';

// Configure ESLint rules
console.log('Configuring ESLint rules...');
const eslintConfigContent = require(eslintConfigPath);
const eslintRules = eslintConfigContent.rules || {};
eslintRules['prettier/prettier'] = 'error';

if (!eslintConfigContent.extends) {
  eslintConfigContent.extends = 'prettier';
} else if (
  typeof eslintConfigContent.extends === 'string' &&
  eslintConfigContent.extends !== 'prettier'
) {
  eslintConfigContent.extends = [eslintConfigContent.extends, 'prettier'];
} else if (
  Array.isArray(eslintConfigContent.extends) &&
  !eslintConfigContent.extends.includes('prettier')
) {
  eslintConfigContent.extends.push('prettier');
}

if (!eslintConfigContent.plugins) {
  eslintConfigContent.plugins = ['prettier'];
} else if (
  typeof eslintConfigContent.plugins === 'string' &&
  eslintConfigContent.plugins !== 'prettier'
) {
  eslintConfigContent.plugins = [eslintConfigContent.plugins, 'prettier'];
} else if (
  Array.isArray(eslintConfigContent.plugins) &&
  !eslintConfigContent.plugins.includes('prettier')
) {
  eslintConfigContent.plugins.push('prettier');
}

// Update the ESLint configuration file
if (eslintConfigFormat === 'js') {
  fs.writeFileSync(
    `${eslintConfigPath}.${eslintConfigFormat}`,
    `module.exports = ${JSON.stringify(eslintConfigContent, null, 2)};`,
  );
} else {
  eslintConfigContent.rules = eslintRules;
  fs.writeFileSync(
    eslintConfigPath,
    JSON.stringify(eslintConfigContent, null, 2),
  );
}

// Configure VS Code settings
console.log('Configuring VS Code settings...');
const vscodeSettings = {
  'editor.formatOnSave': true,
  'editor.formatOnPaste': true,
};

const vscodeDir = '.vscode';

const vscodeSettingsPath = path.join('.vscode', 'settings.json');

if (!fs.existsSync(vscodeDir)) {
  fs.mkdirSync(vscodeDir);
}
const currentSettings = fs.existsSync(vscodeSettingsPath)
  ? JSON.parse(fs.readFileSync(vscodeSettingsPath, 'utf-8'))
  : {};
fs.writeFileSync(
  vscodeSettingsPath,
  JSON.stringify({ ...currentSettings, ...vscodeSettings }, null, 2),
);

console.log('Setup completed successfully!');
