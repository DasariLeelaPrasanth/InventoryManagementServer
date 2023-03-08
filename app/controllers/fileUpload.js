const fs = require('fs');
var path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
const upload = multer({ storage: storage });

const fileUploadController = {
    addFile : [upload.single('file') ,(async  (req,res) => {
        if (req.file) {
            let filename =  req.file.filename;
            res.send({content : 'File uploaded successfully', filename});
        }
})],

getFile :  async (req, res)=>{
    console.log( process.cwd());
    const imagePath = path.join(process.cwd(), 'uploads', req.params.id);
    console.log(imagePath,"imagePathimagePathimagePath");
  res.sendFile(imagePath);
}
}

module.exports = fileUploadController;

