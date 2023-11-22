const express = require('express')
const cowsay = require('cowsay')
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = require('./swagger.json');

const app = express()
const port = 3000

// Middlewares
//const checkApiKey = require('./middlewares/auth_api_key');
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));

// Rutas
const booksRoutes = require("./routes/books.routes")
const productsApiRoutes = require("./routes/productsApi.routes")
const productsRoutes = require("./routes/products.routes")
const entriesApiRoutes = require("./routes/entriesApi.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

// Configuración motor plantilla PUG
app.set('view engine', 'pug');
app.set('views','./views');

// Habilitar autenticación API KEY para todo el sistema
//app.use(checkApiKey); 

// Documentación API SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Documentación JSDOC
app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Rutas
//API
app.use('/api/books',booksRoutes);
app.use('/api/products',productsApiRoutes);
//app.use('/api/entries',entriesApiRoutes);
//WEB
app.use('/products',productsRoutes);

// Ruta de Template
app.get('/first_template', function(req, res){
  res.render('first_view.pug');
});

app.get('/dynamic_view', function(req, res){
  // Llamada a otra API o BBDD
  // Procesar datos y preparar objeto
  res.render('dynamic', {
     name: "The bridge - FullStack", 
     url:"https://thebridge.tech"
  });
});

// Para rutas no existentes
app.use('*',error404);

const server = app.listen(port, () => {
  console.log(
      cowsay.say({
          text: `Nos vamos a por tortilla. Funcionando en: http://localhost:${port}`,
          e: "oO",
          T: "U "
      }))
})

module.exports = server;