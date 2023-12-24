// add middlewares here related to actions
const Action = require("./actions-model");

async function validateActionsId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: "Action not found",
            })
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: "Problems finding actions"
        })
    }
}

function validateActions(req, res, next) {
    const { completed, description, notes, project_id  } = req.body
    console.log(req.body)
    console.log('Received data types:', typeof project_id, typeof description, typeof notes);
console.log('Received values:', project_id, description, notes);
   //Check types of data input
    if (
        typeof description !== 'string' ||
        typeof notes !== 'string' ||
        typeof project_id !== 'number'
    ) {
        res.status(400).json({
            message: "Invalid data format. Please provide valid values"
        })
    } else if (
        !project_id ||
        !description ||
        !notes ||
        !description.trim() ||
        !notes.trim()
     ) {
        res.status(400).json({
            message: "Please provide inputs for missing values"
        })
     } else {
        req.notes = notes.trim()
        req.description = description.trim()
        req.completed = completed || false //default value is false if not provided
        req.project_id = project_id
        next()
    }
}



module.exports = {
    validateActions, 
    validateActionsId,
}