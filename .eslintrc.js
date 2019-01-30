module.exports = {
  'root': true,
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  'plugins': [
    'ember'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  'env': {
    'browser': true
  },
  'rules': {
    'array-callback-return': 'error',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never',
    }],
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-array-constructor': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-new-object': 'error',
    'no-param-reassign': 'error',
    'no-restricted-globals': ['error', 'isNaN', 'isFinite'],
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'quote-props': ['error', 'always'],
    'quotes': ['error', 'single', {
      'avoidEscape': true,
    }],
    'radix': 'error',
    'semi': ['error', 'always'],
  },
  'overrides': [
    // node files
    {
      'files': [
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      'excludedFiles': [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      'parserOptions': {
        'sourceType': 'script',
        'ecmaVersion': 2015
      },
      'env': {
        'browser': false,
        'node': true
      },
      'plugins': ['node'],
      'rules': Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      }),
    },
  ],
};
