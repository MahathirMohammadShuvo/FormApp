import React from "react";

import backgroundImage from "../images/blueBackground.jpg"
import NavigationBar from "../component/NavigationBar";
import Form from "../component/Form";

const CreatePage = () => {
  return (
    <div style={styles.container}>
        <NavigationBar pageName="Create Item"/>
        <Form/>
        <i className="note">N.B: I could use Formik for form handling and Redux/Zustand for state management, but those would be overwhelming for this small app.</i>
    </div>
  );
};

const styles = {
    container:{
        background: `url(${backgroundImage}) no-repeat center center fixed`,
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
  };

export default CreatePage;
