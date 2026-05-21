import express from 'express';
import {} from 'express';
import {} from 'express';

const app = express();
const port = 3000;

// Responda com Olá Mundo! na página inicial:
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Responder a uma solicitação POST na rota raiz (/), a página inicial do aplicativo:
app.post('/', (req, res) => {
    res.send('Got a POST request');
});
// Responda a uma solicitação PUT para a rota /user:
app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user');
});
// Responder a uma solicitação de DELETE para a rota /user:
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user');
});
app.all('/help', (req, res, next) => {
    console.log('Accessing the help section ...');
    next(); // pass control to the next handler
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map