const  express =  require('express');
const  cors = require('cors');
const fileUplaod = require('express-fileupload');
const pdfParse = require('pdf-parse'); 

const hummus = require('hummus');
const app = express();
const PORT = process.env.PORT || 9000;
app.use(cors());

      
app.use(fileUplaod());
app.use(express.json());






app.get('/',(req,res) => {
   res.send('Hello');
})


app.post('/post', async (req,res) => {
   if(req.files === null) res.send('Server got no PDF');
      const pdf = req.files.PDF;
      const pagenumber = pdf.page;

   let result = await pdfParse(pdf,{max:1});
   const pages = result.numpages;

    
    
   

    const fun = async (pagenumber) => {

      if(pagenumber === 0) return [];  
         
         let result = await pdfParse(pdf,{max:pagenumber});
          
         let words = result.text.split(" ");
         // words = words.splice(last,last + words.length);
     
         
        for(let i = 0;i < words.length; i++)
         words[i] = words[i].replace(/(\r\n|\n|\r|"")/gm,'');
          
          words = words.filter(function(value, index){ 
           return value !== ""
        });

         return words; 
         
     }

   
   let arr1 = await fun(pagenumber - 1);
   let arr2 = await fun(pagenumber);        
 
 console.log(arr2);
   const WORDS =  arr2.slice(arr1.length); 

   res.json(WORDS);

       
})

app.listen(PORT,() => {console.log('server is working')})
/*
    ***********FORMAT FOR SENDING FILES**************
   
   const formData = new FormData();
   formData.append('json_name', file);
   const res = await axios.post('http://localhost:9000/post', formData)


*/              