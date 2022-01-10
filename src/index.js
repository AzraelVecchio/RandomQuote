import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";
import { Provider } from "react-redux";
import { store } from "./state/index";
let audio;

function BgRender() {
  const state = useSelector((state) => state.data);
  const video = state.background;
  const border = require("./files/images/border/border.png").default;
  return (
    <main style={{ backgroundColor: "black" }} className="hc-fhv">
      <iframe
        className="position-absolute"
        width="100%"
        height="100%"
        src={video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write;
     encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <img
        alt="border"
        src={border}
        className="position-absolute h-100 w-100 m-0"
      ></img>
      <img
        alt="character"
        className="mh-100 m-0 position-absolute"
        src={require(state.image + "").default}
      ></img>
      <ActionRender />
    </main>
  );
}

function ActionRender() {
  const dispatch = useDispatch();

  const { addData, play } = bindActionCreators(actionCreators, dispatch);

  const state = useSelector((state) => state);

  const butt = (
    <button
      disabled={!state.play}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        addData();
      }}
      style={{ backgroundColor: state.data.color }}
      id="new-quote"
      className="btn btn-sm fw-bold ml-5 mb-2 ms-5"
    >
      New Quote
    </button>
  );

  const start = () => {
    audio = new Audio(require(state.data.audio + "").default);
    audio.volume = 0.1;
    state.play ? audio.play() : audio.pause();
    play(true);
    audio.addEventListener("ended", () => play(false));
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(20, 0, 0, 0.5)",
        border: "solid 4px " + state.data.color,
      }}
      id="quote-box"
      className="h-auto rounded-3 m-0 g-4 bg-img container-sm 
      position-absolute top-50 start-50 translate-middle"
    >
      <div
        className="row h-75 g-0 
      w-100 m-0 align-items-center"
      >
        <div
          style={{ color: state.data.color }}
          className="col mt-5 mx-5 w-100"
        >
          <p id="text" className="fs-4 fw-bold text-break text-center">
            {state.data.phrase}
          </p>
          <small id="author" className="lead float-end me-5">
            - {state.data.name}
          </small>
        </div>
      </div>
      <div className="row h-25 g-0 w-100 m-0 justify-content-between align-items-end">
        <div className="col-4 py-2 ">{butt}</div>
        <div className="col-4 me-5 mt-4 py-2">
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={start}
            style={{ backgroundColor: state.data.color }}
            className="btn btn-sm m-0 fw-bold mb-2 ms-2"
          >
            Play
          </button>
          <a
            id="tweet-quote"
            href={
              "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
              `"${state.data.phrase}" ${state.data.name}`
            }
            target="_blank"
            rel="noreferrer"
          >
            <button
              onMouseDown={(e) => e.preventDefault()}
              style={{ backgroundColor: state.data.color }}
              className="btn btn-sm m-0 float-end fw-bold mb-2 ms-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-twitter"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

class UIRender extends React.Component {
  render() {
    return <BgRender />;
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UIRender />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
