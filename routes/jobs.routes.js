const express = require('express')

// import { getJobs, createJob, deleteJob, getJobById, updateJob } from '../controllers/jobs.controller.js'
// import { validateJob, handleJobValidationErrors } from '../middleware/job.validation.js'

const jobRouter = express.Router()

jobRouter.get('/', getJobs)
jobRouter.get('/:id', getJobById)
jobRouter.post('/', validateJob, createJob)
jobRouter.put('/:id', updateJob)
jobRouter.delete('/:id', deleteJob)

module.exports = jobRouter