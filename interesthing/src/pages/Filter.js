import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import axios from "axios";

const filters = [
  { value: "gaming", label: "Gaming" },
  { value: "music", label: "Music" },
  { value: "food", label: "Food" },
];

const groups = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const footer = (
  <div className="flex flex-wrap justify-content-end gap-2">
    <Button label="Join group" icon="pi pi-plus" className="p-button-success" />
  </div>
);

const Filter = () => {
  const fetchGroups = async () =>
    await axios.get(`http://127.0.0.1:5000/?hobby=${search}`);

  const { data, refetch } = useQuery("groupsData", fetchGroups, {
    refetchOnWindowFocus: false,
    enabled: false,
    initialData: [],
  });

  const [search, setSearch] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleSearchChanged = (e) => setSearch(e.target.value);

  const handleChecked = (e, option) => {
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, option.value]);
    } else {
      setSelectedOptions(
        selectedOptions.filter((item) => item !== option.value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  console.log(data);
  return (
    <div className="pt-10">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Groups
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Get recommended the best groups to join at J.P Morgan!
          </p>
        </div>
      </div>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 sm:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.name}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="pt-10">
          {/* Filters */}
          <section aria-labelledby="filter-heading">
            <div className="mx-auto max-w-7xl">
              <h2 id="filter-heading" className="sr-only">
                Filters
              </h2>

              <form
                className="border-b border-gray-200 bg-white pb-4"
                onSubmit={handleSubmit}
              >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                  <div className="bg-white">
                    <div className="mt-2 flex">
                      <label htmlFor="email-address" className="sr-only">
                        Search
                      </label>
                      <input
                        id="search"
                        type="text"
                        className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Search"
                        value={search}
                        onChange={handleSearchChanged}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flow-root">
                      <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                        <Popover
                          key={filters}
                          className="relative inline-block px-4 text-left"
                        >
                          <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            <span>Categories</span>

                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="space-y-4">
                                {filters.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter--${optionIdx}`}
                                      name={`filters`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      checked={selectedOptions.includes(
                                        option.value
                                      )}
                                      onChange={(e) => handleChecked(e, option)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter--${optionIdx}`}
                                      className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </Popover>
                      </Popover.Group>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* Product grid */}
          <section
            aria-labelledby="groups-heading"
            className="mx-auto max-w-2xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:max-w-7xl lg:px-8"
          >
            <h2 id="groups-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-center">
              {groups.map(({ title, description, leaders, imageUrl }) => (
                <div className="card flex justify-content-center">
                  <div className="flex-column">
                    <Card
                      title={title}
                      subTitle={
                        leaders?.length ? `Leaders: ${leaders?.join(", ")}` : ""
                      }
                      footer={footer}
                      header={
                        <img
                          alt="Card"
                          src={
                            imageUrl ??
                            "https://image.cnbcfm.com/api/v1/image/106560246-1591029813185copy-of-v_brand_promo_horizontal_offwhite.jpg?v=1672280691&w=1920&h=1080"
                          }
                          height="300vw"
                        />
                      }
                      className="md:w-30rem mt-3 mb-2"
                    >
                      <p className="m-0">{description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Filter;
