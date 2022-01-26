var _ = require('underscore');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();
var server = http.createServer(app);

var conf = require('./server.json');

var products = loadProduct();
var basket = [];
var orderNumber = 0;

var context = '/rest';

app.use(bodyParser.json());
app.use(cors());

app.get(context + '/products', function (_req, res) {
  res.send(products);
});

app.get(context + '/products/:id', function (req, res) {
  res.send(products.find(product => product.id == req.params.id));
});

app.get('/reset', function (_req, res) {
  basket = [];
  products = loadProduct();
  res.status(200).send("reset ok");
});

function loadProduct() {
  return require(conf.products).map(product => ({...product}));
}

var createHandler = function (req, res) {
  basket.push(req.body);
  products = products
    .map(product => {
      if (product.title.toUpperCase() === req.body.title.toUpperCase()) {
        product.stock--;
      }
      return product;
    })
    .filter(product => product.stock > 0)

  res.status(201).send(req.body);
}

app.post(context + '/basket', createHandler);

app.post(context + '/basket/confirm', (req, res) => {
  console.log(`Order n°${++orderNumber} : ${basket.reduce((total, item)=>total+item.price, 0)}€ ${req.body.name} ${req.body.address} ${req.body.creditCard}`);
  basket = [];
  products = loadProduct();
  res.status(200).send({orderNumber: orderNumber});
});

app.get(context + '/basket', function (_req, res) {
  res.send(basket);
});

server.listen(conf.port);
console.log(`Express server listening on http://localhost:${server.address().port}`);
