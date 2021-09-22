# broken link checker parser

Teeny-tiny helper to parse the output of the [broken-link-checker](https://github.com/stevenvachon/broken-link-checker) command line tool into a simple list of pages and which links are actually broken.


## Usage

```
node index.js --output output.csv --ignore HTTP_308 --src example.txt
```

Using the `--ignore` option allows you to skip certain broken links.