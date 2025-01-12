import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const fiatCurrencyTickers = ["usd", "eur", "gbp", "jpy", "aud", "cad", "chf", "cny", "sek", "nzd", "mxn", "inr", "sgd", "hkd", "nok", "krw", "brl", "zar", "try", "rub", "idr", "myr", "thb", "php", "sar", "aed", "kwd", "qar", "bhd", "omr"];

 



app.use(express.static("./public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req,res) => {
   
    const response = await axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json");
    const data = response.data;
    const currency = Object.keys(data)[1];
    var keys =  Object.keys(data[currency]);
    keys.forEach(element => {
        if (!(fiatCurrencyTickers.includes(element))) {
            delete data[currency][element];
        }
    }); 
    res.render("index.ejs", {data : data});
})

app.post("/currency", async (req, res) => {
    console.log(req.body);

    var basecurrency = req.body.currency;
    var date = req.body.date;
    basecurrency = basecurrency.toLowerCase();
    try {

        const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${basecurrency}.min.json`);
        var data = response.data;
        const currency = Object.keys(data)[1];
        var keys =  Object.keys(data[currency]);
        keys.forEach(element => {
            if (!(fiatCurrencyTickers.includes(element))) {
                delete data[currency][element];
            }
        }); 
        res.render("index.ejs", {data : data});
    }

    catch(error) {
        res.render("index.ejs", {error : error});
    }
   
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})