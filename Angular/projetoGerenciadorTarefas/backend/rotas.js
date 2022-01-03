const express = require('express')
const rotas = require('express').Router()


rotas.use(express.urlencoded({ extended: false }))
const conexao = require('./config/conexao')

// rota para listar os dados do database, ou seja, listar todas as tarefas
rotas.get('/',(req,res)=>{
    // criando uma query para selecionar todos os dados da tabela tb_tarefas
    let sql = 'select * from tb_tarefas order by descricao asc'
    conexao.query(sql,(erro,rows)=>{
        if(erro)throw erro
        res.json(rows)
    })
})


//rota para mostrar apenas uma tarefa de acordo com o seu id
rotas.get('/:id', (req,res)=>{
    const {id} = req.params
    let sql = `select * from tb_tarefas where id_tarefa = ?`
    conexao.query(sql,id, (erro, rows,fields)=>{
        if(erro)throw erro
        res.json(rows[0])
    })
})

//rota para deletar uma tarefa específica (através do seu id)
rotas.delete('/:id', (req,res)=>{
    const {id} = req.params
    let sql = `delete from tb_tarefas where id_tarefa = ${id}`
    conexao.query(sql,(erro,rows,fields)=>{
        if(erro)throw erro
        res.json({status:'tarefa excluída com sucesso'})
    })

})

//essa rota é para fazer uma inclusão na tabela de tarefas
rotas.post('/', (req,res)=>{
    const {descricao,obs} = req.body
    let sql = `insert into tb_tarefas(descricao,obs) values('${descricao}','${obs}')`
    conexao.query(sql,(erro, rows, fields)=>{
        if(erro)throw erro
        res.json({status:"tarefa incluída com sucesso"})
    })
})

rotas.put('/:id', (req,res)=>{
    const {id} = req.params
    const {descricao,obs} = req.body
    let sql = `update tb_tarefas set 
                descricao = '${descricao}',
                obs = '${obs}'
                where id_tarefa = '${id}'`
    conexao.query(sql,(erro, rows, fields)=>{
        if(erro)throw erro
        res.json({status:"tarefa editada com sucesso"})
    })
})


module.exports = rotas

