import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'


export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // セミコロンを禁止
      'semi': ['error', 'never'],
      // 文字列はシングルクォートを使用
      'quotes': ['error', 'single'],
      // インデントは2スペース
      'indent': ['error', 2],
      // 未使用の変数を禁止
      'no-unused-vars': ['error'],
      // コンソールログの使用を警告
      'no-console': ['warn'],
      // 一貫した改行スタイルを強制
      'linebreak-style': ['error', 'unix'],
      // 末尾のカンマを強制
      'comma-dangle': ['error', 'always-multiline'],
      // キーワード前後のスペースを強制
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      // 配列のブラケット内のスペースを強制
      'array-bracket-spacing': ['error', 'never'],
      // オブジェクトのブラケット内のスペースを強制
      'object-curly-spacing': ['error', 'always'],
      // 関数のかっこのスペースを強制
      'space-before-function-paren': ['error', 'never'],
      // 1行の最大文字数を強制
      'max-len': ['error', { 'code': 80 }],
      // 末尾のスペースを禁止
      'no-trailing-spaces': ['error'],
      // ブロックの前にスペースを強制
      'space-before-blocks': ['error', 'always'],
      // 変数宣言の順序を強制
      'one-var': ['error', 'never'],
      // jsxの規約が変わったのでoffにする
      'react/react-in-jsx-scope': 'off',
    },
  },
]
