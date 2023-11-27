test:
	npm run test

test-coverage:
	npm run coverage

diff:
	node ./bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

diff-yaml:
	node ./bin/gendiff.js ./__fixtures__/file1.yaml ./__fixtures__/file2.yaml

diff-json:
	node ./bin/gendiff.js --format json ./__fixtures__/file1.json ./__fixtures__/file2.json

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix
