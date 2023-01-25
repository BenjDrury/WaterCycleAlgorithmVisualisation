import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import problems from "../../__problems__";
// @ts-expect-error ignore
import { WCASolver } from "watercyclealgorithm/dist/solver/wca-solver";
// @ts-expect-error ignore
import { Raindrop } from "watercyclealgorithm/dist/solver/raindrop";
import RiverVisualisation from "../../components/visuals/river";
import HistoryVisualisation from "../../components/visuals/history";
import DimensionsVisualisation from "../../components/visuals/dimensions";

function ProblemByIdPage({ props }: any) {
  const params = useParams();

  const problemId: number = Number(params.problemId);

  const [problem] = useState(problems[problemId]);
  const [WCAParams, setWCAParams] = useState<{
    dMax: number;
    Nsr: number;
    Npop: number;
    MaxIterations: number;
  }>({
    dMax: 0.1,
    Nsr: 8,
    Npop: 50,
    MaxIterations: 1000,
  });
  const [solution, setSolution] = useState<any>();
  const [historyData, setHistoryData] = useState<Array<Array<Raindrop>>>([]);
  const [intensities, setIntensities] = useState<Array<number>>([]);
  const [displayPlot, setDisplayPlot] = useState<string>("river");
  const [duration, setDuration] = useState(0);
  const [execute, setExecute] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const _handleWCAParamChange = (
    key: "dMax" | "Nsr" | "Npop" | "MaxIterations",
    value: number,
  ) => {
    setWCAParams((state) => ({ ...state, [key]: value }));
  };

  useEffect(() => {
    if (!execute || duration !== 0 || solution !== undefined) return;
    setExecute(false);

    const solver = new WCASolver(problem.problem);

    const startTime = Date.now();
    const sol = solver.solve(
      WCAParams.Nsr,
      WCAParams.dMax,
      WCAParams.Npop,
      WCAParams.MaxIterations,
    );
    const newDuration = Date.now() - startTime;

    setHistoryData(solver.iterations);
    setIntensities(solver.intensities);
    setIsLoading(false);
    setSolution(sol);
    setDuration(newDuration);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, solution, duration]);

  const _handleExecuteWCA = async () => {
    setHistoryData([]);
    setIntensities([]);
    setSolution(undefined);
    setDuration(0);
    setIsLoading(true);
    setTimeout(() => {
      setExecute(true);
    }, 1000);
  };

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {problem.name}
          </Typography>
          <Box
            component="img"
            sx={{
              height: 300,
              ml: "50%",
            }}
            style={{ transform: "translate(-50%,0)" }}
            src={process.env.PUBLIC_URL + "/" + problem.img}
          />
          <Grid container spacing={4}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Npop"
                value={WCAParams.Npop}
                disabled={isLoading}
                onChange={(event) =>
                  _handleWCAParamChange("Npop", Number(event.target.value) || 0)
                }
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Nsr"
                disabled={isLoading}
                value={WCAParams.Nsr}
                onChange={(event) =>
                  _handleWCAParamChange("Nsr", Number(event.target.value) || 0)
                }
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="dMax"
                disabled={isLoading}
                value={WCAParams.dMax}
                onChange={(event) =>
                  _handleWCAParamChange("dMax", Number(event.target.value) || 0)
                }
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="MaxIterations"
                disabled={isLoading}
                onChange={(event) =>
                  _handleWCAParamChange(
                    "MaxIterations",
                    Number(event.target.value) || 0,
                  )
                }
                value={WCAParams.MaxIterations}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ ml: "50%", mt: 4 }}
            style={{ transform: "translate(-50%, 0)" }}
            onClick={_handleExecuteWCA}
            disabled={isLoading}
          >
            Execute WCA
          </Button>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item sm={3} />
            <Grid item sm={4}>
              Duration: {duration / 1000}s
            </Grid>
            <Grid item sm={5}>
              Solution: {solution?.getCost ?? ""}
            </Grid>
            <Grid item sm={12}>
              <RadioGroup
                sx={{ ml: "50%", display: "flex" }}
                style={{ transform: "translate(-50%, 0)" }}
                onChange={(e) => setDisplayPlot(e.target.value)}
              >
                <FormControlLabel
                  value="river"
                  control={<Radio />}
                  label="River Comparison"
                />
                <FormControlLabel
                  value="history"
                  control={<Radio />}
                  label="History View"
                />
                <FormControlLabel
                  value="dimension"
                  control={<Radio />}
                  label="All Dimensions"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Container>{" "}
        {displayPlot === "river" ? (
          <RiverVisualisation
            Nsr={WCAParams.Nsr}
            intensities={intensities}
            historyData={historyData}
          />
        ) : displayPlot === "history" ? (
          <HistoryVisualisation
            Nsr={WCAParams.Nsr}
            intensities={intensities}
            historyData={historyData}
          />
        ) : displayPlot === "dimension" ? (
          <DimensionsVisualisation
            Nsr={WCAParams.Nsr}
            LBs={problem.problem.getLB}
            UBs={problem.problem.getUB}
            Npop={WCAParams.Npop}
            intensities={intensities}
            historyData={historyData}
          />
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
}

export default ProblemByIdPage;
