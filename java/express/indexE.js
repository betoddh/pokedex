// node_modules no debe estar
const express = require('express');
const app = express();
const https = require("https");
const FormData = require("form-data");
const { Stats } = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var id = "";
var name = "";
var ima ="";
var type ="";
var hp =""; 
var xp ="";
var weight= "";
var height= "";
var moves = "";
var abilities = "";
var stats ="";


app.get('/', (req, res) => {
    res.render("home", { id, name, ima, type, hp, xp, weight, height, moves, abilities, stats});
});

app.get('/info', (req, res) => {
    id = "";  // Reiniciar id y name
    name = "";
    ima ="";
    type ="";
    hp =""; 
    xp ="";
    weight= "";
    height= "";
    moves = "";
    abilities = "";
    stats="";
    
    var num =5;
    var url = `https://pokeapi.co/api/v2/pokemon/${num}`;
    https.get(url, (response) => {
        console.log("got a response");
        var resContent = "";
        response.on("data", (data) => {
            resContent += data;
        });
        response.on("end", () => {  
            var jsonObj = JSON.parse(resContent);
            id = jsonObj["id"];
            name = jsonObj["name"];
            ima = jsonObj.sprites.front_default;
            type = jsonObj.types.map(type => type.type.name); 
            xp = jsonObj["base_experience"];
            weight= jsonObj["weight"];
            height= jsonObj["height"];
            moves = jsonObj.moves.map(move => move.move.name).sort(() => 0.5 - Math.random()).slice(0, 4);
            abilities = jsonObj.abilities.map(ability => ability.ability.name);
            stats=jsonObj.stats.map(stat=>{
                return{
                    name: stat.stat.name,
                    base_stat: stat.base_stat
                };

            });
            

            res.redirect("/");
        });
    }).on("error", (e) => {
        console.log(`Got an error: ${e.message}`);  // Corregir el mensaje de error
    });
});

app.listen(3000, () => {
    console.log("on port 3000");
});

