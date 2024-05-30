import express from 'express';
import {uploadImage, uploadVideo} from '../uploader/uploader.js';
import {convert}  from '../converter/converter.js';


const router = express.Router();


router.post('/image',uploadImage.array('files'),(req, res, next) => {
    try {
        const files = req.files;
        // let dir = __dirname+'/../uploads/300X300';
        
        convert(req.files,(err, dataList)=>{
            if(err){
                res.status(200).json({
                    "status": "failed",
                    "code": "500",
                    "message": err.message
                });
            }
            if (!files) {
                res.status(400).json({
                    "status": "failed",
                    "code": "400",
                    "message": "Please upload file"
                });
            }
            res.status(200).json({
                "status": "success",
                "code": "200",
                "message": "file uploaded successfully",
                "data": files,
                "convertedList":dataList
            });
        });
       
    } catch (error) {
        console.log(error.message);
        res.status(200).json({
            "status": "failed",
            "code": "500",
            "message": error.message
        });
    }
})
router.post('/video',(req, res)=>{
    uploadVideo(req,res, (err)=>{
        if (err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err);
        } else {
            // SUCCESS, image successfully uploaded
            res.send("Success, Video uploaded!");
        }
    })
  
})





export default router
