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

module.exports = uploadFile