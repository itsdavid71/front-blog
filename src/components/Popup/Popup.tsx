import React, { FC, FormEvent, ReactNode, useState } from "react";
import "./Popup.css";

type Props = {
  title: string | ReactNode;
  content: string | ReactNode;
  onCancel: (event: React.MouseEvent<HTMLElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  isShow: boolean;
  //   saveData: ({}) => void;
};

const Popup = (props: Props) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const newObject = {
      author: author,
      text: text,
      date: date ?? "",
      comments: [],
    };
    // props.saveData(newObject);
  };

  return (
    <div className={"popup-field" + (props.isShow ? "" : " hide")}>
      <div className="popup">
        <form onSubmit={onSubmitForm}>
          <header>
            <div className="title">{props.title}</div>
            {/* <div className="content">{props.content}</div> */}
          </header>
          <div className="form-comment">{props.content}</div>
          <footer>
            <button className="cancel" onClick={props.onCancel}>
              Закрыть
            </button>
            <button className="apply" onClick={props.onSubmit}>
              Принять
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Popup;
