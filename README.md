# eslint-prettier-setup

This script automates the setup of ESLint and Prettier in a Javascript project. It installs necessary dependencies, configures ESLint, sets up Prettier, and configures VS Code settings for automatic formatting.

## Usage

### Local Installation

**1**. Clone the repository:

```bash
git clone https://github.com/wisac/eslint-prettier-setup.git
cd eslint-prettier-setup
```

**2**. Run the script:

```bash
node eslint-prettier-setup.js
```

The script will guide you through the setup process and configure ESLint and Prettier in your project.

### Global Installation

If you prefer to use the script as a globally installed command, follow these steps:

**1.** Install the script globally:

```bash
npm install -g eslint-prettier-setup
```

**2**. Run the script:

```bash
eslint-prettier-setup
```

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- Prettier - Code Formatter extension installed in your code editor
- ESLint extension installed in your code editor
- Prettier allowed to use a local config file (e.g., .prettierrc)

### Configuration

The script uses the ESLint config wizard to set up ESLint. You can customize ESLint rules by modifying the generated .eslintrc.js or .eslintrc.json and .prettierrc files.
- NB: If you do not want eslint to flag bad code formatting as errors, in .eslintrc file, set **prettier/prettier** rule to **off** or **warn**

**Example configuation**
- .prettierrc configuraion
```bash
 {
  "printWidth": 100,
  "semi": false,
  "singleQuote": false,
  "trailingComma": "all"
}
```
- .eslintrc.json configuration
```bash
"rules": {
    "prettier/prettier": "off"
    "no-unused-vars": "error",
    "no-console": "off",
}
  ``````

### Note on Cross-Platform Compatibility:

To ensure compatibility across different operating systems, the "bin" field in package.json uses a platform-agnostic approach. When installing the package globally, the appropriate platform-specific script (e.g., .cmd on Windows) will be automatically generated.
