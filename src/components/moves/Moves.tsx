import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  MenuItem,
  SelectChangeEvent,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchVideoData } from "../../store/videoSlice";
import { IVideo } from "../../interface/interface";
import BasicModal from "../common/modal/Modal";

const Moves: FC = () => {
  const [data, setData] = useState<IVideo[]>([]);
  const [open, setOpen] = useState(false);
  const [videoData, setVideoData] = useState<IVideo>();
  const [sortBy, setSortBy] = useState<string>("year");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterYear, setFilterYear] = useState<number[]>([2010, 2022]);
  const [filterCountry, setFilterCountry] = useState<string>("");
  const [filterRating, setFilterRating] = useState<number[]>([1, 5]);
  const [filterGenre, setFilterGenre] = useState<string>("");
  const [filterActor, setFilterActor] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await dispatch(fetchVideoData());
      const fetchedData = response.payload;
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const seeVideo = (video: IVideo) => {
    setVideoData(video);
    setOpen(true);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);
  };

  const handleOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    setFilterYear(newValue as number[]);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setFilterRating(newValue as number[]);
  };

  const handleApplyFilters = () => {
    const filteredData = data.filter((video) => {
      const withinYearRange =
        video.year >= filterYear[0] && video.year <= filterYear[1];
      const countryMatch = filterCountry
        ? video.country.toLowerCase().includes(filterCountry.toLowerCase())
        : true;
      const withinRatingRange =
        video.rating >= filterRating[0] && video.rating <= filterRating[1];
      const genreMatch = filterGenre
        ? video.genres.includes(filterGenre)
        : true;
      const actorMatch = filterActor
        ? video.actors.includes(filterActor)
        : true;

      return (
        withinYearRange &&
        countryMatch &&
        withinRatingRange &&
        genreMatch &&
        actorMatch
      );
    });

    setData(filteredData);
  };

  const handleResetFilters = () => {
    setFilterYear([2010, 2022]);
    setFilterCountry("");
    setFilterRating([1, 5]);
    setFilterGenre("");
    setFilterActor("");
    fetchData();
  };

  const sortedData = data.slice().sort((a, b) => {
    if (sortBy === "year") {
      return sortOrder === "asc" ? a.year - b.year : b.year - a.year;
    } else if (sortBy === "rating") {
      return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });
  return (
    <Container sx={{ marginTop: "32px" }}>
      <Box>
        <Typography>Sort By:</Typography>
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="year">Year</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
        <Button variant="outlined" onClick={handleOrderChange}>
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>
      </Box>
      <Box>
        <Typography>Filters:</Typography>
        <TextField
          label="Country"
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
        />
        <Typography>Year</Typography>
        <Slider
          value={filterYear}
          onChange={handleYearChange}
          valueLabelDisplay="auto"
          min={2010}
          max={2022}
          step={1}
        />
        <Typography>Rating</Typography>
        <Slider
          value={filterRating}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={1}
          max={5}
          step={0.1}
        />
        <TextField
          label="Genre"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        />
        <TextField
          label="Actor"
          value={filterActor}
          onChange={(e) => setFilterActor(e.target.value)}
        />
        <Button variant="outlined" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </Box>
      <Grid container spacing={2}>
        {sortedData.map((video: IVideo) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card
              sx={{ maxWidth: 345, minHeight: 400 }}
              onClick={() => seeVideo(video)}
            >
              <CardMedia
                sx={{ height: 200 }}
                image={video.imageUrl}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ marginTop: "auto", height: "100%", flexDirection: "" }}
              >
                <Button size="small" variant="contained">
                  Watch
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {open ? (
        <BasicModal video={videoData} setOpen={setOpen} open={open} />
      ) : null}
    </Container>
  );
};

export default Moves;
