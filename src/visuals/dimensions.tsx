import { Data } from "plotly.js";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { WCASolver } from "../logic/wca-solver";
import Simulator from "../simulator";

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
  wcaSolver: WCASolver;
  Nsr: number;
  Npop: number;
  LBs: Array<number>;
  UBs: Array<number>;
}

const DimensionsVisualisation: FC<DimensionsVisualisationProps> = ({
  wcaSolver,
  Nsr,
  Npop,
  LBs,
  UBs,
}) => {
  const [datas, setDatas] = useState<Array<Array<Data>>>([
    baseData(LBs, UBs, wcaSolver.getStoredIterations.at(-1)?.[0]?.values ?? []),
  ]);
  const [showIteration, setShowIteration] = useState<number>(0);

  useEffect(() => {
    const newDatas: Array<Array<Data>> = [];

    wcaSolver.getStoredIterations.forEach((iterationData, iterationIndex) => {
      let newData: Array<Data> = [];

      // Add optimal data
      newData = newData.concat(
        baseData(
          LBs,
          UBs,
          wcaSolver.getStoredIterations.at(-1)?.[0]?.values ?? [],
        ),
      );

      iterationData.slice(Nsr, Npop).forEach((river) => {
        newData.push({
          x: river.values.map((value) => value),
          y: river.values.map((_, index) => index),
          type: "scatter",
          mode: "lines+markers",
          line: { color: "grey" },
          marker: { color: "grey" },
        });
      });
      iterationData.slice(1, Nsr).forEach((river) => {
        newData.push({
          x: river.values.map((value) => value),
          y: river.values.map((_, index) => index),
          type: "scatter",
          mode: "lines+markers",
          line: { color: "blue" },
          marker: { color: "blue" },
        });
      });
      iterationData.slice(0, 1).forEach((sea) => {
        newData.push({
          x: sea.values.map((value) => value),
          y: sea.values.map((_, index) => index),
          type: "scatter",
          mode: "lines+markers",
          line: { color: "yellow" },
          marker: { color: "yellow" },
        });
      });
      newDatas.push(newData);
    });

    // _startAnimation();

    setDatas(newDatas);
  }, [wcaSolver.getStoredIterations, LBs, Npop, Nsr, UBs]);

  return (
    <div>
      <span style={{ marginRight: "2rem" }}>All Dimensions Visualisation</span>
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

export default DimensionsVisualisation;
