require('dotenv').config();
const app = require('./api');
const loginController = require('./database/controller/loginController');
const userController = require('./database/controller/userController');
const { token } = require('./database/middleware/token');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginController.login);
app.post('/user', userController.createUser);
app.get('/user', token, userController.getAll);
app.get('/user/:id', token, userController.getById);

app.listen(port, () => console.log('ouvindo porta', port));
