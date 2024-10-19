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

var pokemonName="";


app.get('/', (req, res) => {
    res.render("home", );
});

app.get('/info/:name', (req, res) => {
    
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
    
    
    var pokemonName = req.params.name;
    var url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
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
            

            res.render('info', { id, name, ima, type, hp, xp, weight, height, moves, abilities, stats,pokemonName});
        });
    }).on("error", (e) => {
        console.log(`Got an error: ${e.message}`);  // Corregir el mensaje de error
    });
});


app.get('/bug', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/bug`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

           
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

          
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

       
            Promise.all(promises)
                .then(pokemons => {
             
                    res.render("bug", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});

app.get('/fire', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/fire`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

            // Seleccionar 10 Pokémon aleatorios de tipo fire
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

            // Crear promesas para obtener los detalles de cada Pokémon
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

            // Esperar que todas las promesas se resuelvan
            Promise.all(promises)
                .then(pokemons => {
                    // Renderizar la vista 'bug' con los datos obtenidos
                    res.render("fire", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/dark', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/dark`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

          
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

           
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                  
                    res.render("dark", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/dragon', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/dragon`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

        
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

     
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                   
                    res.render("dragon", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/electric', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/electric`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

           
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

        
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

        
            Promise.all(promises)
                .then(pokemons => {
               
                    res.render("electric", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/fairy', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/fairy`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

          
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

        
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                   
                    res.render("fairy", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/fighting', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/fighting`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

      
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

          
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

         
            Promise.all(promises)
                .then(pokemons => {
                   
                    res.render("fighting", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/flying', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/flying`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

         
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

           
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                    
                    res.render("flying", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/ghost', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/ghost`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

            
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

            
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

          
            Promise.all(promises)
                .then(pokemons => {
                
                    res.render("ghost", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/grass', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/grass`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

        
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

         
            Promise.all(promises)
                .then(pokemons => {
                  
                    res.render("grass", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/ground', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/ground`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

           
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

          
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

       
            Promise.all(promises)
                .then(pokemons => {
                    
                    res.render("ground", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/ice', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/ice`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

         
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

           
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                   
                    res.render("ice", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/nom', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/normal`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

          
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

           
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                    
                    res.render("nom", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/poison', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/poison`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

          
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

           
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

        
            Promise.all(promises)
                .then(pokemons => {
                    
                    res.render("poison", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/psychic', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/psychic`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

            
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

          
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                    
                    res.render("psychic", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/rock', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/rock`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

         
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

            
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

           
            Promise.all(promises)
                .then(pokemons => {
                    
                    res.render("rock", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/teel', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/steel`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

            
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

           
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

          
            Promise.all(promises)
                .then(pokemons => {
                   
                    res.render("teel", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});
app.get('/water', (req, res) => {
    const url = `https://pokeapi.co/api/v2/type/water`;
    
    https.get(url, (response) => {
        let resContent = "";

        response.on("data", (data) => {
            resContent += data;
        });

        response.on("end", () => {
            const jsonObj = JSON.parse(resContent);

            
            const pokemonlist = jsonObj.pokemon.sort(() => 0.5 - Math.random()).slice(0, 10);

            
            const promises = pokemonlist.map(poke => {
                return new Promise((resolve, reject) => {
                    https.get(poke.pokemon.url, (response) => {
                        let pokeContent = "";

                        response.on("data", (chunk) => {
                            pokeContent += chunk;
                        });

                        response.on("end", () => {
                            const pokeObj = JSON.parse(pokeContent);
                            resolve({
                                name: pokeObj.name,
                                image: pokeObj.sprites.front_default
                            });
                        });

                        response.on("error", (e) => {
                            reject(`Error fetching Pokémon data: ${e.message}`);
                        });
                    });
                });
            });

            
            Promise.all(promises)
                .then(pokemons => {
                   
                    res.render("water", { pokemons });
                })
                .catch(err => {
                    console.error("Error al obtener los detalles de los Pokémon:", err);
                    res.status(500).send("Error al obtener detalles de los Pokémon");
                });
        });

    }).on("error", (e) => {
        console.error(`Error al hacer la solicitud a PokeAPI: ${e.message}`);
        res.status(500).send("Error en la solicitud a PokeAPI");
    });
});




app.listen(3000, () => {
    console.log("on port 3000");
});

