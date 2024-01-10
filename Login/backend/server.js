// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
    const { username, password, admin} = req.body;

    // Verifique as credenciais (pode ser feito de forma mais segura no ambiente de produção)
    if (username === 'usuario' && password === 'senha') {
        // Envie uma resposta de sucesso
        res.status(200).json({ success: true });
    } else {
        // Envie uma resposta de erro
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
