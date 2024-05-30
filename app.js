import express from 'express';
import routerJs from './router/router.js';
import path from 'path';
import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
process.env.MY_VARIABLE = 'my_value'
import { exec, spawn, fork } from 'child_process';
import { stdout } from 'process';
const app = express();
//app.use(express.json());
app.use(express.static('uploads'))
app.use('/resources',express.static(__dirname+'/uploads'));

app.use((req,res,next)=>{
   if(req.query.name =='chidhu'){
    res.send("not auth");
   }else{
    next()
   }
    
    
})

app.use((err,req,res,next)=>{
    console.log('error middleware'+err)
})
process.on('Unhandled Exception', function(err) { 
  
    // Handle the error safely 
    console.log('no files') 
}) 

app.get('/getImagelist',(req,res, next)=>{
    //console.log(req.connection.remote)
    console.log(process.env.enivironment)
    
  //  fs.readFileSync('/Users/mohankrishnam/Downloads/docs-capgemini/hey.pdf')
  exec('ls',(err,stdout,stderr)=>{
    console.log(stdout)
})

const child = spawn('pwd')
child.stdout.on('data',(err)=>{
    console.log(err)
})


const fCh = fork('child.js');


fCh.on('message',(data)=>{
    console.log('from fork '+ JSON.stringify(data))
})

fCh.send('chidhu')

    res.json('all images')

})




app.use('/upload',routerJs);
app.use('/media',express.static(path.join(__dirname,'uploads')))
app.listen('3001',()=>{
    console.log('running sucessfully')
})
