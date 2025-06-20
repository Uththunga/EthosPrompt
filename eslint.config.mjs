import { fileURLToPath } from 'url';
import path from 'path';
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jestPlugin from 'eslint-plugin-jest';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// Get the current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/test-*.js',
      '**/*.test.js',
      '**/vitest*.js',
      '**/test/**',
      '**/test-*',
      '**/*.test.ts',
      '**/vitest.setup.*',
      '**/test-utils/**',
    ],
  },
  
  // Base JavaScript configuration
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
  
  // TypeScript configuration for source files
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.app.json',
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
        createDefaultProgram: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
        JSX: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs['recommended'].rules,
      // Variables and types
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      
      // Functions
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': ['warn', { 
        allow: ['arrowFunctions', 'functions', 'methods'] 
      }],
      
      // Interfaces and types
      '@typescript-eslint/no-empty-interface': ['warn', { 
        allowSingleExtends: true 
      }],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/consistent-type-imports': 'warn',
      
      // Async/await
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      // Be more lenient with floating promises in common patterns
      '@typescript-eslint/no-floating-promises': ['warn', {
        ignoreVoid: true,    // Allow voiding promises with void operator
        ignoreIIFE: true,    // Allow Immediately Invoked Function Expressions
      }],
      // Allow more flexible promise usage in components
      '@typescript-eslint/no-misused-promises': ['warn', {
        checksVoidReturn: false,  // Disable void return checks to allow promise returns
      }],
      
      // Other
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/ban-types': ['warn', {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      }],
    },
  },
  
  // Configuration for test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.app.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'jest': jestPlugin,
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  
  // React configuration for JSX files
  {
    files: ['**/*.jsx', '**/*.tsx'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          jsxImportSource: '@emotion/react',
        },
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: './tsconfig.app.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
        JSX: 'readonly',
        React: 'readonly',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...(reactPlugin.configs['jsx-runtime']?.rules || {}),
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-undef': 'off', // Disable as TypeScript handles this
      
      // JSX specific rules - be more lenient with HTML entities in text
      'react/no-unescaped-entities': ['warn', {
        forbid: [
          { char: '>', alternatives: ['&gt;'] },
          { char: '}', alternatives: ['&#125;'] }
        ]
      }],
      // Allow common punctuation in text
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/self-closing-comp': ['warn', {
        component: true,
        html: true,
      }],
      'react/jsx-curly-brace-presence': ['warn', {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      }],
    },
  },
];
