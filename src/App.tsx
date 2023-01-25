import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import IntroPage from "./pages/intro";
import ProblemByIdPage from "./pages/problems/[problemId]";
import Layout from "./components/layout";

export default function App() {
  /*   const [problem] = useState<Problem>(A2Problem);
  const [wcaSolver] = useState<WCASolver>(new WCASolver(problem));
  const [solving, setSoving] = useState(true);

  const [parameters, setParameters] = useState({
    iterations: 1000,
    Nsr: 8,
    Npop: 50,
    dMax: 0.01,
  });

  useEffect(() => {
    if (!solving) return;
    wcaSolver.solve(
      parameters.Nsr,
      parameters.dMax,
      parameters.Npop,
      parameters.iterations,
    );
    setSoving(false);
  }, [solving, parameters, wcaSolver]);

  const _handleParametersChange = (fieldname: string, value: number) => {
    setParameters((state) => ({ ...state, [fieldname]: value }));
  };

  const _handleSolveProblem = () => {
    setSoving(true);
  };

  return (
    <div>
      <span>
        WCA Solver <br></br>
        Iterations
        <input
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            _handleParametersChange("iterations", Number(e.target.value))
          }
          value={parameters.iterations}
        />
        <br></br>
        Nsr{" "}
        <input
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            _handleParametersChange("Nsr", Number(e.target.value))
          }
          value={parameters.Nsr}
        />
        <br></br>
        Npop{" "}
        <input
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            _handleParametersChange("Npop", Number(e.target.value))
          }
          value={parameters.Npop}
        />
        <br></br>
        dMax{" "}
        <input
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            _handleParametersChange("dMax", Number(e.target.value))
          }
          value={parameters.dMax}
        />
        <br></br>
        <button onClick={_handleSolveProblem}>update Solution</button>
        <br></br>
        <br></br>
      </span>
      <RiverVisualisation wcaSolver={wcaSolver} Nsr={parameters.Nsr} />
      <HistoryVisualisation wcaSolver={wcaSolver} Nsr={parameters.Nsr} />
      <DimensionsVisualisation
        wcaSolver={wcaSolver}
        Nsr={parameters.Nsr}
        Npop={parameters.Npop}
        LBs={problem.getLB}
        UBs={problem.getUB}
      />
    </div>
  ); */

  const router = createBrowserRouter([
    {
      path: "/",
      element: <IntroPage />,
    },
    {
      path: "problems/:problemId",
      element: <ProblemByIdPage />,
    },
  ]);

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}
