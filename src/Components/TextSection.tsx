const TextSection = () => {
  const greenYellowText = (
    <>
      <span style={{ color: "green" }}>green</span>-
      <span style={{ color: "#FFFF00" }}>yellow</span>
    </>
  );
  return (
    <>
      <p>
        {`A graph is `}
        {greenYellowText}
        {` colorable if two connected nodes never have the
        same color, and the graph is a connected graph(a word is a node, a dash
        an edge and a new line or a comma a separation between paths). Please
        provide an input in the text area:`}
      </p>
      <small>
        Examples: <br />
        Input: a - b - c - a. Is a connected graph, but not {
          greenYellowText
        }{" "}
        colorable.
        <br />
        Input: a - b, c - d, b - c, a - d. Is a connected and {
          greenYellowText
        }{" "}
        colorable graph.
      </small>
    </>
  );
};

export default TextSection;
