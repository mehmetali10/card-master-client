import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Fab from '@mui/material/Fab';
import { ref, uploadBytes} from "firebase/storage";
import { storage } from "../services/firebase/firebaseConfig";
import HttpService from "../services/httpClientService/httpService";
import CardService from "../services/httpClientService/httpCardService/httpCardService";
import { ICard } from "../models/ICard";
import { v4 } from "uuid";

interface ChildProps {
  onChildClick: () => void;
}

export default function CreateCard(props: ChildProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUpload, setImageUpload] = useState<string | null>(null);
    const [isExpanded, setExpanded] = useState<boolean>(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const selectedImage = URL.createObjectURL(event.target.files[0]);
        setImageUpload(selectedImage);
        setSelectedFile(event.target.files[0]);
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
      if(title && title.trim() && description && description.trim() && imageUpload && imageUpload.trim()){
        const card: ICard = {
          id: 0, title: title, description: description, imgUri: imageUpload, dateCreated: new Date(), isStarred: false,
        }

        const imageConcanitation = v4() + selectedFile?.name;
        const storageRef = ref(storage, `images/${imageConcanitation}`);
        card.imgUri = imageConcanitation;
        
        uploadBytes(storageRef, await fileToBlob(selectedFile)).then((snapshot) => {})


        const httpService = new HttpService("http://localhost:8000")
        const cardService = new CardService(httpService)
        const addedCard = await cardService.addCard(card)
        if(addedCard) {
          alert("Card saved successfully")
        }

        setTitle("");
        setDescription("");
        setImageUpload("");
        setExpanded(false);
        props.onChildClick();
      }else {
        alert("Please fill all the inputs")
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
          {imageUpload ? (
            <img
              src={imageUpload}
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

function fileToBlob(file: File | null): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("File is null or undefined."));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([new Uint8Array(reader.result)], {
          type: file.type
        });
        resolve(blob);
      } else {
        reject(new Error("Could not convert file to Blob."));
      }
    };
    reader.readAsArrayBuffer(file);
  });
}
