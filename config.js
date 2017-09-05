




if(process.env.NODE_ENV == 'development'){
    let config = {
        database: {
            DATABASE: 'Koa',
            USERNAME: 'root',
            PASSWORD: 'xiangyu',
            PORT: '3306',
            HOST: '127.0.0.1'
        }
    }
  }else{
    let config = {  
        database: {
            DATABASE: 'Koa',
            USERNAME: 'root',
            PASSWORD: 'cool0830~',
            PORT: '3306',
            HOST: '59.110.233.80'
        }
    }
  }
module.exports = config