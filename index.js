import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import layouts from 'metalsmith-layouts'
import markdown from '@metalsmith/markdown'
// import permalinks from '@metalsmith/permalinks'
import copy from 'metalsmith-copy'
import comp from './comp-filler.js'
import CompData from './comp-data.js'
import DataGenerator from './data-generator.js'
import _ from 'lodash'

const sourceDir = './src'

const generateTree = function (files) {
  let data = {
    "tree.html": {}
  };
  let fileArr = [];
  Object.keys(files).forEach(filename => {
    if (filename.includes('index')) return
    if (!filename.includes('.md')) return
    const note = files[filename]
    note.filename = filename
    note.year = typeof note.date === 'string' ? note.date.slice(0, 4) : note.date.getFullYear();
    note.content =  note.summary
    fileArr.push(files[filename])
  });

  const fulltreeArr = _.groupBy(fileArr, 'year');
  data["tree.html"].notes = Object.keys(fulltreeArr).map(year => ({ year, notes: fulltreeArr[year]}))
  return data;
}

const metalsmith = Metalsmith('./')
.metadata({
  sitename: 'MKZ Life'
})
.source(sourceDir)
.use(DataGenerator(`${sourceDir}/lib/note.json`))
.use(copy({
  pattern: 'image/*',
  directory: '',
  move: true
}))
.use(copy({
  pattern: 'lib/*',
  directory: '',
  move: true
}))
.use(comp('./component', './template', CompData, generateTree, true))
.destination('./build')
.clean(true)
.use(collections({
  posts: 'article/*'
}))
.use(markdown())
//.use(permalinks())
.use(layouts({
  directory: 'template'
}))

metalsmith.build(function (err) {
  if (err) throw err
})