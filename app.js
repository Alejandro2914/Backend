const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
  { id: 1, name: 'Item 1', description: 'Description 1', price: 10.0 },
  { id: 2, name: 'Item 2', description: 'Description 2', price: 20.0 }
];

// Ruta para obtener todos los items
app.get('/items', (req, res) => {
  res.json(items);
});

// Ruta para obtener un item por su ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item no encontrado');
  res.json(item);
});

// Ruta para crear un nuevo item
app.post('/items', (req, res) => {
  const { name, description, price } = req.body;
  const newItem = {
    id: items.length + 1,
    name,
    description,
    price
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Ruta para actualizar un item
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item no encontrado');
  
  const { name, description, price } = req.body;
  item.name = name;
  item.description = description;
  item.price = price;
  
  res.json(item);
});

// Ruta para eliminar un item
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item no encontrado');
  
  items.splice(itemIndex, 1);
  res.send('Item eliminado');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
