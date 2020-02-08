//设置别名
const path = require('path');
function resolve(dir){
  return path.resolve(__dirname,dir)
}
module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    }
}
