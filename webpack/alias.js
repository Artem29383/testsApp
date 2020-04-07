const path = require('path');

module.exports = {
  schemas: `${process.cwd()}/src/schemas`,
  components: `${process.cwd()}/src/components`,
  pages: `${process.cwd()}/src/pages`,
  models: `${process.cwd()}/src/models`,
  api: `${process.cwd()}/src/api`,
  hooks: `${process.cwd()}/src/hooks`,
  utils: `${process.cwd()}/src/utils`,
  store: `${process.cwd()}/src/store`,
  constants: `${process.cwd()}/src/constants`,
  styles: `${process.cwd()}/src/styles`,
  assets: `${process.cwd()}/src/assets`,
  config: path.resolve(process.cwd(), 'src/config'),
};
