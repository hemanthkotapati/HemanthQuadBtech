const express = require('express')
const router = express.Router()
const axios = require("axios")
const CryptoData = require('../models/cryptoDataSchema')
const moment = require('moment')
require('moment-timezone')


const getDetails = async (baseUnit) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers')
        const res_data = await response.data
        const result = Object.values(res_data).slice(0,10)
        
        const cryptoDataArray = result.map((data) => new CryptoData(data))

        await CryptoData.insertMany(cryptoDataArray)

        var storedData = await CryptoData.find({"base_unit" : baseUnit}).sort({_id:-1}).limit(10)
        
        storedData.reverse()
        const processedData = []

        if (storedData.length === 0) {
            const processedDoc = {
              baseUnit: baseUnit,
              name: `${baseUnit.toUpperCase()}/INR`,
              buy: 0,
              sell: 0,
              volume: 0,
              open: 0,
              low: 0,
              high: 0,
              last: 0,
              tradeTime: '',
            };
            processedData.push(processedDoc)
          } else {



            storedData.forEach((data) => {
                var { base_unit, name, buy, sell, volume, open, low, high, last } = data;

                const timestamp = moment.utc(data.at * 1000)
                const tradeTime = timestamp.tz('Asia/Kolkata').format('DD/MM/YYYY [at] h:mm A')

                base_unit = base_unit.toUpperCase()
                const processedDoc = {
                    baseUnit: base_unit,
                    name: name,
                    buy: buy,
                    sell: sell,
                    volume: volume,
                    open: open,
                    low: low,
                    high: high,
                    last: last,
                    tradeTime: tradeTime,
                }

                processedData.push(processedDoc)
            })
        }

            CryptoData.deleteMany({})

            return processedData;
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal error fetching and storing data')
        }
    
}


router.get('/',async (req, res) => {

    const baseUnit = "btc"
    getDetails("btc")
    .then((processedData) => {
        res.render('index', { data: processedData,unit: baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/xrp', async (req,res) => {

    const baseUnit = "xrp"
    getDetails("xrp")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })
})

router.get('/eth',async (req, res) => {
    const baseUnit = "eth"
    getDetails("eth")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/usdt',async (req, res) => {
    const baseUnit = "usdt"
    getDetails("usdt")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/trx',async (req, res) => {
    const baseUnit = "trx"
    getDetails("trx")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/dash',async (req, res) => {
    const baseUnit = "dash"
    getDetails("dash")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/zec',async (req, res) => {
    const baseUnit = "zec"
    getDetails("zec")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/xem',async (req, res) => {
    const baseUnit = "xem"
    getDetails("xem")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/iost',async (req, res) => {
    const baseUnit = "iost"
    getDetails("iost")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/win',async (req, res) => {
    const baseUnit = "win"
    getDetails("win")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})

router.get('/btt', async (req,res) => {

    const baseUnit = "btt"
    getDetails("btt")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })
})

router.get('/wrx',async (req, res) => {
    const baseUnit = "wrx"
    getDetails("wrx")
    .then((processedData) => {
        res.render('index', { data: processedData,unit:baseUnit });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal error fetching and storing data');

    })    
})


router.get('/telegram', (req,res) => {
    res.render("../views/telegram.ejs")
} )



module.exports = router