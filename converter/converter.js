import  {sizes}  from "../const.js";
import path from 'path'
import fs from  'fs';
import { dirname } from "path";
import { fileURLToPath } from 'url';
import sharp from 'sharp';
const __dirname = dirname(fileURLToPath(import.meta.url));
export const convert = (files, cb)=>{
    var convertedList = [];
    try{
        dirDiffSizes();
    files.forEach(element => {
        sizes.forEach(s=>{
        let dim = s.split('X') || [500,500];    
        sharp(path.join(__dirname,'/..',element.path)).resize({width:Number(dim[0]),height:Number(dim[1]),fit:'fill'}).toFile(path.join(__dirname,'/../uploads/'+dim.join('X')+'/'+(element.filename||'test.jpg')), 
        (err, info) => { 
            convertedList.push(path.join(__dirname,'/../uploads/'+dim.join('X')+'/'+(element.filename||'test.jpg')));
            console.log(err);
            console.log(info)
            if(files.length === Math.floor(convertedList.length/sizes.length)){
                cb(null, convertedList)
            }
        
        });
        })
        
    });
    }catch(error){
        cb(error)
    }
    
}

function dirDiffSizes(){
    sizes.map((s)=>{
        mkDir(path.join(__dirname,'/../uploads',s))
    })
}

function mkDir(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

