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

const createJob = async(req, res)=>{
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({message: "request body is empty"})
    } 
    try{
        const { title, type, salary, description, company, logo, isBookmarked, location, experienceLevel, currency } = req.body
        const newJob = new job({
            title,
            type, 
            salary, 
            description, 
            company, 
            logo, 
            isBookmarked, 
            location, 
            experienceLevel, 
            currency
        })
        await newJob.save()
        res.status(201).json({message: "New job succesfully added", newJob})
    }
    catch(err){
        res.status(501).json({message: "Failed to add job", error: err})
    }
 
}


const deleteJob = async(req, res) => {
    const id = req.params.id
    try{
        const deletedJob = await job.findByIdAndDelete(id)
        res.status(200).json({message: "Item deleted",  deletedJob})
    }
    catch(e){
        res.status(501).json({message: "Can't delete item"}, e)
    }
}

const getJobById = async(req, res) => {
    const id = req.params.id
    try{
        const jobById = await job.findById(id)
        if(!jobById) res.status(404).send('job not found')
        
        res.status(200).json(jobById)
    }
    catch(e){
        res.status(501).json({ message: "Error retrieving job", error: e });
    }
}

const updateJob = async(req, res)=>{
    const id= req.params.id
    
    if(Object.keys(req.body).length === 0) res.status(400).json({messgae: "request body empty"})

    try{
        const updatedJob = await job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        res.status(200).json({ message: "Job updated successfully", updatedJob })
    }
    catch(e){
        res.status(501).json({ message: "Failed to update job", error: e });
      
    }
}

module.exports = { getJobs, createJob, deleteJob, getJobById, updateJob }