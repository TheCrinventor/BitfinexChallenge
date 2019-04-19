module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser":"babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "js": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/prefer-default-export": "off",
        "react/prefer-stateless-function": "off",
        "react/prop-types": "off",
        "consistent-return": "off",
        "react/no-array-index-key": "off",
        "react/sort-comp": "off",
        "no-param-reassign": "off",
        "no-nested-ternary": "off",
        "no-noninteractive-tabindex": "off",
        "no-plusplus": "off",
        "no-unused-vars": "error",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/label-has-for": {
            "required": {
                "some": [ "nesting", "id" ]
            }
        }
    }
};