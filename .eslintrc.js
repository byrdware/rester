module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            2,
            { "SwitchCase": 1 }
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
