import { promises } from 'fs';
import _ from 'lodash'

export default function (dataPath) {
  return async function(files, metalsmith, callback) { 
    const yearTree = {};

    Object.keys(files).forEach(file => {
      if (!file.startsWith('note')) return
  
      const year = file.slice(5, 9)
      if (!yearTree[year]) yearTree[year] = []
      yearTree[year].push(_.pick(files[file], ['title', 'category', 'date', 'summary', 'banner', 'tag', 'target']))
    })

    // sort
    Object.keys(yearTree).forEach(year => yearTree[year].sort((p, q) => p.date.getTime() > q.date.getTime() ? -1 : 1))
    const sortTree = {}
    Object.keys(yearTree).sort().reverse().map(key => sortTree[`Year ${key}`] = yearTree[key])
    await promises.writeFile(dataPath, JSON.stringify(sortTree, null, 2), { encoding: 'utf-8' })
    metalsmith.yearTree = sortTree
    callback()
  }
}