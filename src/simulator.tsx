import Plot from "react-plotly.js";
import { Data } from "plotly.js";
import { FC } from "react";

interface SimulatorProps {
  data: Array<Data>;
}

const Simulator: FC<SimulatorProps> = ({ data }) => {
  return (
    <Plot
      data={data ?? []}
      layout={{
        autosize: true,
        width: window.innerWidth * 0.95,
        height: window.innerHeight * 0.95,
        title: { text: "A Fancy Plot", font: { color: "#ffffff" } },
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

export default Simulator;
