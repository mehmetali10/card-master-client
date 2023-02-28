import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Fab from '@mui/material/Fab';


export default function CreateCard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const selectedImage = URL.createObjectURL(event.target.files[0]);
        setImage(selectedImage);
        console.log(image);
      }
    };
    const handleClick = () => {
      const input = document.getElementById("upload-input");
      input?.click();
    };

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
        console.log(title)
    }

    function handleDescriptionChange(e: React.FormEvent<HTMLTextAreaElement>) {
        setDescription(e.currentTarget.value)
    }


    return(
        <div>
        <form className="create-note">
            <input
              name="title"
              onChange={handleTitleChange}
              value={title}
              placeholder="Title"
            />
  
          <textarea
            name="content"
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Description"
            rows={9}
          />

        <div className="image-upload">
              {image ? (
                <img
                  src={image}
                  alt="uploaded"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div onClick={handleClick} className="upload-label">
                <FileUploadIcon className="upload-icon" fontSize="large"/>
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
           <Fab >
            <AddIcon />
          </Fab>
        </form>
      </div>
    )
}