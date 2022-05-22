const http = require('http');
const url = require('url');
const formidable = require('formidable');
const fs = require('fs');
const qs = require('querystring');
const port = 6969;

const homePage = require('./viewTemplates/home');
const addBreedPage = require('./viewTemplates/addBreed');
const addCatPage = require('./viewTemplates/addCat');

const styles = require('./viewTemplates/styles/site');

let cats = require('./storage/cats.json');

http.createServer((req, res) => {
    let path = url.parse(req['url']).pathname;
    let [pathname, query] = req.url.split('?');
    let params = qs.parse(query);
    if (req.url == '/content/styles/site.css') {
        res.writeHead(200, {
            "Content-Type" : "text/css"
        })

        res.write(styles);
    }
    else if(req.url == '/cats/add-breed' && req.method == 'GET'){
        res.writeHead(200, {
            "Content-Type" : "text/html"
        })
        
        res.write(addBreedPage);
    }
    else if(req.url == '/cats/add-cat' && req.method == 'GET'){
        res.writeHead(200, {
            "Content-Type" : "text/html"
        })
        
        res.write(addCatPage);
    }
    else if(req.url == '/cats/add-cat' && req.method == 'POST'){
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                throw err;
            }

            fs.readFile('./storage/cats.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                let allCats = JSON.parse(data);
                allCats.push({ id: allCats.length + 1, ...fields});
                let json = JSON.stringify(allCats);

                fs.writeFile('./storage/cats.json', json, () => {
                    res.writeHead(200, { location: '/' });
                    res.end();
                });
            });
        });
    }
    else{
        let catHTML = '';
        
        let catsResult = cats;
        if (req.url != '/') {
            catsResult.forEach(element => {
                console.log(element.name);
                console.log(params.name);
                if (element.name.startsWith(params.name)) {
                    console.log('starts with');
                }
            });
            // catsResult = catsResult.filter(x => x.name.includes(params.name));
            // console.log(catsResult);
        }
        
        catsResult.forEach(cat => {
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

    res.end();
}).listen(port);

console.log("The server is running");