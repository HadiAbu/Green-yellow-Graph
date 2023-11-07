import { useState } from "react";
import "./CSS/App.css";
import MyGraph from "./Components/MyGraph";
import { Graph } from "./Classes/Graph";
import { DataProps } from "./Types/Types";
import TextSection from "./Components/TextSection";

function App() {
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState<Boolean>();
  const [greenYellow, setGreenYellow] = useState<Boolean>();
  const [graphData, setGraphData] = useState<DataProps | undefined>();

  const clickHandler = () => {
    let paths = input
      .trim()
      .replace(/(\n)|(,)\w+/g, ",")
      .replace(/\s/g, "")
      .split(",");

    const newGraph = new Graph(paths);
    const data = newGraph.buildGraphData();

    setGraphData(data);
    setConnected(newGraph.isConnectedGraph(data && data?.nodes[0]?.id));
    setGreenYellow(newGraph.isGreenYellowGraph());
  };

  const greenYellowText = (
    <>
      <span style={{ color: "green" }}>green</span>-
      <span style={{ color: "#FFFF00" }}>yellow</span>
    </>
  );

  return (
    <div className="App">
      <TextSection />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="textareaWrapper">
          <textarea
            cols={30}
            rows={10}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={input === ""}
            onClick={clickHandler}
          >{`Let's Go!`}</button>
        </div>
        {graphData !== undefined && (
          <>
            <h2>{" => "}</h2>
            <MyGraph data={graphData} />
          </>
        )}
      </div>
      {greenYellow !== undefined && (
        <h5>
          Result:{" "}
          {`The graph is ${connected ? "connected" : "disconnected"} and ${
            greenYellow ? "" : "not "
          }`}
          {greenYellowText} colorable.
        </h5>
      )}
    </div>
  );
}
export default App;
