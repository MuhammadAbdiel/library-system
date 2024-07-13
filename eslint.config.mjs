import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-undef': 'off',
      'no-unused-consts': 'off',
      'no-dupe-keys': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      '/node_modules',
      '/build',
      '/.pnp',
      '.pnp.js',
      '/coverage',
      '/postman_collection',
      '.DS_Store',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
    ],
  },
]
