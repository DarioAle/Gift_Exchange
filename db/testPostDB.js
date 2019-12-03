const postModel = require('./Post');
const chalk = require('chalk');

let FirstPost = {
    nombrePost : "Chaleco Naranja",
    descripcionPost : "Chaleco verde caliente con interior de peluche",
    isNewGift : false,
    date : new Date(),
    owner : "sandriuxgn",
    category : "ropa",
    quantity : 1,
    postIsActive : true,
    interesados : ["Charlie, Darío, Senpai"],
    comments : ["Hola, creo que ese color de verde está medio feo"]
}

// postModel.registerPost(FirstPost);



// postModel.findOneByPostName("Chaleco").then(u => console.log(u))
//                                             .catch(e => console.log(chalk.red("You screwed it like all" + e)));

// let regex = new RegExp(".*" + "hal" + ".*");

// console.log(chalk.green("cameholtur".match(regex)));

postModel.getAllPosts().then(u => console.log(u)).catch( e => console.log(chalk.red("You screwed it " + e)));