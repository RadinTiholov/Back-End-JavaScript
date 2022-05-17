const http = require('http');
const url = require('url');
const port = 6969;

const homePage = require('./viewTemplates/home');
const addBreedPage = require('./viewTemplates/addBreed');
const addCatPage = require('./viewTemplates/addCat');

const styles = require('./viewTemplates/styles/site');

const cats = require('./storage/cats.json');

http.createServer((req, res) => {
    let path = url.parse(req['url']).pathname;
    if (req.url == '/content/styles/site.css') {
        res.writeHead(200, {
            "Content-Type" : "text/css"
        })

        res.write(styles);
    }
    else if (req.url == '/'){
        let catHTML = '';

        cats.forEach(cat => {
            catHTML += `
            <li>
        <img src=${cat.imageUrl} alt="Black Cat">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
        </ul>
    </li>`
        });
        const result = homePage.replace('{{cats}}', catHTML);

        res.writeHead(200, {
            "Content-Type" : "text/html"
        })
        
        res.write(result);
    }
    else if(req.url == '/cats/add-breed'){
        res.writeHead(200, {
            "Content-Type" : "text/html"
        })
        
        res.write(addBreedPage);
    }
    else if(req.url == '/cats/add-cat'){
        res.writeHead(200, {
            "Content-Type" : "text/html"
        })
        
        res.write(addCatPage);
    }

    res.end();
}).listen(port);

console.log("The server is running");