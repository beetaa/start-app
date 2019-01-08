module.exports = {
    "env": {
        "es6": true,
        "jest": true,
        "browser": true,
        "commonjs": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};