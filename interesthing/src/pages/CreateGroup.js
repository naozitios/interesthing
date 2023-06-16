import { useRef, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const CreateGroup = () => {
  const DUMMY_SID = "G123456";

  const onFormSubmit = (e) => {
    e.preventDefault();
    const unique_id = uuid();

    const data = {
      Item: {
        Group_id: unique_id,
        category: category,
        description: description,
        group_leader: DUMMY_SID,
        group_name: name,
        img_s3_url: "fill_l8tr",
        joined: false,
      },
    };

    axios
      .put("http://localhost:8080/create-group", JSON.stringify(data), {
        // withCredentials: true,
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("Error:", err.response.data);
      });
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgData, setImgData] = useState("");

  const toast = useRef(null);

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);
    setSelectedImage(blob);

    reader.onloadend = function () {
      const base64data = reader.result;
      setImgData(reader.result);
    };
  };

  return (
    <div className="flex flex-column align-items-center ">
      <br />
      <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3x">
        Create New Interest Group
      </h1>
      <br />
      <div className="flex flex-column w-5 justify-content-center gap-3 field group">
        <div className="flex flex-column gap-1">
          <label htmlFor="username" className="mt-2 text-md text-gray-600">
            Interest Group Name *
          </label>
          <InputText
            id="groupname"
            aria-describedby="groupname-help"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label className="mt-2 text-md text-gray-600" htmlFor="username">
            Category *
          </label>

          <InputText
            id="groupname"
            aria-describedby="groupname-help"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="groupdesc" className="mt-2 text-md text-gray-600">
            Description *
          </label>
          <InputTextarea
            id="groupdesc"
            aria-describedby="groupdesc-help"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          {selectedImage && (
            <div>
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
            </div>
          )}
          <Toast ref={toast}></Toast>
          <FileUpload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            customUpload
            uploadHandler={customBase64Uploader}
            maxFileSize={1000000}
            auto
            chooseLabel="Choose Image"
          />
        </div>
      </div>
      <Button onClick={onFormSubmit} label={"Submit"} />
    </div>
  );
};

export default CreateGroup;
