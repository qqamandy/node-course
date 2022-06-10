import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StockDetails = () => {
  const [data, setData] = useState([]);
  //目前在哪一頁
  const [page, setPage] = useState(8);

  //總筆數
  const [lastPage, setLastPage] = useState();

  //從網址把:stockId拿下來
  const { stockId } = useParams();

  useEffect(() => {
    let getPrice = async () => {
      let response = await axios.get(
        `http://localhost:3001/stocks/${stockId}`,
        {
          params: {
            page: page,
          },
        }
      );
      setData(response.data.data);
      //把芬頁ㄉlastPage寫進page
      setLastPage(response.data.pagination.lastPage);
    };
    getPrice();
  }, [page]);

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          style={{
            display: "inline-block",
            margin: "2px",
            backgroundColor: page === i ? "#00d1b2" : "",
            borderColor: page === i ? "#00d1b2" : "#dbdbdb",
            color: page === i ? "#fff" : "#363636",
            borderWidth: "1px",
            width: "28px",
            height: "28px",
            borderRadius: "3px",
            textAlign: "center",
          }}
          key={i}
          onClick={(e) => {
            // 管理好 page 這個狀態
            setPage(i);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      <ul>{getPages()}</ul>
      {data.map((item) => {
        return (
          <div
            key={item.date}
            className="p-6 m-6 bg-white rounded-lg shadow bg-gray-50"
          >
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              日期：{item.date}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              成交金額：{item.amount}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              成交股數：{item.volume}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              開盤價：{item.open_price}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              收盤價：{item.close_price}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              漲跌價差：{item.delta_price}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              最高價：{item.high_price}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              最低價：{item.low_price}
            </h2>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              成交筆數：{item.transactions}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;
