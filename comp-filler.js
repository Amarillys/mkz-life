import { promises } from 'fs';
import { parse } from 'path';
import handlebars from 'handlebars';

export default function (compPath, destPath, data, extendFunc, compileSonComp) {
  return async function(files, metalsmith, callback) {
    const compFileList = await promises.readdir(compPath);
    let comps = {};
    for (let i = 0; i < compFileList.length; ++i) {
      let compName = compFileList[i];
      comps[compName] = await promises.readFile(`${compPath}/${compName}`, { encoding: 'utf-8'});
    }

    if (extendFunc) {
      Object.assign(data, extendFunc(files));
    }

    if (data) {
      data['home-tree.html'] = metalsmith.yearTree

      handlebars.registerHelper('getYear', function(yearStr) { return yearStr.slice(5) } )
      Object.keys(data).forEach(compName => {
        comps[compName] = handlebars.compile(comps[compName], {noEscape: true})(data[compName]);
      })
    }

    const templateFileList = await promises.readdir(destPath);
    for (let i = 0; i < templateFileList.length; ++i) {
      let template = templateFileList[i];
      const oriText = await promises.readFile(`${destPath}/${template}`, { encoding: 'utf-8'});
      let targetText = oriText;
      Object.keys(comps).forEach(compFileName => {
        const compName = parse(compFileName).name;
        const regex = new RegExp(`(<!--@${compName}-->)(\\r\\n|\\r|\\n)(\\s*?)[\\s\\S]*(<!--@${compName}-end-->)`, 'g');
        targetText = targetText.replace(regex, `$1$2$3${comps[compFileName]}\r\n$4`)
      });
      if (targetText === oriText) continue;
      if (compileSonComp) {
        Object.keys(comps).forEach(compFileName => {
          const compName = parse(compFileName).name;
          const regex = new RegExp(`(<!--@${compName}-->)[\\s]*?(<!--@${compName}-end-->)`, 'g');
          targetText = targetText.replace(regex, `$1\r\n${comps[compFileName]}\r\n$2`)
        });
      }
      await promises.writeFile(`${destPath}/${template}`, targetText);
    }
    callback();
  }
}