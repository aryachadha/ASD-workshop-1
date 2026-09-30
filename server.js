const fs = require("fs/promises")
const path = require("path")
const express = require("express")
const app = express()
const filePath = path.join(__dirname,"db.json")
const port = 3000
let cache={}

async function readData(){
    const products = await fs.readFile(filePath,"utf-8")
    return JSON.parse(products)
}

async function delayReadFile(){
    await new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(),1500)
    })
    return await readData()
}

app.get("/products",async(req,res)=>{
let key = req.url
let value = cache[key]
try{
    if (value){
        return res.json(value)
    }
    let data = await delayReadFile()
    return res.json(data)
}
catch (err){
    console.log(err)
}
})

app.get("/products/:id",async(req,res)=>{
let id = Number(req.params.id)
try{
    let data = await delayReadFile()
    let product = data.find((item)=>item.id===id)
    res.json(product)

}
catch (err){
    console.log(err)
}
})

app.listen(port,()=>{
    console.log("runnging on port 3000")
})