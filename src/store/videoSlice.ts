import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../constants";

interface VideoState {
  videoData:
    | Array<{
        id: string;
        title: string;
        description: string;
        year: number;
        country: string;
        rating: number;
        genres: string[];
        actors: string[];
        imageUrl: string;
        videoUrl: string;
      }>
    | null
    | undefined;
}

const initialState: VideoState = {
  videoData: null,
};

export const createVideo = createAsyncThunk(
  "video/createVideo",
  async (videoData: any) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/videos`, videoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchVideoData = createAsyncThunk(
  "video/fetchVideoData",
  async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/videos`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoData: (
      state,
      action: PayloadAction<
        Array<{
          id: string;
          title: string;
          description: string;
          year: number;
          country: string;
          rating: number;
          genres: string[];
          actors: string[];
          imageUrl: string;
          videoUrl: string;
        }>
      >
    ) => {
      state.videoData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideoData.fulfilled, (state, action) => {
      state.videoData = action.payload;
    });
  },
});

export const { setVideoData } = videoSlice.actions;
export const selectVideoData = (state: { video: VideoState }) =>
  state.video.videoData;

export default videoSlice.reducer;
