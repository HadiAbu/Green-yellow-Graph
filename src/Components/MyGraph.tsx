import { Graph } from "react-d3-graph";
import { Props } from "../Types/Types";

const myConfig = {
  maxZoom: 1,
  minZoom: 1,
  height: 250,
  width: 300,
  border: "black",
  focusAnimationDuration: 0.2,
  automaticRearrangeAfterDropNode: true,
};

const MyGraph = ({ data }: Props) => {
  return (
    <div
      style={{
        background: "#8eb484",
        border: "white dashed 2px",
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
      }}
    >
      <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
      />
    </div>
  );
};

export default MyGraph;
