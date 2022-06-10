import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Stock = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    let getStocks = async () => {
      // 網址應該要長這樣但是換一個寫法如下http://localhost:3001/stocks/2330?page=1
      let response = await axios.get("http://localhost:3001/stocks/");
      setStocks(response.data);
    };
    getStocks();
  }, []);

  return (
    <div>
      <h2 className="mt-6 text-xl text-gray-600 ml-7">股票代碼</h2>

      {stocks.map((stock) => {
        return (
          <div className="p-6 m-6 bg-white rounded-lg shadow cursor-pointer bg-gray-50 hover:shadow-lg">
            <Link to={`/stock/${stock.id}`}>
              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                {stock.id}
              </h2>
              <p className="text-gray-700">{stock.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Stock;
