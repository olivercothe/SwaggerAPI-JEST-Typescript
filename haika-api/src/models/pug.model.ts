

let pug = require('pug')
exports.compile = function(relativeTemplatePath:string, data:Object, next: any){
  var absoluteTemplatePath = __dirname + '/../../views/' + relativeTemplatePath + '.pug'
  pug.renderFile(absoluteTemplatePath, data, function(err:any, compiledTemplate: any){
    if (err) {
      throw new Error('Problem compiling template(double check relative template path): ' + relativeTemplatePath)
    }
    console.log('[INFO] COMPILED TEMPLATE: ', compiledTemplate)
    next(compiledTemplate)
  })
}
