require('./config/conexao')
const express = require('express')
const cors = require('cors')
const app = express()
const porta = 3000

// utilizar arquivo no formato json
app.use(express.json())
app.use(cors())

//criando variável para armazenar todas as rotas definidas no arquivo rotas.js
//const rotasTarefas = require('./rotas')
//para todas as rotas definidas no arquivo rotas.js, deve ser considerado o caminho /tarefas
//app.use('/tarefas',rotasTarefas)

app.use('/mateusholanda',require('./rotas'))

app.listen(porta,()=>{
    console.log("servidor está rodando")
})