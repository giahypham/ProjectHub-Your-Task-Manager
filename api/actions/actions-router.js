// Write your "actions" router here!
const express = require('express');

const { validateActions,
        validateActionsId,
} = require('./actions-middlware');

const Action = require('./actions-model');

const router = express.Router();

//GET all actions
router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

//GET action with specific ID
router.get('/:id', validateActionsId, (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

//POST new action
router.post('/', validateActions, (req, res, next) => {
    Action.insert({
        completed: req.completed,
        description: req.description,
        project_id: req.project_id,
        notes: req.notes,
    })
    .then(newAction => {
        console.log(newAction);
        res.status(201).json(newAction);
    })
    .catch(next);
});

//PUT existing action
router.put('/:id', validateActionsId, validateActions, (req, res, next) => {
    Action.update(
        req.params.id, 
        { completed: req.completed,
            description: req.description,
            project_id: req.project_id,
            notes: req.notes,
        })
        .then(updatedAction => {
            res.json(updatedAction)
        })
        .catch(next)
})

//DELETE existing action
router.delete('/:id', validateActionsId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(res.status(200).json())
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