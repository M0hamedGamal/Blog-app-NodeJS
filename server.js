/* 
npm i express mongoose ejs
npm i --save-dev nodemon
npm i slugify    // Instead appear ID into query.. use any field else.. in our case we use title.
npm i method-override
*/

// process.env.NODE_ENV !== 'production' --> default running by node js but let we check. 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'env' }); // run the 'dotenv' lib & config the path of env
}

const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const PORT = process.env.PORT | 3000

mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
const articleRouter = require('./routes/article')
const Article = require('./models/article')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.urlencoded({ extended: false })) // Allow us to use 'req.body.' check article.js
app.use(methodOverride('_method'))
app.use('/articles', articleRouter)


app.get('/', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', {
        articles: articles
    })

})

app.listen(PORT)