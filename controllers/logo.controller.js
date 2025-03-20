const logo = require('../models/logo.model')

const uploadFile = (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).json({message:"No logo provided"})
      }
      res.json({
        message: "Logo file uploaded successfully",
        file: req.file.filename,
      });
      console.log(re.file)
    } catch (error) {
      next(error);
    }
  };

const logoInfoToMongo = async (req, res) => {
    try {
        const newLogo = new logo({
            filename: req.file.filename,
            filepath: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        await newLogo.save(); 

        res.json({ message: "Logo uploaded successfully", newLogo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
}

module.exports = { uploadFile, logoInfoToMongo}