const express = require('express')
const app = express()
const port = 3000

const booksRoutes = require("./routes/books.routes")
const productsRoutes = require("./routes/products.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

// Configuración motor plantilla PUG
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Rutas
app.use('/books',booksRoutes);
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

// Última ruta por defecto. En caso de no encotrarse ninguna anterior, devolvemos un 404
// Para rutas no existentes
app.get("*",(req,res)=>{
    res.status(404).send("Gatito triste - 404 not found");
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})