import React, { FC, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { adminPageStyle } from "./style";
import { useDispatch } from "react-redux";
import { createVideo } from "../../store/videoSlice";
import { AppDispatch } from "../../store/store";
import InputField from "../common/inputField/InputField";
import NfButton from "../common/button/NfButton";

const { boxStyles, containerStyles } = adminPageStyle;

const Admin: FC = () => {
  const [video, setVideo] = useState<any>({
    title: "",
    description: "",
    year: 0,
    country: "",
    rating: 0,
    genres: [],
    actors: [],
    imageUrl: "",
    videoUrl: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (value: string | number, name: string) => {
    if (typeof value === "string" && value.includes(",")) {
      const arrayValues = value.split(",").map((item) => item.trim());
      setVideo((prevVideo: any) => ({ ...prevVideo, [name]: arrayValues }));
    } else {
      setVideo((prevVideo: any) => ({ ...prevVideo, [name]: value }));
    }
  };

  const onCreate = async () => {
    try {
      await dispatch(createVideo(video));
      setVideo({
        title: "",
        description: "",
        year: 0,
        country: "",
        rating: 0,
        genres: [],
        actors: [],
        imageUrl: "",
        videoUrl: "",
      });
    } catch (error) {
      console.error("Error creating video:", error);
    }
  };

  const renderInputField = (label: string, name: string, type: string) => (
    <>
      <Typography variant="h5">{label}</Typography>
      <InputField
        value={video[name]}
        handleChange={(value) => handleChange(value, name)}
        type={type}
        name={name}
      />
    </>
  );

  return (
    <Container {...containerStyles}>
      <Box
        style={{ background: "#f2f2f2", borderRadius: "32px" }}
        {...boxStyles}
      >
        <Typography variant="h3">ADD VIDEO</Typography>

        {renderInputField("Enter title", "title", "text")}
        {renderInputField("Enter description", "description", "text")}
        {renderInputField("Enter year", "year", "number")}
        {renderInputField("Enter country", "country", "text")}
        {renderInputField("Enter rating", "rating", "number")}
        {renderInputField("Enter genres", "genres", "text")}
        {renderInputField("Enter actors", "actors", "text")}
        {renderInputField("Enter image URL", "imageUrl", "text")}
        {renderInputField("Enter video URL", "videoUrl", "text")}

        <NfButton
          onClick={onCreate}
          title="Save new Video"
          variant="contained"
          fullWidth={true}
        />
      </Box>
    </Container>
  );
};

export default Admin;
