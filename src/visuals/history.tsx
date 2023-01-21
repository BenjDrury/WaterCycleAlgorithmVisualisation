import { Data } from "plotly.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { WCASolver } from "../logic/wca-solver";
import Simulator from "../simulator";

interface HistoryVisualisationProps {
  wcaSolver: WCASolver;
  Nsr: number;
}

const HistoryVisualisation: FC<HistoryVisualisationProps> = ({
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
  const [numberOfHistoryNodes, setNumberOfHistoryNodes] = useState<number>(1);

  useEffect(() => {
    const intensities = wcaSolver.getIntensities;
    const iterations = wcaSolver.getStoredIterations;
    const allData: Array<Array<Data>> = [];

    iterations.forEach((solution, iterationIndex) => {
      const newData: Array<Data> = [];
      let totalIntensity = Nsr;
      const history = iterations.slice(
        iterationIndex - numberOfHistoryNodes < 0
          ? 0
          : iterationIndex - numberOfHistoryNodes,
        iterationIndex + 1,
      );
      newData.push({
        x: history.map((solution) => solution[0].values[0]),
        y: history.map((solution) => solution[0].values[1]),
        z: history.map((solution) => solution[0].values[2]),
        text: history.map((_, index) => index.toString()),
        type: "scatter3d",
        mode: "lines+markers",
        marker: { color: "green" },
      });
      for (let i = totalIntensity; i < totalIntensity + intensities[0]; i++) {
        newData.push({
          x: history.map((solution) => solution[i].values[0]),
          y: history.map((solution) => solution[i].values[1]),
          z: history.map((solution) => solution[i].values[2]),
          type: "scatter3d",
          mode: "lines+markers",
          marker: { color: "gray" },
        });
      }
      totalIntensity += intensities[0];
      for (let i = 1; i < Nsr; i++) {
        newData.push({
          x: history.map((solution) => solution[i].values[0]),
          y: history.map((solution) => solution[i].values[1]),
          z: history.map((solution) => solution[i].values[2]),
          type: "scatter3d",
          mode: "lines+markers",
          marker: { color: "blue" },
        });
        for (let j = totalIntensity; j < totalIntensity + intensities[i]; j++) {
          newData.push({
            x: history.map((solution) => solution[j].values[0]),
            y: history.map((solution) => solution[j].values[1]),
            z: history.map((solution) => solution[j].values[2]),
            type: "scatter3d",
            mode: "lines+markers",
            marker: { color: "gray" },
          });
        }
        totalIntensity += intensities[i];
      }
      allData.push(newData);
    });
    setDatas((state) => allData);
  }, [numberOfHistoryNodes, wcaSolver.getStoredIterations]);

  return (
    <div>
      <span style={{ marginRight: "2rem" }}>History Visualisation</span>
      <input
        type="number"
        style={{ marginRight: "2rem" }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNumberOfHistoryNodes(Number(e.target.value))
        }
        value={numberOfHistoryNodes}
      />
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

export default HistoryVisualisation;
