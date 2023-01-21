import { Data } from "plotly.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { WCASolver } from "../logic/wca-solver";
import Simulator from "../simulator";

interface RiverVisualisationProps {
  wcaSolver: WCASolver;
  Nsr: number;
}

const RiverVisualisation: FC<RiverVisualisationProps> = ({
  wcaSolver,
  Nsr,
}) => {
  const [datas, setDatas] = useState<Array<Array<Data>>>([
    [
      {
        x: [0, 0],
        y: [1, 1],
        z: [0, 0],
        type: "scatter3d",
        mode: "lines+markers",
        marker: { color: "blue" },
      },
    ],
  ]);
  const [showIteration, setShowIteration] = useState<number>(0);

  useEffect(() => {
    const intensities = wcaSolver.getIntensities;
    const iterations = wcaSolver.getStoredIterations;
    const allData: Array<Array<Data>> = [];

    iterations.forEach((solution) => {
      const newData: Array<Data> = [];
      let totalIntensity = Nsr;

      for (let i = totalIntensity; i < totalIntensity + intensities[0]; i++) {
        newData.push({
          x: [solution[0].values[0], solution[i].values[0]],
          y: [solution[0].values[1], solution[i].values[1]],
          z: [solution[0].values[2], solution[i].values[2]],
          type: "scatter3d",
          mode: "lines+markers",
          marker: { color: "gray" },
        });
      }
      totalIntensity += intensities[0];
      for (let i = 1; i < Nsr; i++) {
        newData.push({
          x: [solution[0].values[0], solution[i].values[0]],
          y: [solution[0].values[1], solution[i].values[1]],
          z: [solution[0].values[2], solution[i].values[2]],
          type: "scatter3d",
          mode: "lines+markers",
          marker: { color: "transparent" },
          line: { color: "blue" },
        });
        for (let j = totalIntensity; j < totalIntensity + intensities[i]; j++) {
          newData.push({
            x: [solution[i].values[0], solution[j].values[0]],
            y: [solution[i].values[1], solution[j].values[1]],
            z: [solution[i].values[2], solution[j].values[2]],
            type: "scatter3d",
            mode: "lines+markers",
            marker: { color: "gray" },
          });
        }
        totalIntensity += intensities[i];
      }
      newData.push({
        x: [solution[0].values[0]],
        y: [solution[0].values[1]],
        z: [solution[0].values[2]],
        type: "scatter3d",
        mode: "markers",
        marker: { color: "green" },
      });
      allData.push(newData);
    });
    setDatas((state) => allData);
  }, [wcaSolver.getStoredIterations, wcaSolver.getIntensities, Nsr]);

  return (
    <div>
      <span style={{ marginRight: "2rem" }}>River Visualisation</span>
      <input
        type="number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setShowIteration(Number(e.target.value))
        }
        value={showIteration}
      />
      <br></br>
      <Simulator data={datas[showIteration]} />
    </div>
  );
};

export default RiverVisualisation;
