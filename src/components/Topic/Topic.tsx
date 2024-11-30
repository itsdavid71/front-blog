import React, { useEffect, useState } from "react";
import "./Topic.css";
import Comment, { CommentType } from "../Comment/Comment";
import Popup from "../Popup/Popup";
import { Comment as TComment } from "../../pages/Topics/Topics";
import Utils from "../../utils/Utils";

export type TopicType = {
  id: number;
  author: string;
  currentAuthor: string;
  text: string;
  date?: string; // Если даты нет, то выводится текущая дата
  comments: TComment[];
  delete: (id: number) => void;
};

const Topic = (props: TopicType) => {
  const [isShowPopup, setIsShowPopup] = useState(false); // === Array

  const [comments, setComments] = useState<TComment[]>([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  let currentAuthor = props.author;

  useEffect(() => {
    setAuthor(props.author);
  }, [props.author]);
  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  const onClick = () => {
    setIsShowPopup(true);
  };
  const onCancel = () => {
    setIsShowPopup(false);
  };

  const onSaveData = () => {
    // alert(this);
  };

  console.log(props);
  const onSubmit = () => {
    const newId = Utils.getMaxId(comments) + 1;
    const newComment = {
      id: newId,
      author: props.currentAuthor,
      currentAuthor: props.currentAuthor,
      text: text,
      date: date,
      comments: [],
      topic: 1,
      parent: 1,
    };
    setComments([...comments, newComment]);
    setIsShowPopup(false);
    setText("");
    setDate("");
  };

  const deleteComment = (id: number) => {
    const newComment = [...comments];
    const index = newComment.findIndex((comment) => comment.id === id);
    newComment.splice(index, 1);
    setComments(newComment);
  };

  return (
    <div className="topic">
      <div className="body">
        <div className="author">{author}</div>
        <div className="text">{props.text}</div>
        <div className="date">{props.date}</div>
      </div>
      <button className="delete" onClick={() => props.delete(props.id)}>
        Удалить
      </button>
      <div className="comments">
        {comments.map((comment, index) => (
          <Comment
            {...comment}
            // author={props.author}
            key={`comment_${index}`}
            deleteComment={deleteComment}
          />
        ))}
      </div>
      <button className="add-comment" onClick={() => setIsShowPopup(true)}>
        Ответить
      </button>

      <Popup
        title="Добавить комемнтарий"
        content={
          <div>
            <label>
              <div>Автор</div>
              <input type="text" disabled value={props.currentAuthor} />
            </label>
            <label>
              <div>Текст</div>
              <input
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </label>
            <label>
              <div>Дата</div>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>
          </div>
        }
        onCancel={onCancel}
        onSubmit={onSubmit}
        isShow={isShowPopup}
        // saveData={onSaveData}
      />
    </div>
  );
};

export default Topic;
