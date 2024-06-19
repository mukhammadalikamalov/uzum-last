import React, { useState } from "react";
import { Box, Container, CssBaseline, Grid, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import Caroucel from "./component/Layout/Caroucel";
import SearchAppBar from "./component/Layout/Header";
import BigImage from "./component/bigImage";
import ProductCard from "./component/productCard";
import Footer from "./utils/footer";

function Home() {
  const { data, isLoading, isError } = useQuery("goods", async () => {
    const res = await axios.get("http://localhost:3001/goods");
    return res.data;
  });

  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowMore = () => {
    setLoading(true);
    setTimeout(() => {
      setShowMore(true);
      setLoading(false);
    }, 2000); // Simulated loading time of 2 seconds
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const likedGoods = data.filter((good) => good.status === true);
  const saleGoods = data.filter((good) => good.isBlackFriday);

  const sortedGoods = [...likedGoods, ...saleGoods];

  const slicedGoods = sortedGoods.slice(0, 15);

  const Armchairs = data.filter((good) => good.type === "furniture");
  const PC = data.filter((good) => good.type === "PC");
  const TV = data.filter((good) => good.type === "TV");
  const Audio = data.filter((good) => good.type === "audio");
  const Kitchen = data.filter((good) => good.type === "kitchen");

  const sections = [
    { slider: "", type: "Armchairs", arr: Armchairs },
    { slider: "", type: "PC", arr: PC },
    { slider: "", type: "TV", arr: TV },
    { slider: "", type: "Audio", arr: Audio },
    { slider: "", type: "Kitchen", arr: Kitchen },
  ];

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }, // Responsive padding

          "@media (min-width:1920px)": {
            maxWidth: "1600px",
          },
          margin: "0 auto", // Center the container
        }}
      >
        <SearchAppBar />
        <Caroucel />
        <Box mb={4} sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {slicedGoods.map((good) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={good.id}>
                <ProductCard good={good} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* Add button above PC category */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowMore}
          sx={{
            width: '52%',
            height: '6vh',
            margin: '0 auto', // Center horizontally
            display: 'block', // Ensure block-level display for margin to take effect
            backgroundColor: '#f2f4f7',
            color: 'black',
            "&:hover": {
              backgroundColor: '#d3d3d3', // Lighter gray color on hover
            }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Yana ko'rsatish 20"}
        </Button>

        {showMore && (
          <>
            <Box mb={4} key={sections[1].type}>
              <Typography variant="h5" gutterBottom>
                {sections[1].type}
              </Typography>
              <Grid container spacing={2}>
                {sections[1].arr.map((good) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={`${good.id}_${good.type}`}>
                    <ProductCard good={good} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            {/* Render other sections */}
            {sections.slice(2).map((item, i) => (
              <Box mb={4} key={i}>
                <Typography variant="h5" gutterBottom>
                  {item.type}
                </Typography>
                <Grid container spacing={2}>
                  {item.arr.map((good) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={`${good.id}_${good.type}`}>
                      <ProductCard good={good} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
