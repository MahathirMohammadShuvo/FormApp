import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { ReactComponent as Edit } from '../images/edit.svg';
import { ReactComponent as Delete } from '../images/delete.svg';

import "../style.css";
import Form from "./Form";

function Card({pr, toast}) {
    
    // get data from local sotrage
    const items = localStorage.getItem("items")
    var parsedItem = JSON.parse(items);

    // delete item
    const [state, setState] = useState("normal");
    const [noData, setNoData] = useState(false);
    function deleteItem(sno){
        const updatedArr = parsedItem.filter(item => item.sno !== sno);
        localStorage.setItem("items", JSON.stringify(updatedArr));
        setState("delete");
        toast.error("Item deleted!", { position: toast.POSITION.TOP_LEFT });
        document.getElementById("itemCount").innerHTML = ` (${updatedArr.length})`;
        if(updatedArr.length === 0){
            setNoData(true)
        }
    }

    // update component
    const [props, setProps] = useState(pr);
    function updateUi(pr){
        setProps(pr)
        setState("normal")
        toast.info("Item updated!", { position: toast.POSITION.TOP_LEFT });
    }

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

    if (state == "normal"){
        return (
            <div className="cardDiv" style={{ width: width }}>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    <h2>ID: {props.sno}</h2>
                    <div>
                        <Edit width={40} height={40} style={{ cursor: "pointer", marginRight: 20 }} onClick={() => setState("edit")}/>
                        <Delete width={40} height={40} style={{ cursor: "pointer", }} onClick={() => deleteItem(props.sno)}/>
                    </div>
                </div>
                <p><b>Name: </b> {props.name}</p>
                <p><b>Sectors: </b> {props.selectedOption}</p>
                <p><b>Agreed: </b> {props.isChecked? "Yes": "No"}</p>
            </div>
        );
    } else if(state == "delete"){
        return (<>
            { noData &&
                <h1>No item found</h1>
            }
        </>)
    } else{
        return(
            <Form nameP={props.name} selectedOptionP={props.selectedOption} isCheckedp={props.isChecked} sno={props.sno} setState={setState} updateUi={updateUi}/>
        )
    }
}

Card.propTypes = {
    name: PropTypes.string,
    selectedOption: PropTypes.string,
    isChecked: PropTypes.bool,
}

export default Card;