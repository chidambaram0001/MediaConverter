import multer from 'multer';
import { maxSizeImg, maxSizeVideo } from '../const.js';
import path from 'path';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        let noName = true;
        if(file.originalname){
            let fileNa = file.originalname.split('.');
            if(fileNa.length > 0){
                console.log(fileNa[0] + "-" + Date.now() + '.'+fileNa[1])
                cb(null, fileNa[0] + "-" + Date.now() + '.'+fileNa[1]);
                noName = false;
            }
            
        }

        if(noName){
            cb(null, file.filename + "-" + Date.now() + '.jpg');
        }
        
    },
}, (err,data)=>{
    console.log(err,data)
});
export const uploadImage = multer({
    storage: storage,
    limits: { fileSize: maxSizeImg },
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png|mp4/;
        var mimetype = filetypes.test(file.mimetype);
 
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
 
        
       

        if (mimetype && extname) {
            return cb(null, true);
        }
 
        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    },
 
    // mypic is the name of file attribute
})

export const uploadVideo = multer({
    storage: storage,
    limits: { fileSize: maxSizeVideo },
    fileFilter: function (req, file, cb) {
        console.log(file)
        // Set the filetypes, it is optional
        
        
        var filetypes = /mp4/;
        var mimetype = filetypes.test(file.mimetype);
 
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
 
        
       

        if (mimetype && extname) {
            return cb(null, true);
        }
 
        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    },
 
    // mypic is the name of file attribute
}).array("file");


