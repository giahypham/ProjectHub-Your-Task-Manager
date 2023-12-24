// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    const project = await Project.get(req.params.id)
    try {
        if (!project) {
            res.status(404).json({
                message: "No project with that ID"
            })
        } else {
            req.project = project
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: 'Problem finding projects'
        })
    }

}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    console.log('Received values:', name, description, completed);

    if (!name || 
        !description || 
        !name.trim() || 
        !description.trim() ||
        completed == undefined
        ) {
        res.status(400).json({
            message: "Missing required name or description or completion status"
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed || false
        next()
    }
}

module.exports = { validateProject, validateProjectId}