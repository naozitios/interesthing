import { useState } from "react";
import { MegaMenu } from "primereact/megamenu";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

const FilterTab = () => {
  const [search, setSearch] = useState("");
  //key: category string, value: checked boolean
  const [filters, setFilters] = useState({});
  const [checked, setChecked] = useState(false);

  const onCheckboxClicked = () => {};

  const items = [
    {
      label: "Filter",
      icon: "pi pi-fw pi-home",
      items: [
        [
          {
            label: "Search",
            items: [
              {
                template: () => (
                  <div className="p-inputgroup">
                    <InputText
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-search"></i>
                    </span>
                  </div>
                ),
              },
            ],
          },
          {
            label: "Categories",
            items: [
              {
                label: "Gaming",
                template: ({ label }, options) => (
                  <div className="p-d-flex p-ai-left">
                    <Checkbox
                      inputId="cb1"
                      checked={checked}
                      onChange={(e) => setChecked(e.checked)}
                    />
                    <label htmlFor="cb1" className="p-checkbox-label p-ml-2">
                      {label}
                    </label>
                  </div>
                ),
              },
              {
                label: "Music",
                template: ({ label }) => (
                  <div className="p-d-flex p-ai-left">
                    <Checkbox
                      inputId="cb2"
                      checked={checked}
                      onChange={(e) => setChecked(e.checked)}
                    />
                    <label htmlFor="cb1" className="p-checkbox-label p-ml-2">
                      {label}
                    </label>
                  </div>
                ),
              },
              {
                label: "Food",
                template: ({ label }) => (
                  <div className="p-d-flex p-ai-center">
                    <Checkbox
                      inputId="cb1"
                      checked={checked}
                      onChange={(e) => setChecked(e.checked)}
                    />
                    <label htmlFor="cb1" className="p-checkbox-label p-ml-2">
                      {label}
                    </label>
                  </div>
                ),
              },
            ],
          },
        ],
      ],
    },
  ];
  return <MegaMenu model={items} breakpoint="960px" />;
};

export default FilterTab;
