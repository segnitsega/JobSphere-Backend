const express = require('express')
const { validateJob } = require('../middlewares/job.validation')
const { getJobs, createJob, deleteJob, getJobById, updateJob } = require('../controllers/jobs.controller')
const upload = require('../middlewares/multer.middleware')
const uploadFile = require('../controllers/logo.controller')

const jobRouter = express.Router()

jobRouter.get('/', getJobs)
jobRouter.get('/:id', getJobById)
jobRouter.post('/', validateJob, createJob)
jobRouter.patch('/:id', updateJob)
jobRouter.delete('/:id', deleteJob)
jobRouter.post('/upload', upload.single('logo'), uploadFile)

module.exports = jobRouter
