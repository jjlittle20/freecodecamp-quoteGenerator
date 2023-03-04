import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quoteData, setQuoteData] = useState({ text: "", author: "" });

  const getQuoteData = async () => {
    fetch("https://api.quotable.io/random")
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");

        const data = isJson ? await response.json() : null;

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        const newQuoteData = {
          text: data?.content,
          author: data?.author,
        };

        setQuoteData(newQuoteData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getQuoteData();
  }, []);
  return (
    <>
      <a
        href="https://github.com/jjlittle20/freecodecamp-quoteGenerator"
        className="d-flex justify-content-end"
      >
        Github Repo
      </a>
      <div className=" d-flex justify-content-center align-items-center h-100 d-inline-block p-4">
        <div className="card" id="quote-box">
          <div class="card-body max-w-40">
            <div id="text" style={{ wordWrap: "break-word" }}>
              {quoteData?.text}
            </div>
            <div className="mt-4  d-flex justify-content-end" id="author">
              -{quoteData?.author}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button id="new-quote" onClick={() => getQuoteData()}>
                New Quote
              </button>
              <a href="twitter.com/intent/tweet" id="tweet-quote">
                Tweet
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
