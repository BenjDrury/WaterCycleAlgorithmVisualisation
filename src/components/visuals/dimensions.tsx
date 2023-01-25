import { Data } from "plotly.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
// @ts-expect-error ts sucks
import { Raindrop } from "watercyclealgorithm/dist/solver/raindrop";
import MyPlotlySimulator from "../my-plotly-simulator";
import { Box, TextField, Typography } from "@mui/material";

const baseData = (
  LBs: Array<number>,
  UBs: Array<number>,
  optimumValues: Array<number>,
): Array<Data> => [
  ...LBs.map<Data>((LB, index) => ({
    x: [LB, UBs[index]],
    y: [index, index],
    type: "scatter",
    mode: "lines",
    marker: { color: "red" },
  })),
  {
    x: optimumValues.map((value) => value),
    y: optimumValues.map((_, index) => index),
    type: "scatter",
    mode: "lines+markers",
    line: { color: "green" },
    marker: { color: "green" },
  },
];

interface DimensionsVisualisationProps {
  Nsr: number;
  Npop: number;
  intensities: Array<number>;
  historyData: Array<Array<Raindrop>>;
  LBs: Array<number>;
  UBs: Array<number>;
}

const DimensionsVisualisation: FC<DimensionsVisualisationProps> = ({
  Nsr,
  Npop,
  intensities,
  historyData,
  LBs,
  UBs,
}) => {
  const [datas, setDatas] = useState<Array<Array<Data>>>([
    baseData(LBs, UBs, historyData.at(-1)?.[0]?.values ?? []),
  ]);
  const [showIteration, setShowIteration] = useState<number>(0);

  useEffect(() => {
    setShowIteration(historyData.length - 1);
  }, []);

  useEffect(() => {
    const newDatas: Array<Array<Data>> = [];

    historyData.forEach((iterationData, iterationIndex) => {
      let newData: Array<Data> = [];

      // Add optimal data
      newData = newData.concat(
        baseData(LBs, UBs, historyData.at(-1)?.[0]?.values ?? []),
      );

      iterationData.slice(Nsr, Npop).forEach((river) => {
        newData.push({
          x: river.values.map((value: any) => value),
          y: river.values.map((_: any, index: number) => index),
          type: "scatter",
          mode: "lines+markers",
          line: { color: "grey" },
          marker: { color: "grey" },
        });
      });
      iterationData.slice(1, Nsr).forEach((river) => {
        newData.push({
          x: river.values.map((value: any) => value),
          y: river.values.map((_: any, index: number) => index),
          type: "scatter",
          mode: "lines+markers",
          line: { color: "blue" },
          marker: { color: "blue" },
        });
      });
      iterationData.slice(0, 1).forEach((sea) => {
        newData.push({
          x: sea.values.map((value: any) => value),
          y: sea.values.map((_: any, index: number) => index),
          type: "scatter",
          mode: "lines+markers",
          line: { color: "yellow" },
          marker: { color: "yellow" },
        });
      });
      newDatas.push(newData);
    });

    setDatas(newDatas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyData]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" style={{ marginRight: 8 }}>
          All Dimensions Visualisation
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

export default DimensionsVisualisation;
