import { Data } from "plotly.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Raindrop } from "watercyclealgorithm/dist/solver/raindrop";
import MyPlotlySimulator from "../my-plotly-simulator";
import { Box, TextField, Typography } from "@mui/material";

interface HistoryVisualisationProps {
  Nsr: number;
  intensities: Array<number>;
  historyData: Array<Array<Raindrop>>;
}

const HistoryVisualisation: FC<HistoryVisualisationProps> = ({
  Nsr,
  intensities,
  historyData,
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
    setNumberOfHistoryNodes(historyData.length - 1);
    setShowIteration(historyData.length - 1);
  }, []);

  useEffect(() => {
    const allData: Array<Array<Data>> = [];

    historyData.forEach((solution, iterationIndex) => {
      const newData: Array<Data> = [];
      let totalIntensity = Nsr;
      const history = historyData.slice(
        iterationIndex - numberOfHistoryNodes < 0
          ? 0
          : iterationIndex - numberOfHistoryNodes,
        iterationIndex + 1,
      );

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
        newData.push({
          x: history.map((solution) => solution[i].values[0]),
          y: history.map((solution) => solution[i].values[1]),
          z: history.map((solution) => solution[i].values[2]),
          type: "scatter3d",
          mode: "lines+markers",
          marker: { color: "blue" },
        });
        totalIntensity += intensities[i];
      }
      newData.push({
        x: history.map((solution) => solution[0].values[0]),
        y: history.map((solution) => solution[0].values[1]),
        z: history.map((solution) => solution[0].values[2]),
        text: history.map((_, index) => index.toString()),
        type: "scatter3d",
        mode: "lines+markers",
        marker: { color: "green" },
      });
      allData.push(newData);
    });
    setDatas((state) => allData);
  }, [historyData, numberOfHistoryNodes]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" style={{ marginRight: 8 }}>
          History Visualisation
        </Typography>
        <TextField
          label="Iteration"
          value={showIteration}
          style={{ marginRight: 8 }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setShowIteration(Number(e.target.value))
          }
          type="number"
        />
        <TextField
          label="History Iterations"
          value={numberOfHistoryNodes}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNumberOfHistoryNodes(Number(e.target.value))
          }
          type="number"
        />
      </Box>
      <MyPlotlySimulator data={datas[showIteration]} />
    </Box>
  );
};

export default HistoryVisualisation;
