const express = require('express')
const valid = require('./middleware')


const App = express()

App.use(express.json())
App.use(express.urlencoded({extended:true}))

let initialRecipe = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      preparationTime: '15 minutes',
      cookingTime: '15',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
      country: "India",
      veg: true,
      id: 1
    }
]

App.get("/",(req,res) =>
{
    res.send("welcome to the recipe api")
})

App.get("/recipe/all",(req,res) =>
{
    res.send(initialRecipe)
})

App.get("/index",(req,res) =>
{
    res.sendFile(__dirname + "/index.html")
})
    
App.get("/add",(req,res) =>
{
    res.sendFile(__dirname + "/recipe.html")
})
    

App.post("/recipe/add",valid,(req,res) =>
{   
    const {name,description,preparationTime,cookingTime,imageUrl,country,veg} = req.body
    
    let arry_data = {name,description,preparationTime,cookingTime,imageUrl,country,veg,id:initialRecipe.length + 1}
    
    initialRecipe.push(arry_data)
    res.send(initialRecipe)
})

App.patch("/recipe/update/:id", (req, res) => 
{
    let { id } = req.params;
    let update = initialRecipe.findIndex((update) => update.id == id);
    if (update !== -1) {
      initialRecipe[update] = { ...initialRecipe[update], ...req.body };
      res.send(initialRecipe);
    } else {
      res.send("Updated Recipe");
    }
})

App.delete("/recipe/delete/:id", (req, res) => 
{
    let { id } = req.params;
    let delete_1 = initialRecipe.findIndex((recipe) => recipe.id == id);
    if (delete_1 !== -1) {
      initialRecipe.splice(delete_1, 1);
      res.send(initialRecipe);
    }
})

App.get("/recipe/filter",(req,res) => 
    {
        let {veg_data} = req.query
        let filter = initialRecipe.filter((ele) => ele.veg_data==false)
        res.send(filter)
    })

App.listen(8090,() =>
{
    console.log("server is running");
})