const express = require('express');
const routes = express.Router();

const projects = [
  { id: '1', title: 'Novo projeto', tasks: ['Nova tarefa'] },
  { id: '2', title: 'Projeto antigo', tasks: ['Tarefa de alteração'] },
  { id: '3', title: 'POC', tasks: ['Provar por a+b'] }
];

routes.get('/projects', (req, res) => {
  return res.json(projects);
});

routes.post('/projects', verifyAttributes, (req, res) => {
  const { obj } = req;

  projects.push(obj);

  return res.json(obj);
});

routes.put('/projects/:id', verifyId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Informe o titulo do projeto' });
  }

  const index = projects.findIndex(item => item.id === id);
  projects[index].title = title;
  return res
    .status(201)
    .json({ message: 'Título alterado com sucesso!', item: projects[index] });
});

routes.post('/projects/:id/tasks', verifyId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Informe o titulo da task' });
  }

  const index = projects.findIndex(item => item.id === id);
  projects[index].tasks.push(title);
  return res
    .status(201)
    .json({ message: 'Task inserida com sucesso', item: projects[index] });
});

function verifyAttributes(req, res, next) {
  const { id, title } = req.body;

  if (!id || !title) {
    return res
      .status(400)
      .json({ message: 'É necessário ter os atributos "id" e "title"' });
  }

  let { tasks } = req.body;
  tasks = tasks ? tasks : [];

  req.obj = { id, title, tasks };
  return next();
}

function verifyId(req, res, next) {
  const { id } = req.params;

  idExists = projects.find(item => item.id === id);
  if (!idExists) {
    return res.status(400).json({ message: 'Id não encontrado' });
  }
  return next();
}

module.exports = routes;
