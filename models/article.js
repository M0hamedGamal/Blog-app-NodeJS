const mongoose = require('mongoose')
const slugify = require('slugify') // in our case put title into query of url instead the ID.

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

// validate --> any validate like save, create, delete, update.
articleSchema.pre('validate', function(next) {
    const article = this

    // if title exists.
    if (article.title) {
        // add title into slug field with lowercase and strict.
        article.slug = slugify(article.title, { lower: true, strict: true }) // strict remove special char ex. title = Test: new Test | with strict query will be /test-new-test
    }

    next()
})

const article = mongoose.model("Article", articleSchema)

module.exports = article