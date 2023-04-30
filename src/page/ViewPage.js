import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavigationBar from "../component/NavigationBar";
import Card from "../component/Card";

const ViewPage = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
      const items = localStorage.getItem("items")
      const parsedItem = JSON.parse(items);
      if ( items !== null ){
          setItems(parsedItem)
      }
    }, []);
  return (
    <div className="container">
        <NavigationBar pageName="View Item"/>
        {items.length == 0 ?
          <h1>No item found</h1>
        :
          items.map((cardData) => (
              <Card key={cardData.sno} pr={cardData} toast={toast}/>
          ))
        }
        <i className="note">N.B: I could use Formik for form handling and Redux/Zustand for state management, but those would be overwhelming for this small app.</i>
        <ToastContainer/>
    </div>
  );
};

export default ViewPage;
