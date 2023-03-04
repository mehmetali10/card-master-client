import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Fab from '@mui/material/Fab';
import HttpService from "../services/httpClientService/httpService";
import CardService from "../services/httpClientService/httpCardService/httpCardService";
import { ICard } from "../models/ICard";


export default function CreateCard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isExpanded, setExpanded] = useState<boolean>(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const selectedImage = URL.createObjectURL(event.target.files[0]);
        setImage(selectedImage);
      }
    };

    const handleClick = () => {
      const input = document.getElementById("upload-input");
      input?.click();
    };

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e: React.FormEvent<HTMLTextAreaElement>) {
        setDescription(e.currentTarget.value)
    }

    function expand() {
      setExpanded(true);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if(title && title.trim() && description && description.trim() && image && image.trim()){
        const httpService = new HttpService("http://localhost:8000")
        const cardService = new CardService(httpService)
        const card: ICard = {title: title, description: description, imgUri: image, dateCreated: new Date(), isStarred:false}
        const addedCard = await cardService.addCard(card)
        if(addedCard) {
          alert("bravo koçum")
        }

        setTitle("");
        setDescription("");
        setImage("");
        setExpanded(false);
      }
      
    }


    return(
        <div>
        <form className="create-note" onSubmit={handleSubmit}>
          {isExpanded && (
            <input
              name="title"
              onChange={handleTitleChange}
              value={title}
              placeholder="Title"
            />
          )}
          <textarea
            name="content"
            onChange={handleDescriptionChange}
            value={description}
            placeholder= {isExpanded ? "Description" : "Generate a card..."}
            rows={isExpanded ? 9 : 1}
            onClick={expand}
          />
        {isExpanded && (
          <div className="image-upload">
          {image ? (
            <img
              src={image}
              alt="uploaded"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div onClick={handleClick} className="icon-wrapper">
            <FileUploadIcon fontSize="large"/>
          </div>
        )}
        <input
          id="upload-input"
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />
        </div>
        )}
        {isExpanded && (
          <Fab type="submit">
            <AddIcon />
          </Fab>
        )}
        </form>
      </div>
    )
}