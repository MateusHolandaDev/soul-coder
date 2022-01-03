const express = require('express')
const rotas = require('express').Router()


rotas.use(express.urlencoded({ extended: false }))
const conexao = require('./config/conexao')

// rota para listar os dados do database, ou seja, listar todas as tarefas
rotas.get('/',(req,res)=>{
    // criando uma query para selecionar todos os dados da tabela tb_tarefas
    let sql = 'select * from contabancaria'
    conexao.query(sql,(erro,rows)=>{
        if(erro)throw erro
        res.send(rows)
    })
})


//rota para mostrar apenas uma tarefa de acordo com o seu id
rotas.get('/:id', (req,res)=>{
    const {id} = req.params
    let sql = `select * from contabancaria where id_transferencia = ?`
    conexao.query(sql,id, (erro, rows,fields)=>{
        if(erro)throw erro
        res.json(rows[0])
    })
})

//rota para deletar uma tarefa específica (através do seu id)
rotas.delete('/:id', (req,res)=>{
    const {id} = req.params
    let sql = `delete from contabancaria where id_transferencia = ${id}`
    conexao.query(sql,(erro,rows,fields)=>{
        if(erro)throw erro
        res.json({status:'tarefa excluída com sucesso'})
    })

})

//essa rota é para fazer uma inclusão na tabela de tarefas
rotas.post('/', (req,res)=>{
    const {nome, valor, conta, tipo, situacao} = req.body
    let sql = `insert into contabancaria(nome, valor, conta, tipo, situacao) values('${nome}','${valor}', '${conta}', '${tipo}', 'OK')`
    conexao.query(sql,(erro, rows, fields)=>{
        if(erro)throw erro
        res.json({status:"Transferencia feita com sucesso para conta "+conta})
    })
})

rotas.put('/:id', (req,res)=>{
    const {id} = req.params
    const {nome, valor, conta, tipo, situacao} = req.body
    let sql = `update contabancaria set 
                nome = '${nome}',
                valor = '${valor}',
                conta = '${conta}',
                tipo = '${tipo}',
                situacao = '${situacao}'
                where id_transferencia = '${id}'`
    conexao.query(sql,(erro, rows, fields)=>{
        if(erro)throw erro
        res.json({status:"Informações da transferência: " +id})
    })
})


module.exports = rotas

