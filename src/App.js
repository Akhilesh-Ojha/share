import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Stock from "./Stock";


function App() {
  const allStocks = [];
  const [stocksOwn, setStocks] = useState([]);
  const [totalMoneyCurrentlyInPort, settotalMoneyCurrentlyInPort] = useState(0);
  const [totalMoneyInvestedInPort, settotalMoneyInvestedInPort] = useState(0);

  let one = "http://localhost:3000/nse/get_quote_info?companyName=RELIANCE"
  let two = "http://localhost:3000/nse/get_quote_info?companyName=GICHSGFIN"
  let three = "http://localhost:3000/nse/get_quote_info?companyName=GICRE"
  let four = "http://localhost:3000/nse/get_quote_info?companyName=GODREJAGRO";
  let five = "http://localhost:3000/nse/get_quote_info?companyName=PFS";
  let six = "http://localhost:3000/nse/get_quote_info?companyName=TATAMTRDVR";
  let seven = "http://localhost:3000/nse/get_quote_info?companyName=TATASTEEL";
  let eight = "http://localhost:3000/nse/get_quote_info?companyName=IDFCFIRSTB";
  let nine = "http://localhost:3000/nse/get_quote_info?companyName=SAIL";
  let ten = "http://localhost:3000/nse/get_quote_info?companyName=FRETAIL";

  let purchasePrice = [
    {name: 'RELIANCE', price:"1900.20", quantity: "5"},
    {name: 'GICHSGFIN', price: "222.13", quantity: "10"},
    {name: 'GICRE', price: "433.50", quantity: "160"},
    {name: 'GODREJAGRO', price: "460", quantity: "32"},
    {name: 'PFS', price: "33.71", quantity: "200"},
    {name: 'TATAMTRDVR', price: "255.80", quantity: "15"},
    {name: 'TATASTEEL', price: "659.79", quantity: "40"},
    {name: 'IDFCFIRSTB', price: "50.36", quantity: "100"},
    {name: 'SAIL', price: "77.62", quantity: "200"},
    {name: 'FRETAIL', price: "88.95", quantity: "80"}
  ]


  useEffect(() => {
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    const requestFour = axios.get(four);
    const requestFive = axios.get(five);
    const requestSix = axios.get(six);
    const requestSeven = axios.get(seven);
    const requestEight = axios.get(eight);
    const requestNine = axios.get(nine);
    const requestTen = axios.get(ten);
    
    axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive,requestSix,requestSeven,requestEight,requestNine, requestTen]).then(axios.spread((...responses) => {
      const responseOne = responses[0].data.data[0];
      const responseTwo = responses[1].data.data[0];
      const responesThree = responses[2].data.data[0];
      const responseFour = responses[3].data.data[0];
      const responseFive = responses[4].data.data[0];
      const responseSix = responses[5].data.data[0];
      const responseSeven = responses[6].data.data[0];
      const responseEight = responses[7].data.data[0];
      const responseNine = responses[8].data.data[0];
      const responseTen = responses[9].data.data[0];
      allStocks.push(responseOne,responseTwo,responesThree, responseFour, responseFive,responseSix,responseSeven,responseEight,responseNine,responseTen);
      allStocks.forEach(stock => {
        for(let i = 0 ; i < purchasePrice.length; i++) {
          if(stock.symbol === purchasePrice[i].name) {
            const numStock = stock.lastPrice.replace(/\,/g,'');
            const numStockInNumber = +numStock;
            const numStockTwoDec = numStockInNumber.toFixed(2);
            stock['purchasePrice'] = purchasePrice[i].price;
            stock['quantityPurchased'] = purchasePrice[i].quantity;
            stock['totalMoneyInvested'] = purchasePrice[i].price * purchasePrice[i].quantity;
            stock['totalMoneyCurrently'] = numStockTwoDec * purchasePrice[i].quantity;
            const gainLossInDec = stock['totalMoneyCurrently'] - stock['totalMoneyInvested'];
            const gainLossTill2Dec = gainLossInDec.toFixed(2);
            stock['totalGainLoss'] = gainLossTill2Dec;
          }
        }
      })
      console.log(allStocks);
      let TMIP = allStocks.reduce((acc, currentValue) => {
        return acc + currentValue.totalMoneyInvested
      }, 0);
      settotalMoneyInvestedInPort(TMIP)
      let TMCP = allStocks.reduce((acc, currentValue) => {
        return acc + currentValue.totalMoneyCurrently
      }, 0)
      settotalMoneyCurrentlyInPort(TMCP);
      let header = {companyName: "Company Name", symbol: "Symbol", lastPrice: "Current Price", purchasePrice: "Purchase Price", quantityPurchased: "Quantity", totalMoneyCurrently: "Current Amt", totalMoneyInvested: "Invested Amt", totalGainLoss: "Gain/Loss"}
      allStocks.unshift(header);
      setStocks(allStocks);
    })).catch(errors => {
      console.log(errors);
    })
    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Share Portfolio</h1>
      </header>
      <main>
        {stocksOwn.map((stock) => {
          return (
            <Stock key={stock.companyName} 
                companyName={stock.companyName}
                symbol={stock.symbol} 
                price={stock.lastPrice}
                purchasePrice={stock.purchasePrice}
                totalMoneyCurrently={stock.totalMoneyCurrently} 
                quantity={stock.quantityPurchased} 
                overAllPrice={stock.totalMoneyInvested}  
                gainLoss={stock.totalGainLoss} 
              />
          )
        })}

        <div className="Calculator">
          <h3>Total Money Invested: Rs {totalMoneyInvestedInPort.toLocaleString()}</h3>
          <h3>Total Money in Portfolio: Rs {totalMoneyCurrentlyInPort.toLocaleString()}</h3>
          {totalMoneyInvestedInPort - totalMoneyCurrentlyInPort < 0 ? <h3>Total Gain: </h3> : <h3>Total Loss: Rs <span style={{color:'#f00606'}}>{(totalMoneyCurrentlyInPort - totalMoneyInvestedInPort).toFixed
          (1).toLocaleString()}</span></h3>} 
        </div>
      </main>
    </div>
  );
}

export default App;

