import React, { useState, useEffect } from "react";
import { PiSpinnerBallFill } from "react-icons/pi";
import Header from "../Comoponents/Header";
const ExchangePage = () => {
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/exchanges`
      );
      const result = await response.json();
      console.log(result);
      setExchange(result);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = (exchange) => {
    return exchange.name.toLowerCase().includes(text.toLowerCase());
  };

  const filteredExchange = exchange.filter(handleFilter);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="section bg-black  h-screen w-full overflow-auto p-4">
        <div className="currency flex justify-end items-end mb-10">
          <div className="input flex justify-center items-center mt-10">
            <input
              className="w[400px] h-[50px] rounded-xl outline-none p-2"
              type="text"
              placeholder="Search the Currency"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="flex justify-center items-center mt-[150px]">
              <PiSpinnerBallFill
                size="50px"
                color="white"
                className="animate-spin"
              />
            </div>
          ) : (
            <div className="flex justify-evenly items-center flex-wrap gap-10 mt-10">
              {filteredExchange?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-white h-[300px] w-[300px] rounded-lg flex flex-col font-semibold gap-2 hover:scale-95 cursor-pointer p-3"
                    onClick={() => {
                      window.location.href = item.url;
                    }}
                  >
                    <img
                      className="h-[70px] w-[70px] "
                      src={item.image}
                      alt={item.name}
                    />
                    <span>Rank: #{item.trust_score_rank}</span>
                    <span>{item.name}</span>
                    <span>Trust Score: {item.trust_score}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExchangePage;
