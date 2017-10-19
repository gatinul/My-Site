import React from "react";
import MarkEditPart from "../components/MarkEditor.js";
import api from "../../api/index.js";


class Home extends React.Component {
  render() {
    return (
      <div>
        <MarkEditPart/>
      </div>
    );
  }
}

export default Home;
