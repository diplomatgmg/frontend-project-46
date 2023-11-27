test:
	npm run test

test-coverage:
	npm run coverage

diff:
	node ./bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

diff-nested:
	node ./bin/gendiff.js ./__fixtures__/nestedFile1.json ./__fixtures__/nestedFile2.json


diff-yaml:
	node ./bin/gendiff.js ./__fixtures__/file1.yaml ./__fixtures__/file2.yaml

lint:
	npx eslint .
