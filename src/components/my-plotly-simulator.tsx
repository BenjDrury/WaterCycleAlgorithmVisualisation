import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import { FC } from "react";

interface MyPlotlySimulatorProps {
  data: Array<Data>;
}

const MyPlotlySimulator: FC<MyPlotlySimulatorProps> = ({ data }) => {
  return (
    <Plot
      data={data ?? []}
      layout={{
        autosize: true,
        width: 1000,
        height: 800,
        title: { text: "A Plot", font: { color: "#ffffff" } },
        scene: {
          aspectratio: {
            x: 1,
            y: 1,
            z: 1,
          },
          xaxis: {
            type: "linear",
            zeroline: false,
          },
          yaxis: {
            type: "linear",
            zeroline: false,
          },
          zaxis: {
            type: "linear",
            zeroline: false,
          },
        },
      }}
      onInitialized={(figure) => null}
      onUpdate={(figure) => null}
    />
  );
};

export default MyPlotlySimulator;
