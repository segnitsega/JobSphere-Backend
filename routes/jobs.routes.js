const express = require('express')
const { validateJob, handleJobValidationErrors } = require('../middlewares/job.validation')
const { getJobs, createJob, deleteJob, getJobById, updateJob } = require('../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.get('/', getJobs)
jobRouter.get('/:id', getJobById)
jobRouter.post('/', validateJob, handleJobValidationErrors, createJob)
jobRouter.put('/:id', updateJob)
jobRouter.delete('/:id', deleteJob)

module.exports = jobRouter