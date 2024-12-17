import React, { useEffect, useState } from "react";
import { PiSpinnerBallFill } from "react-icons/pi";
import { AiTwotoneCopyright } from "react-icons/ai";
import Header from "../Comoponents/Header";
const CoinsPages = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [currencySymbol, setCurrencySumbol] = useState("$");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3//coins/markets?vs_currency=${currency}`
      );
      const result = await response.json();
      setCoins(result);
      setLoading(false);
      if (currency === "usd") {
        setCurrencySumbol("$");
      } else {
        setCurrencySumbol("₹");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCoin = (item) => {
    setSelectedCoin(item);
    setShowModal(true);
  };
  const handleFilter = (coin) => {
    return coin.name.toLowerCase().includes(text.toLowerCase());
  };

  const filteredCoins = coins.filter(handleFilter);

  useEffect(() => {
    getData();
  }, [currency]);

  return (
    <>
      <Header />
      <div className="section bg-black  h-screen w-full overflow-auto p-4">
        <div className="input flex justify-center items-center">
          <input
            className="w[400px] h-[50px] rounded-xl outline-none p-2"
            type="text"
            placeholder="Search the Currency"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="currency flex justify-end items-end mb-10">
          <select
            className="outline-none rounded-lg cursor-pointer p-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
>
            <option value={"usd"}>$ USD</option>
            <option value={"inr"}>₹ INR</option>
          </select>
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
            {filteredCoins?.map((item) => {
              return (
                <>
                  <div
                    key={item.id}
                    className="bg-white h-[300px] w-[300px] rounded-lg flex flex-col font-semibold gap-2 hover:scale-95 cursor-pointer p-3"
                    onClick={() => handleCoin(item)}
                  >
                    <img
                      className="h-[70px] w-[70px]"
                      src={item.image}
                      alt={item.name}
                    />
                    <span className="text-[23px] font-bold uppercase">
                      {item.symbol.toLowerCase()}
                    </span>
                    <span>{item.name}</span>
                    <span>Current Price: $ {currencySymbol} {item.current_price}</span>
                    <span>Rank: # {item.market_cap_rank}</span>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
      {showModal ? (
        <div className="fixed inset-0 bottom-10 left-10 h-screen w-[100vw] rounded-lg shadow-lg flex justify-center items-center">
          <div className="backdrop-blur-sm h-full w-full flex justify-center items-center">
            <div className="bg-slate-200 h-[600px] w-[500px] rounded-xl p-4 flex flex-col items-center overflow-auto">
              <div className="flex justify-end items-end w-full">
                <h1
                  className="font-bold text-3xl hover:opacity-80 cursor-pointer items-end"
                  onClick={() => setShowModal(false)} // Close the modal
                >
                  X
                </h1>
              </div>

              <div className="items flex flex-col justify-center items-start">
                <img className="place-self-center" src={selectedCoin?.image} />
                <h2 className="text-xl font-bold mb-4 mt-5">
                  Name:{selectedCoin.name}
                </h2>
                <h2 className="text-xl font-bold mb-4">
                  Rank: #{selectedCoin.market_cap_rank}
                </h2>
                <h1 className="text-xl font-bold mb-4">
                  Circulating Supply: {selectedCoin.circulating_supply}
                </h1>
                <h1 className="text-xl font-bold mb-4">
                  Current Price: {selectedCoin.current_price}
                </h1>
                <h1 className="text-xl font-bold mb-4">
                  Highest in 24H: {selectedCoin.high_24h}
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="footer flex justify-center items-center bg-black">
        <AiTwotoneCopyright color="white" />
        <h1 className="text-white">CJVijay-2024</h1>
      </div>
    </>
  );
};
export default CoinsPages;
