import { React } from "react";
import './Stock.css';

const Stock = ({companyName, symbol,price,purchasePrice,quantity,overAllPrice,gainLoss,totalMoneyCurrently}) => {
    return (
        <div className="Stock-Container">
            <div className="Stock-Row">
                <div className="Stock">
                    <h1>{companyName}</h1>
                    <p className="Stock-Symbol">{symbol}</p>
                </div>
                <div className="Stock-Data">
                    <p className="Stock-Price">{price}</p>
                    <p className="Stock-PurchasePrice">{purchasePrice}</p>
                    <p className="Stock-Quantity">{quantity}</p>
                    <p className="Stock-Qverall">{overAllPrice}</p>
                    <p className="Stock-Qverall-Currently">{totalMoneyCurrently}</p>
                    {gainLoss > 0 ? <p className="GainLoss green">{gainLoss}</p> : <p className="GainLoss red">{gainLoss}</p> }
                </div>
            </div>
        </div>
    )
}

export default Stock