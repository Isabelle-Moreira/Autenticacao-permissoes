// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const controller = require('./controller/user')
const db = require('./database/db')
const md5 = require('md5')

db.sync(async () => { 
    console.log(`Banco de dados conectado: ${process.env.DB_NAME}`) 
})

controller.createUser({login:'Maria', senha:'entrar', admin: true})
controller.createUser({login:'joao', senha:'entrar', admin: false})

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
    const  username = req.body.username;
    const password = md5(req.body.password)


    controller.LogUser(username, password).then((User)=>{
    return res.status(200).json({success:true, message:'Logado com sucesso', User: User})
    }).catch(()=>{
        return res.status(401).json({success:false, message:'Credenciais inválidas'})
    })

});

    app.post('/api/cadastro', (req, res) => {
    const senhacriptografada = md5(req.body.senha);
    
    controller.createUser({
      login: req.body.login,
      senha: senhacriptografada,
      admin: req.body.admin
    })
      .then((usuario) => res.send(usuario))
      .catch((err) => {
        console.log('Erro no cadastro do item', JSON.stringify(err))
        return res.status(400).send(err)
      })
  })


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
