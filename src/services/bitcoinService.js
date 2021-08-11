import axios from 'axios'

//eslint-disable-next-line
export default {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

async function getRate(coins, currency = 'USD') {
    try {

        const res = await axios.get(`https://blockchain.info/tobtc?currency=${currency}&value=${coins}`)
        // console.log(res.data);
        return res.data
    } catch (err) {
        console.log(err);
    }
}
async function getMarketPrice() {
    try {
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true`)
        return res.data
    } catch (err) {
        console.log(err);
    }

}
async function getConfirmedTransactions() {
    try {
        const res = await axios.get(`https://api.blockchain.info/charts/n-transactions?timespan=1months&format=json&cors=true
        `)
        return res.data
    } catch (err) {
        console.log(err);
    }
}
