import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import layouts from 'metalsmith-layouts'
import markdown from '@metalsmith/markdown'
// import permalinks from '@metalsmith/permalinks'
import copy from 'metalsmith-copy'
import comp from './comp.js'
import CompData from './comp-data.js'
import _ from 'lodash'

const generateTree = function (files) {
  let data = {
    "tree.html": {},
    "mini-tree.html": {},
  };
  let fileArr = [];
  Object.keys(files).forEach(filename => {
    if (filename.includes('index')) return
    if (!filename.includes('.md')) return
    const note = files[filename]
    note.filename = filename
    note.year = note.date.slice(0, 4)
    note.content =  note.summary
    fileArr.push(files[filename])
  });
  fileArr = fileArr.filter(note => note.index >= 0).sort((p, q) => p.date + p.index < q.date + q.index);
  data["mini-tree.html"].notes = fileArr.slice(0, 3);

  const fulltreeArr = _.groupBy(fileArr, 'year');
  data["tree.html"].notes = Object.keys(fulltreeArr).map(year => ({ year, notes: fulltreeArr[year]}))
  return data;
}

const metalsmith = Metalsmith('./')
.metadata({
  sitename: 'MKZ Life'
})
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
.source('./src')
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