import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import layouts from 'metalsmith-layouts'
import markdown from '@metalsmith/markdown'
import permalinks from '@metalsmith/permalinks'
import comp from './comp.js'
import CompData from './comp-data.js'

const metalsmith = Metalsmith('./')
.metadata({
  sitename: 'MKZ Life'
})
.use(comp('./component', './template', CompData))
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