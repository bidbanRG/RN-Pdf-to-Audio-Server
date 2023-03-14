const  express =  require('express');
const  cors = require('cors');
const fileUplaod = require('express-fileupload');
const pdfParse = require('pdf-parse'); 
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 9000;
app.use(cors());

      
app.use(fileUplaod());
app.use(express.json());






app.get('/',(req,res) => {
   res.send('Hello');
})


app.post('/post/:page', async (req,res) => {

   
   if(!req.files || !req.files.PDF) {
      
      res.status(404).send({error:'No PDF Found'});
      res.end();
      return;
}
    
      const pdf = req.files.PDF;

      const pagenumber =  parseInt(req.params['page']);

     
    


  
    let MAX_PAGES = null;
   

    const fun = async (page) => {

      if(page === 0) return "";  
         
         let result = await pdfParse(pdf,{max:page});
          MAX_PAGES = result.numpages;
       
       
         let words = result.text;
      
       
         

         
          
          words = words.replace(/(\r\n|\n|\r)/gm,'');


         return words;
         
     }

   try{ 
    
     let [A,B] = await Promise.all([fun(pagenumber),fun(pagenumber - 1)]);
      
      if(MAX_PAGES && MAX_PAGES < pagenumber) {
         res.status(400).send({error:'page number exceeded'});
         res.end();
         return
      }
   
      const text = A.slice(B.length);
      fs.writeFileSync('text.txt',text);
      const reader = fs.createReadStream('text.txt');
     
         reader.on('open', () => {
            reader.pipe(res);
         });
      

      reader.on("end",() => res.end());
     
      reader.on("error",(e) => res.status(404).json({error:e.message}));
       
      
      // res.json({body:text});
      // res.on('error',(e) => res.json({error:e.message}));
    

   }catch(e){

      
      res.status(404).send({error:e.message});
      
      res.end();
   }
   
   
    


       
})

app.listen(PORT,() => {console.log('server is working')})
