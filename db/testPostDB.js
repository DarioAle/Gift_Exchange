const postModel = require('./Post');
const chalk = require('chalk');

let FirstPost = {
    id : 5,
    nombrePost : "Cartera",
    descripcionPost : "Cartera para que no te roben tu identidad",
    isNewGift : true,
    date : new Date(),
    owner : "sandriuxgn",
    category : "Accesorios",
    quantity : 1,
    postIsActive : true,
    interesados : ["Mariana"],
    comments : ["Que bonita cartera, dámela"],
    image : ["http://localhost:3000/img/wallet-0.jpg"],
    aquiredBy : undefined
}

postModel.registerPost(FirstPost).then(o => o).catch(e => console.log(e));



// postModel.findOneByPostName("Chaleco").then(u => console.log(u))
//                                             .catch(e => console.log(chalk.red("You screwed it like all" + e)));

// let regex = new RegExp(".*" + "hal" + ".*");

// console.log(chalk.green("cameholtur".match(regex)));

// postModel.getAllPosts().then(u => console.log(u)).catch( e => console.log(chalk.red("You screwed it " + e)));