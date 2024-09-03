const express = require('express')
const app = express ()
const fs = require(`fs`)
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.get(`/data`, (req,res)=>{
    res.sendFile(`${__dirname}/data.json`)
})


app.post(`/data`, (req,res)=>{
    console.log(req.body)
    var data = JSON.stringify(req.body)
    fs.writeFile(`${__dirname}/peeps.json`, data, err => err)
    
})


app.listen(3000, (e)=>{
    console.log(`Running on localhost:3000`)

})









// const hbs = require (`hbs`)











































// hbs.registerPartials(`${_dirname}/views/partials`, function)

// app.get("/", (req,res)=>{
//     res.send("Hello World hello holamundo!")
// })

// app.get("/movies/:favorite", (req,res)=>{
//     res.render(`index.hbs`,{
//         message: 
//         fav:req.params.favorite
    
//     })
// })



// app.get("/:foo", (req,res)=>{
//     res.send(req.params)
// })

// // app.get("/:animals/:animal", (req,res)=>{
// //     res.send(req.params.animal)
// // })

// app.get("/page", (req,res)=>{
//     res.sendFile(`${_dirname}/index.html`)
// })