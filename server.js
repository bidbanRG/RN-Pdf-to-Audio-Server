const  express =  require('express');
const  cors = require('cors');
const fileUplaod = require('express-fileupload');
const pdfParse = require('pdf-parse'); 


const app = express();
const PORT = process.env.PORT || 9000;
app.use(cors());

      
app.use(fileUplaod());
app.use(express.json());






app.get('/',(req,res) => {
   res.send('Hello');
})


app.post('/post/:page', async (req,res) => {
   if(req.files === null) res.send('Server got no PDF');
      const pdf = req.files.PDF;
      const pagenumber =  parseInt(req.params['page']);
     
    

   let result = await pdfParse(pdf,{max:1});
   const pages = result.numpages;

  if(pages < pagenumber) res.send('NOPAGES');    
    
   

    const fun = async (page) => {

      if(page === 0) return [];  
         
         let result = await pdfParse(pdf,{max:page});
          
        
         let words = result.text.split(" ");
      
        for(let i = 0;i < words.length; i++){
         words[i] = words[i].replace(/(\r\n|\n|\r)/gm,'');}
         

         
          
          words = words.filter(function(value, index){ 
           return value !== ""
        });

         return words; 
         
     }

   
   let arr1 = await fun(pagenumber - 1);
   
   let arr2 = await fun(pagenumber);        
   
   const WORDS =  arr2.slice(arr1.length); 
 
   console.log(WORDS);
   res.json(WORDS);

       
})

app.listen(PORT,() => {console.log('server is working')})
/*
    ***********FORMAT FOR SENDING FILES**************
   
   const formData = new FormData();
   formData.append('json_name', file);
   const res = await axios.post('http://localhost:9000/post', formData)


*/              