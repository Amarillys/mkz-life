import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import layouts from 'metalsmith-layouts'
import markdown from '@metalsmith/markdown'
import permalinks from '@metalsmith/permalinks'
import comp from './comp.js'
import CompData from './comp-data.js'

const generateTree = function (files) {
  let data = {
    "tree.html": {}
  }
  for (let file in files) {
    console.log(file)
  }
  return data;
}

const metalsmith = Metalsmith('./')
.metadata({
  sitename: 'MKZ Life'
})
.use(comp('./component', './template', CompData, generateTree))
.source('./src')
.destination('./build')
.clean(true)
.use(collections({
  posts: 'article/*'
}))
.use(markdown())
.use(permalinks())
.use(layouts({
  directory: 'template'
}))

metalsmith.build(function (err) {
  if (err) throw err
})