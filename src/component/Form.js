import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../style.css";

function Form({ nameP = "",  selectedOptionP = "select an option", isCheckedp = false, sno = -1, setState = ()=>{}, updateUi = ()=>{} }) {

    // name field
    const [name, setName] = useState(nameP);
    const [error, setError] = useState({name: false, sector: false});
    const handleName = (event) => {
        setName(event.target.value);
        if (event.target.value === ""){
            setError(prevError => ({...prevError, name: true}));
        }else{
            setError(prevError => ({...prevError, name: false}));
        }
    }

    // submit button
    const handleSubmit = () => {
        setError({name: false, sector: false});
        if (name === ""){
            setError(prevError => ({...prevError, name: true}));
        }
        if (selectedOption === "select an option"){
            setError(prevError => ({...prevError, sector: true}));
        }
        if(name !== "" && selectedOption !== "select an option"){
            
            // add data to local storage
            const items = localStorage.getItem("items")
            const parsedItem = JSON.parse(items);
            if ( items === null ){
                var sno = 0
            } else {
                var sno = parsedItem.length;
            }
            const item = {
                sno,
                name,
                selectedOption,
                isChecked
            }
            if ( items === null ){
                localStorage.setItem("items", JSON.stringify([item]))
            } else {
                localStorage.setItem("items", JSON.stringify([...parsedItem, item]))
            }

            // other things
            setName("");
            setSelectedOption("select an option");
            setIsChecked(false);
            toast.success("Item created!", { position: toast.POSITION.TOP_LEFT });
            document.getElementById("itemCount").innerHTML = ` (${sno+1})`;
        }
    };

    // update array
    function updateArr(newData, arr) {
        const updatedArr = arr.map(item => {
          if (item.sno === sno) {
            return { ...newData };
          }
          return item;
        });
        return updatedArr;
      }

    // save button
    async function saveData() {
        if (name === ""){
            setError({name: true});
        }else {

            // add data to local storage
            const parsedItem = JSON.parse(localStorage.getItem("items"));
            const item = { sno, name, selectedOption, isChecked }
            const updatedArr = updateArr(item, parsedItem)
            await localStorage.setItem("items", JSON.stringify(updatedArr))
            updateUi(item)
        }
    };

    // checkbox
    const [isChecked, setIsChecked] = useState(isCheckedp);

    // selectbox
    const [selectedOption, setSelectedOption] = useState(selectedOptionP);
    const [open, setOpen] = useState(false);
    const handleSelect = (fullOption, key) => {
        setSelectedOption(fullOption + `/${key}`);
        setError(prevError => ({...prevError, sector: false}));
        setOpen(false);
    }
    const SelectBox = () => {
        const data = {
            "Manufacturing": {
                "Construction materials": "",
                "Electronics and Optics": "",
                "Food and Beverage": {
                    "Bakery & confectionery products": "",
                    "Beverages": "",
                    "Fish & fish products": "",
                    "Meat & meat products": "",
                    "Milk & dairy products": "",
                    "Other": "",
                    "Sweets & snack food": ""
                },
                "Furniture": {
                    "Bathroom/sauna": "",
                    "Bedroom": "",
                    "Children’s room": "",
                    "Kitchen": "",
                    "Living room": "",
                    "Office": "",
                    "Other (Furniture)": "",
                    "Outdoor": "",
                    "Project furniture": ""
                },
                "Machinery": {
                    "Machinery components": "",
                    "Machinery equipment": "",
                    "Manufacture of machinery": "",
                    "Maritime": {
                        "Aluminium and steel workboats": "",
                        "Boat/Yacht building": "",
                        "Ship repair and conversion": "",
                        "Metal structures": "",
                        "Other": "",
                        "Repair and maintenance service": ""
                    },
                    "Metalworking" : {
                        "Construction of metal structures": "",
                        "Houses and buildings": "",
                        "Metal products": "",
                        "Metal works": {
                            "CNC-machining": "",
                            "Forgings, Fasteners": "",
                            "Gas, Plasma, Laser cutting": "",
                            "MIG, TIG, Aluminum welding": ""
                        }
                    },
                    "Plastic and Rubber": {
                        "Packaging": "",
                        "Plastic goods": "",
                        "Plastic processing technology": {
                            "Blowing": "",
                            "Moulding": "",
                            "Plastics welding and processing": ""
                        },
                        "Plastic profiles": ""
                    },
                    "Printing": {
                        "Advertising": "",
                        "Book/Periodicals printing": "",
                        "Labelling and packaging printing": "",
                        "Textile and Clothing": {
                            "Clothing": "",
                            "Textile": ""
                        },
                        "Wood": {
                            "Other (Wood)": "",
                            "Wooden building materials": "",
                            "Wooden houses": ""
                        }
                    }
                }
            },
            "Other": {
                "Creative industries": "",
                "Energy technology": "",
                "Environment": ""
            },
            "Service": {
                "Business services": "",
                "Engineering": "",
                "Information Technology and Telecommunications": {
                    "Data processing, Web portals, E-marketing": "",
                    "Programming, Consultancy": "",
                    "Software, Hardware": "",
                    "Telecommunications": ""
                },
                "Tourism": "",
                "Translation services": "",
                "Transport and Logistics": {
                    "Air": "",
                    "Rail": "",
                    "Road": "",
                    "Water": ""
                }
            }
        };
    
        const renderOptions = (options, marginLeft, fullOption) => {
            return Object.entries(options).map(([key, value]) => {
                if (typeof value === "object") {
                return (
                    <div key={key} style={{ marginLeft: marginLeft }}>
                        <b style={{ padding: 5}}>{key}</b>
                        {renderOptions(value, marginLeft+20, fullOption + "/" + key)}
                    </div>
                );
                } else {
                return (
                    <div key={key}  style={{ marginLeft: marginLeft }}>
                        <div style={{ padding: 5 }} className="selectOption" onClick={() => handleSelect(fullOption, key)}>{key}</div>
                    </div>
                );
                }
            });
        };
        return (
        <>
            <div className="selectDiv" onClick={() => setOpen(!open)}>
                {selectedOption}
                <svg fill="#555" width="25" height="25" viewBox="0 0 16 16" style={{ transform: `rotate(${open ? "0deg" : "270deg"})` }}>
                    <path
                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                    />
                </svg>
            </div>
            {open && (
                <div className="select">
                    {renderOptions(data, 0, "")}
                </div>
            )}
        </>
        );
    };

    // resized width
    const [width, setWidth] = useState("500px");
    useEffect(() => {
        if (window.innerWidth < 600) {
            setWidth("80%");
        } else {
            setWidth("500px");
        }
      const handleResize = () => {
        if (window.innerWidth < 600) {
          setWidth("80%");
        } else {
          setWidth("500px");
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <div style={{ width: width, padding: 20}} className="formDiv">
            <h4>Please enter your name and pick the Sectors you are currently involved in.</h4>
            <div className="form-group">

                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => handleName(event)}
                />
                {error.name && (
                    <div className="errorAlert">Error: Name is required!</div>
                )}
                
                <label style={{ marginTop:20 }} >Sectors:</label>
                <SelectBox/>
                {error.sector && (
                    <div className="errorAlert">Error: Sector is required!</div>
                )}
            
                <div className="checkbox-container">
                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    />
                    <span className="checkmark"></span>
                    <span style={{ marginLeft:25 }}>Agree to terms</span>
                </label>
                </div>


            </div>
            { sno === -1 ?
                <button type="submit" onClick={handleSubmit}>Create</button>
                :
                <div style={{ display:"flex", justifyContent: "space-between" }}>
                    <button type="cancel" style={{ backgroundColor:"red" }} onClick={() => setState("normal")}>Cancel</button>
                    <button type="save" onClick={saveData}>Save</button>
                </div>
            }
            <ToastContainer />
        </div>
    );
}

Form.propTypes = {
    name: PropTypes.string,
    selectedOption: PropTypes.string,
    buttonName: PropTypes.string,
    isChecked: PropTypes.bool,
}

export default Form;