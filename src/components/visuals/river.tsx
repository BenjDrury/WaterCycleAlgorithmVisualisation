import { Data } from "plotly.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
// @ts-expect-error ts sucks
import { Raindrop } from "watercyclealgorithm/dist/solver/raindrop";
import MyPlotlySimulator from "../my-plotly-simulator";
import { Box, TextField, Typography } from "@mui/material";

interface RiverVisualisationProps {
  Nsr: number;
  intensities: Array<number>;
  historyData: Array<Array<Raindrop>>;
}

const RiverVisualisation: FC<RiverVisualisationProps> = ({
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

  useEffect(() => {
    setShowIteration(historyData.length - 1);
  }, []);

  useEffect(() => {
    const allData: Array<Array<Data>> = [];
    historyData.forEach((solution) => {
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
  }, [historyData]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" style={{ marginRight: 8 }}>
          Intensity Visualisation {"(Compare to river view)"}
        </Typography>
        <TextField
          label="Iteration"
          value={showIteration}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setShowIteration(Number(e.target.value))
          }
          type="number"
        />
      </Box>
      <MyPlotlySimulator data={datas[showIteration]} />
    </Box>
  );
};

export default RiverVisualisation;
