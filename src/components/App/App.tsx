import React, { useState } from "react";
import "./App.css";
import Topics from "../../pages/Topics/Topics";
import Popup from "../Popup/Popup";

/*
Дома добавить const Topic = {props: TopicType[] }
const [topic, setTopic] = useState


*/

function App() {
  return (
    <div>
      <Topics />
    </div>
  );
}

export default App;
