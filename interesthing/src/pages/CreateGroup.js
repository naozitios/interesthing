import { useRef, useState } from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Chip } from "primereact/chip";
import { Chips } from "primereact/chips";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

/*
Group Name:
Other Group Leaders: [simple input -> on enter, just add to list of group leaders. should be deletable]
Group Description:
Group Photo: 
Category: [DROP DOWN]

*/

const CreateGroup = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentAdditionalLeader, setCurrentAdditionalLeader] = useState("");
  const [additionalLeaderList, setAdditionalLeaderList] = useState([]);
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

  const CATEGORIES = [
    { name: "Gaming" },
    { name: "Sport" },
    { name: "Music" },
    { name: "Art" },
    { name: "Tech" },
    { name: "Other" },
  ];

  /* const handleGroupLeadersKeyDown = (event) => {
    if (event.key === "Enter") {
      const add_sid = currentAdditionalLeader;
      let sid_list = [...additionalLeaderList];
      sid_list.push(event.target.value);
      setAdditionalLeaderList(sid_list);
      setCurrentAdditionalLeader("");
      console.log(values1);
    }
  };

  const handleGroupLeaderRemove = (event) => {
    console.log(event.target.label);
    let sid_list = [...additionalLeaderList];
    sid_list.filter(function(sid) { 
      return (sid !== event.target.value )
    })
    setAdditionalLeaderList(sid_list);
    console.log(sid_list);

     <InputText
            id="groupleaders"
            value={currentAdditionalLeader}
            aria-describedby="groupleaders-help"
            onChange={(e) => setCurrentAdditionalLeader(e.value)}
            onKeyDown={handleGroupLeadersKeyDown}
          />
  }; */

  const trialfun = (event) => {
    console.log(additionalLeaderList);
  };

  const imageUploadHandler = ({ files }) => {
    const [file] = files;
    const temp_url = URL.createObjectURL(file);
    console.log(temp_url);
    setImgSrc(temp_url);
  };

  return (
    <div className="home">
      <h1>Create New Interest Group</h1>
      <div className="flex flex-column gap-2">
        <Button onClick={trialfun} />
        <div className="">
          <label htmlFor="username">Interest Group Name *</label>
          <InputText
            id="groupname"
            aria-describedby="groupname-help"
            value={name}
            onChange={(e) => setName(e.value)}
          />
        </div>
        <div className="">
          <label htmlFor="groupdesc">Description *</label>
          <InputTextarea
            id="groupdesc"
            aria-describedby="groupdesc-help"
            value={description}
            onChange={(e) => setDescription(e.value)}
          />
        </div>

        <div className="">
          <div className="card">
            <label htmlFor="groupleaders">
              Additional Group Leaders (SID){" "}
            </label>
            <Chips
              value={additionalLeaderList}
              onChange={(e) => setAdditionalLeaderList(e.value)}
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="groupcategory">Category *</label>
          <Dropdown
            id="groupcategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.value)}
            options={CATEGORIES}
            optionLabel="name"
            placeholder="Select a Category"
            className="w-full md:w-14rem"
          />
        </div>
        <div className="card flex justify-content-center">
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
    </div>
  );
};

export default CreateGroup;
