const job = require('../models/job.model')

const getJobs = async(req, res) => {
    try{
        const jobs = await job.find()
        res.status(200).json(jobs)
    }
    catch(e){
        res.status(500).json({message: 'Error to fetch jobs', e})
        console.log(e)
    }
}

