const express = require('express');
const routes = require('./routes');

class App {

  constructor() {
    this.app = express();
    let count = 0;
    this.app.use(express.json());
    
    this.app.use((req, res, next) => {
      count++;
      console.log(`Quantidade de requisições: ${count}`);
      next();
    })

    this.app.use(routes);
    this.app.listen(3000);
  }

}

module.exports = new App().app;
