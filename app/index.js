const express=require('express');
const app=express();


app.get('/hel',(req,res)=>{
    let datas={
        hel:"kk",
        bel:"10"
    }
    return res.json(datas);
})

app.listen(5000,()=>console.log("connected...!"))