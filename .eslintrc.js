module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    plugins: ['sort-destructure-keys', 'prettier'],
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    env: {
        es6: true,
        node: true,
    },
    rules: {
        'no-var': 'error',
        semi: 'warn',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: [
                    'ConditionalExpression',
                    'TernaryExpression',
                    'ArrowFunctionExpression',
                ],
            },
        ],
        'no-multi-spaces': 'warn',
        'space-in-parens': 'warn',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
        'no-use-before-define': 'error',
        'max-len': ['warn', 150],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'sort-destructure-keys/sort-destructure-keys': 2,
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'prefer-template': 'warn',
        'object-shorthand': 'warn',
        curly: 'warn',
        '@typescript-eslint/no-inferrable-types': 'off',
        'eol-last': 'warn',
    },
};
