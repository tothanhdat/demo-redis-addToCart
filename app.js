
const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');

const redis = require("redis");
const client = redis.createClient();

const REDIS_BASIC        = require('./model/hash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views');

const listProduct = [
    { 
        _id: 111,
        name: "Áo sơ mi trắng",
        price: "16$",
        image1: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-1.jpg",
        image2: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-2.jpg"
    },
    { 
        _id: 222,
        name: "Áo thun xanh lá",
        price: "5$",
        image1: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-3.jpg",
        image2: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-4.jpg"
    },
    { 
        _id: 333,
        name: "Áo sáng tạo",
        price: "5$",
        image1: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-5.jpg",
        image2: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-6.jpg"
    },
    { 
        _id: 444,
        name: "Áo sọc sọc",
        price: "6$",
        image1: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-7.jpg",
        image2: "http://bestjquery.com/tutorial/product-grid/demo9/images/img-8.jpg"
    },
]

app.get('/', async (req, res) => {

    let nameCart = "myCart";
    let myCart = await REDIS_BASIC.myCart({ nameCart });
    //console.log(myCart.data.reply)
    res.render('menu', {listProduct, myCart });
})

app.get('/hashes', (req, res) => {
    res.render('hashes');
})


app.post('/add-hashes', async (req, res) => {
    try {

        let { id, key, value } = req.body;

        let infoHashes = await REDIS_BASIC.insert({ id, key, value })
        res.json(infoHashes.data)
    } catch (error) {
        console.log(error);
    }
    
})

app.get('/info-hashes/:id', async (req, res) => {
    let { id } = req.params;
    let infoHashes = await REDIS_BASIC.infoHash({id});
    res.json(infoHashes.data)
}) 

app.get('/add-to-cart/:productID', async (req, res) => {

    let { productID } = req.params;
    let nameCart = "myCart";
    
    let addtoCart = await REDIS_BASIC.addToCart({ nameCart, productID });
    res.json(addtoCart)
})

app.get('/remove-in-cart/:productID', async (req, res) => {

    let { productID } = req.params;
    let nameCart = "myCart";
    
    let removeInCart = await REDIS_BASIC.removeInCart({ nameCart, productID });
    res.json(removeInCart)
})

app.listen(3000, () => console.log('Server started at port 3000'));




