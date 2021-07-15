import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:30')
        },
        {
          id: 2,
          title: 'Cinema',
          type: 'withdraw',
          category: 'Lazer',
          amount: 100,
          createdAt: new Date('2021-05-14 21:00:00')
        }
      ],
    })
  },

  routes() {
    let env = 'prod';

    if(env === 'dev') {
      this.urlPrefix = 'http://localhost:3000/'
    } 

    if (env === 'prod') {
      this.urlPrefix = 'https://jovial-tesla-db8faa.netlify.app/'
    }
    
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);