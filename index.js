const  express =  require('express');
const  cors = require('cors');
<<<<<<< HEAD
=======
const fileUplaod = require('express-fileupload');
>>>>>>> master
const pdfUtil = require('pdf-to-text');
const multer = require('multer');


const app = express();
const PORT = process.env.PORT || 9000;
app.use(cors());

<<<<<<< HEAD

const storage = multer.diskStorage({
   destination:(req,file,cb) => {
     console.log(file)
      cb(null,'pdfs')
   },
   filename:(req,file,cb) => {
      console.log(file)
      cb(null, 'book.pdf')
   }

=======
// app.use(express.urlencoded({
//    extended:true
// }))      
// app.use(fileUplaod());
// app.use(express.json());
const storage = multer.diskStorage({
   destination:(req,file,cb) => {
       
      cb(null,'pdfs')
   },
   filename:(req,file,cb) => {
      cb(null,'book.pdf')
   }

>>>>>>> master
})

const upload = multer({storage:storage});




app.get('/',(req,res) => {
   res.send('Hello');
})


app.post('/post/:page', upload.single('PDF') ,async (req,res) => {

   
//    if(!req.files || !req.files.PDF) {
      
//       res.status(404).send({error:'No PDF Found'});
//       res.end();
//       return;
<<<<<<< HEAD

=======
// }
>>>>>>> master
    
      
      const pdf_path = __dirname + '/pdfs/book.pdf'
      const pagenumber =  parseInt(req.params['page']);
      const option = {from: pagenumber, to: pagenumber};

    

          
try{ 
    
<<<<<<< HEAD
 
      
  pdfUtil.pdfToText(pdf_path, option, function(err, data) {
     console.log(data);
=======

      
  pdfUtil.pdfToText(pdf_path, option, function(err, data) {
   console.log(data);
>>>>>>> master
     if (err) {
       res.status(400).send({error:err});
     }
     else res.json({body:data.replace(/(\r\n|\n|\r|\f)/gm,'')});
      
 }); 
      
      res.on('error',(e) => res.json({error:e.message}));
    
    

   }catch(e){

      
      res.status(404).send({error:e.message});
      
      res.end();
   }
   
   
    


       
})

app.listen(PORT,() => {console.log('server is working')})
/*
    ***********FORMAT FOR SENDING FILES**************
   
   const formData = new FormData();
   formData.append('json_name', file);
   const res = await axios.post('http://localhost:9000/post', formData)


*/              