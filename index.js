const express = require('express');

const server = express();
server.use(express.json());

//Query params = ?nome=NodeJS
//Router params = /curso/2
//Request body = {nome: 'NodeJS',tipo: 'Backend'}

// Create , Read, Update, Delete



const cursos = ['NodeJS', 'ReactJS', 'PYTHON', 'REACT NATIVE',' JAVA SCRIPT' ,'C#', 'phyton'];
//Middleware  global para verificar se o index está dentro dos limites 
server.use((req ,res, next)=>{
    console.log(`URL CHAMADA: ${req.url}`);
     return next();
})
 

function checkCurso(req, res, next){

    if(!req.body.name){
        return res.status(400).json({error:  "nome do curso é obrigatório"});
    }

    return next();
}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({error:  " o curso  não existe "});

    }
    req.curso = curso;

    return next();


}


// LISTANDO TODOS OS CURSOS
server.get('/cursos', (req,res) =>{
    return res.json(cursos);
});


//localhost:3002/curso/2
// LISTANDO UM CURSO PELO INDEX
server.get('/curso/:index', checkIndexCurso,(req, res)=>{
      
 return res.json(req.curso);
})


//CRIANDO UM NOVO CURSO 
server.post('/cursos',checkCurso,  (req, res) =>{
    const name = req.body.name;
    cursos.push(name);
    return res.json(cursos);

})



// Atualizando um curso 
server.put('/curso/:index', checkCurso,checkIndexCurso,(req, res) =>{
    const {index} = req.params;
    const {name} = req.body;
    cursos [index] = name;
    return res.json(cursos);
})

//deletetando um curso existente 
server.delete('/curso/:index',checkIndexCurso, (req, res) =>{
    const {index} = req.params;
    cursos.splice(index,1);
    return res.send();
})
//startadndo o server na porta 3002
server.listen(3002)