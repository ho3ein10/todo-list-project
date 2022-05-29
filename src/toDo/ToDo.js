import React, { useState, useEffect } from "react";
import "./reset.css";
import "./toDoStyle.css";

const ToDo = () => {
  const [myInput, setMyInput] = useState("");
  const [state, setstate] = useState([]);
  const [myTime, setMyTime] = useState([]);
  console.log(state);
  console.log(myTime);

  useEffect(() => {
    const toDos = JSON.parse(localStorage.getItem("ToDos"));
    const toDosTime = JSON.parse(localStorage.getItem("ToDosTime"));
    if (!!toDos && !!toDosTime) {
      setstate(toDos);
      setMyTime(toDosTime);
    }
  }, []);

  useEffect(() => {
    if (!!state && !!myTime) {
      localStorage.setItem("ToDos", JSON.stringify(state));
      localStorage.setItem("ToDosTime", JSON.stringify(myTime));
    }
  }, [state, myTime]);

  return (
    <div className="main">
      <div className="frame">
        <header>
          <h1>ToDo List</h1>
        </header>
        <div className="add-frame">
          <input
            placeholder="Add your new todo"
            type="Text"
            value={myInput}
            onChange={(e) => {
              setMyInput(e.target.value);
            }}
          ></input>

          <button
            onClick={() => {
              !!myInput && setstate((last) => [...last, myInput]);
              setMyInput("");
              !!myInput &&
                setMyTime((last) => {
                  const d = new Date();
                  let text = d.toLocaleString();
                  return [...last, text];
                });
            }}
          >
            ADD
          </button>
        </div>
        <div className="newlist">
          {state.map((item, index) => (
            <div key={index} className="par">
              {item}
              <div className="RightOfNewlist">
                <p>{myTime[index].toString()}</p>

                <button
                  key={index}
                  onClick={() => {
                    setstate((last) => {
                      let a = [...last];
                      a.splice(index, 1);
                      return [...a];
                    });
                    setMyTime((last) => {
                      let b = [...last];

                      b.splice(index, 1);
                      return [...b];
                    });
                  }}
                ></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
