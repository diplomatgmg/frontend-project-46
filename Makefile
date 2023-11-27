test:
	npm run test

test-coverage:
	npm run coverage

diff:
	tsc && node ./dist/bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

diff-yaml:
	tsc && node ./dist/bin/gendiff.js ./__fixtures__/file1.yaml ./__fixtures__/file2.yaml

diff-json:
	tsc && node ./dist/bin/gendiff.js --format json ./__fixtures__/file1.json ./__fixtures__/file2.json

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix
