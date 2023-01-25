import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/layout";
import problems from "../__problems__";
import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();

  const _handleNavigateToProblem = (problem: number) => {
    navigate(`/problems/${problem}`);
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
            Water Cycyle Algorithm
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Der WCA ist eine Form der stochastischen Optimierung. Es werden
            zufällige Werte im möglichen Wertebereich erstellt und dann in einer
            iterativ kleiner werdenden Umgebung der besten gefundenen Lösung
            nach besseren Lösungen gesucht.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ pb: 8, pt: 4 }} maxWidth="md">
        <Typography variant="h4" align="center">
          Please choose a Problem
        </Typography>
        <Grid container spacing={4} sx={{ pt: 2 }}>
          {problems.map((problem, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => _handleNavigateToProblem(index)}
              >
                <CardMedia image={problem.img} sx={{ height: 150 }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {problem.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default IntroPage;
