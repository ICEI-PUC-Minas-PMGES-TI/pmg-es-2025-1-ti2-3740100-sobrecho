import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextEslintPluginNext from '@next/eslint-plugin-next';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([
	globalIgnores([
		'**/node_modules',
		'**/.next',
		'**/out',
		'**/build',
		'**/coverage',
		'**/.vercel',
		'**/*.js',
		'**/*.log',
		'**/bun.lockb',
		'**/.bun',
		'src/components/ui'
	]),
	{
		extends: compat.extends(
			'eslint:recommended',
			'plugin:react/recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:prettier/recommended',
			'prettier'
		),

		plugins: {
			react,
			'@typescript-eslint': typescriptEslint,
			'react-hooks': fixupPluginRules(reactHooks),
			'@next/next': nextEslintPluginNext,
			perfectionist,
			sonarjs,
			'jsx-a11y': jsxA11y,
			'unused-imports': unusedImports
		},

		languageOptions: {
			globals: {
				...globals.browser
			},

			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module'
		},

		settings: {
			react: {
				version: 'detect'
			}
		},

		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'error',

			'jsx-a11y/alt-text': 'warn',
			'jsx-a11y/anchor-is-valid': 'warn',
			'jsx-a11y/aria-role': 'warn',
			'jsx-a11y/click-events-have-key-events': 'warn',
			'jsx-a11y/label-has-associated-control': 'warn',
			'jsx-a11y/no-autofocus': 'warn',
			'jsx-a11y/no-static-element-interactions': 'warn',
			'jsx-a11y/role-supports-aria-props': 'warn',

			'sonarjs/no-duplicate-string': 'warn',
			'sonarjs/no-identical-functions': 'warn',
			'sonarjs/no-collapsible-if': 'warn',
			'sonarjs/no-unused-collection': 'warn',
			'sonarjs/prefer-single-boolean-return': 'warn',
			'sonarjs/prefer-immediate-return': 'warn',

			'@typescript-eslint/no-empty-object-type': 'off',

			'no-unused-vars': 'off',
			'no-console': 'warn',
			'unused-imports/no-unused-imports': 'warn',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			],

			'perfectionist/sort-imports': [
				'warn',
				{
					type: 'alphabetical',
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'type',
						'side-effect'
					],
					newlinesBetween: 'always',
					order: 'asc'
				}
			]
		}
	}
]);
