// Write your "projects" router here!
const express = require('express')

const { validateProject, validateProjectId } = require('./projects-middleware')

const Project = require('./projects-model')

const router = express.Router()

//GET all projects
router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

//GET specific project
router.get('/:id', validateProjectId, (req, res, next) => {
    Project.get(req.params.id)
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

//POST a project
router.post('/', validateProject, (req, res, next) => {
    Project.insert({
        name: req.name,
        completed: req.completed,
        description: req.description,
    })
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

//PUT a project
router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(
        req.params.id, {
        name: req.name,
        completed: req.completed,
        description: req.description,
    })
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(next)
})

//DELETE a project
router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(res.json())
        .catch(next)
})

//GET actions in a project
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions =>
            res.json(actions))
        .catch(next)
})




//Handles errors
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: 'well well well something happened inside posts router',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router