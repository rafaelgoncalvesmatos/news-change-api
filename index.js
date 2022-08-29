const express = require('express')
const app = express()
const port = 8080

const axios = require('axios')
const cheerio = require('cheerio')

// for start this app on package.json "node index.js" and prompt command "npm run start"

var word = "debate"

const news = [
    {
        name: "Veja",
        base: "https://veja.abril.com.br/",
        address: "https://veja.abril.com.br/politica/",
    },
    {
        name: "Google News",
        base: "https://news.google.com/",
        address: "https://news.google.com"
    },
    {
        name: "TV Senado",
        base: "https://www12.senado.leg.br",
        address: "https://www12.senado.leg.br/tv"
    },
    {
        name: "Uol",
        base: "https://uol.com.br/",
        address: "https://noticias.uol.com.br/politica/"
    },
    {
        name: "G1",
        base: "https://g1.globo.com/",
        address: "https://g1.globo.com/"
    },
    {
        name: "Folha",
        base: "https://www.folha.uol.com.br/",
        address: "https://www1.folha.uol.com.br/poder/"
    },
]

const articles = []

articles.push(`Palavra chave usada ${word}`)

news.forEach(news => {
    axios.get(news.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $(`a:contains(${word})`, html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: url,
                    base: news.base,
                    source: news.name
                })
            })
        })
})

// Show root page
app.get('/', (req, res) => {
    res.send('API for search news')
})

// URI - Health check for app insight
app.get('/health', (req, res) => {
    res.json({'status': 'OK'})
})

// URI - Show articles
app.get('/news', (req, res) => {
    res.json(articles)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Language: javascript
