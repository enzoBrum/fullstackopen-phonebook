module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ["eslint:recommended", "prettier"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        quotes: ["error", "double"],
        eqeqeq: "error",
        "no-console": 0
    }
};
