export default [
    // This object tells ESLint to ignore dependencies so the lint run doesn't scan node_modules.
    {
        ignores: ["node_modules/**"],
    },
    // This config applies to JavaScript files in the project.
    {
        // Restricts the config to all .js files in the project.
        files: ["**/*.js"],
        // Sets the JavaScript language environment for parsing and globals.
        languageOptions: {
            // Uses the newest supported ECMAScript features.
            ecmaVersion: "latest",
            // Treats the code as ES modules because the project uses "type": "module".
            sourceType: "module",
            // Declares global variables that are allowed without import statements.
            globals: {
                console: "readonly",
                process: "readonly",
            },
        },
        // The actual lint rules for this project.
        rules: {
            // Requires function expressions to use arrow functions when possible.
            "prefer-arrow-callback": "error",
            // Disallows var declarations so block-scoped declarations are used instead.
            "no-var": "error",
            // Requires variables to be declared with const when they are never reassigned.
            "prefer-const": "error",
            // Enforces arrow functions to have a block body with explicit return statements.
            "arrow-body-style": ["error", "always"],
            // Requires all code paths in a function to return consistently.
            "consistent-return": "error",
            // Blocks commonly disallowed patterns in this course project.
            "no-restricted-syntax": [
                "error",
                {
                    // Selects require(...) calls and warns students to use ESM imports instead.
                    selector: "CallExpression[callee.name='require']",
                    message: "Use ESM import syntax instead of require().",
                },
                {
                    // Selects module.exports assignments and warns to use export default or named exports.
                    selector:
                        "AssignmentExpression[left.object.name='module'][left.property.name='exports']",
                    message: "Use ESM export syntax instead of module.exports.",
                },
                {
                    // Selects .then() calls so promise chains are replaced with async/await.
                    selector: "CallExpression[callee.property.name='then']",
                    message: "Use async/await instead of .then().",
                },
                {
                    // Selects .catch() calls so promise error handling is written with try/catch.
                    selector: "CallExpression[callee.property.name='catch']",
                    message:
                        "Use try/catch with async/await instead of .catch().",
                },
                {
                    // Selects an Express response call used as a standalone statement,
                    // such as res.status(200).json(data); without returning it.
                    selector:
                        "ExpressionStatement > CallExpression[callee.object.name='res'][callee.property.name=/^(json|send)$/]",
                    message:
                        "Return Express responses, such as return res.status(200).json(data).",
                },
                {
                    // Selects chained response calls like res.status(200).json(data) when they are not returned.
                    selector:
                        "ExpressionStatement > CallExpression[callee.property.name=/^(json|send)$/][callee.object.callee.object.name='res']",
                    message:
                        "Return Express responses, such as return res.status(200).json(data).",
                },
            ],
        },
    },
];
