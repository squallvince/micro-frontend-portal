const eslintrc = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'prettier/react',
  ],
  parserOptions: {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'spread': true,
      'restParams': true,
      'jsx': true
    },
    'sourceType': 'module',
    'ecmaVersion': 2018
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  settings: {
    react: {
      version: '16.9',
    },
  },
  plugins: ['markdown', 'react', 'babel', 'jest'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],  //数组的括号内的前后禁止有空格
    'block-spacing': ['error', 'always'], //代码块如果在一行内，那么大括号内的首尾必须有空格
    'camelcase': 0,
    'indent': 2, //强制一致的缩进风格
    'no-tabs': 'error',
    'space-before-blocks': ['error', 'always'], //if, function 等的大括号之前必须要有空格，比如 if (a) {
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    'no-const-assign': 'error',
    'no-duplicate-imports': 'error',  //禁止重复 import 模块
    'constructor-super': 'error',
    'arrow-body-style': 'off',
    'eol-last': 'error', //文件以换行符结束
    'no-label-var': 2, //不允许标签和变量同名
    'strict': [2, 'function'], //使用严格模式
    'class-methods-use-this': 'off',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],  //必须使用单引号，禁止使用双引号
    'no-console': 2, //不允许出现console语句
    'semi': ['error', 'always'],  //结尾必须没有分号
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],  //一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
    'semi-style': ['error', 'last'],  //分号必须写在行尾，禁止在行首出现
    'default-case': 'off', //switch 语句必须有 default
    'dot-location': ['error', 'property'], //链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],  //必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    'implicit-arrow-linebreak': ['error', 'beside'],  //箭头函数的函数体必须与箭头在同一行，或者被括号包裹
    'jsx-quotes': ['error', 'prefer-double'], //jsx 中的属性必须用双引号
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true
      }
    ],  //大括号内的首尾必须有换行
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: false
      }
    ],  //对象字面量只有一行时，大括号内的首尾必须有空格
    'padded-blocks': 'off', //代码块首尾必须要空行
    'no-floating-decimal': 'error', //表示小数时，禁止省略 0，比如 .5
    // 'no-extra-semi': 'error', //禁止出现多余的分号
    'no-debugger': 2, //禁用debugger
    'no-irregular-whitespace': 1, //不允许出现不规则的空格
    'no-trailing-spaces': 'error', //禁止行尾有空格
    'no-undef': 2, //不能有未定义的变量
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: true,
          BinaryExpression: false,
          VariableDeclarator: true,
          ImportDeclaration: true
        }
      }
    ], //禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true
      }
    ],  //定义过的变量必须使用
    'no-mixed-requires': 'off', //相同类型的 require 必须放在一起
    'require-await': 'off', //async 函数中必须存在 await 语句
    'react/jsx-curly-spacing': [2, {'when': 'never', 'children': true}], //在JSX属性和表达式中加强或禁止大括号内的空格。
    'react/jsx-indent-props': [2, 2], //验证JSX中的props缩进
    'react/no-did-mount-set-state': 0, //防止在componentDidMount中使用setState
    'no-mixed-spaces-and-tabs': 'error', //不允许混用tab和空格
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],
    'no-multiple-empty-lines': [
      1,
      {
        max: 2,
        maxEOF: 1,
        maxBOF: 1
      }
    ],    //禁止出现超过2行的连续空行
    'func-call-spacing': ['error', 'never'], //函数名和执行它的括号之间禁止有空格
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': ['error', {declaration: false, assignment: false}],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'site/**',
          'tests/**',
          'scripts/**',
          '**/*.test.js',
          '**/__tests__/*',
          '*.config.js',
          '**/*.md',
        ],
      },
    ],
    "import/prefer-default-export": 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'comma-dangle': [2, 'never'],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'prefer-destructuring': 0, // TODO: remove later
    'prefer-template': 1,
    'consistent-return': 0, // TODO: remove later
    'no-return-assign': 0, // TODO: remove later
    'no-param-reassign': 0, // TODO: remove later
    'react/destructuring-assignment': 0, // TODO: remove later
    'react/no-did-update-set-state': 0, // TODO: remove later
    'react/require-default-props': 0,
    'react/default-props-match-prop-types': 0,
    'import/no-cycle': 0,
    'react/no-find-dom-node': 0,
    'no-underscore-dangle': 0,
    'react/sort-comp': 0,
    // label-has-for has been deprecated
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 0,
    // for (let i = 0; i < len; i++)
    'no-plusplus': 0,
    // https://eslint.org/docs/rules/no-continue
    // labeledLoop is conflicted with `eslint . --fix`
    'no-continue': 0,
    'react/display-name': 0,
    // ban this for Number.isNaN needs polyfill
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,
    'react/static-property-placement': 0
  },
  globals: {
    gtag: true,
    React: true,
    ReactDOM: true,
    window: true,
    ActiveXObject: true
  }
};

if (process.env.env === 'development') {
  Object.assign(eslintrc.rules, {
    'indent': 2,
    'no-console': 0,
    'no-debugger': 0
  });
}

module.exports = eslintrc;