import { useRef, useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

/*
group_id: ""
category: ""
description: ""
group_leader: ""
group_name: ""
img_s3_url: ""
*/

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [imgSrc, setImgSrc] = useState("");

  const toast = useRef(null);
  const onUpload = () => {
    console.log(toast);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const submitForm = (event) => {
    console.log(name);
    console.log(name, description, category, imgSrc);
  };

  const imageUploadHandler = ({ files }) => {
    const [file] = files;
    const temp_url = URL.createObjectURL(file);
    console.log(temp_url);
    setImgSrc(temp_url);
  };

  return (
    <div className="flex flex-column align-items-center">
      <h1>Create New Interest Group</h1>
      <div className="flex flex-column w-6 justify-content-center gap-3 field group">
        <div className="flex flex-column gap-1">
          <label htmlFor="username">Interest Group Name *</label>
          <InputText
            id="groupname"
            aria-describedby="groupname-help"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="username">Category *</label>
          <InputText
            id="groupname"
            aria-describedby="groupname-help"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="groupdesc">Description *</label>
          <InputTextarea
            id="groupdesc"
            aria-describedby="groupdesc-help"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-column gap-1">
          <Toast ref={toast}></Toast>
          <FileUpload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            onChange={(event) => {
              console.log(event.target);
            }}
            maxFileSize={1000000}
            onUpload={onUpload}
            customUpload={true}
            uploadHandler={imageUploadHandler}
          />
        </div>
      </div>
      <Button onClick={submitForm} label={"Submit"} />
    </div>
  );
};

export default CreateGroup;
