const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const lineReader = require('line-reader');
const commandLineArgs = require('command-line-args')
const util = require('util');

const optionDefinitions = [
  { name: 'output', alias: 'o', type: String, default: './output.csv' },
  { name: 'ignore', alias: 'i', multiple: true, type: String },
  { name: 'src', alias: 's', type: String, defaultOption: true },
]
const options = commandLineArgs(optionDefinitions)
if (!options.ignore) {
  options.ignore = []
}

console.log(options)

console.log(`Reading input file ${options.src}`)

function isEqual(a, b) {
  for (let key of Object.keys(a)) {
    if (a[key] !== b[key]) {
      return false
    }
  }
  return true
}

let state = 'none'
let url = ''
const broken = []

console.log(`Ignoring statuses: ${options.ignore}`)
var eachLine = util.promisify(lineReader.eachLine);
eachLine(options.src, function(line) {
    if (state === 'none') {
      if (line.startsWith('Getting links from:')) {
        url = line.match("from: (.*)")[1]
        state = 'link'
      }
    } else if(state === 'link') {
      if (line.startsWith("├─BROKEN─")) {
        const match = line.match(/├─BROKEN─ (.*)\s\((.*)\)/)
        if (match) {
          const entry = {
            'url': url,
            'link': match[1],
            'status': match[2]
          }
          if (broken.find((item) => isEqual(entry, item)) === undefined) {
            if (options.ignore.indexOf(entry['status']) === -1) {
              broken.push(entry)
            }
          }
        }
      } else if (line == '') {
        state = 'none'
      }
    }
}).then(function() {
  const csvWriter = createCsvWriter({
    path: options.output,
    header: [
        {id: 'url', title: 'URL'},
        {id: 'link', title: 'LINK'},
        {id: 'status', title: 'STATUS'}
    ]
  });
  csvWriter.writeRecords(broken)

  console.log(`Written ${broken.length} broken records`)
  console.log('All done!')
})