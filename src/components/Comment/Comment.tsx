import React, { useEffect, useState } from "react";
import Popup from "../../components/Popup/Popup";
import { Comment as TComment } from "../../pages/Topics/Topics";
import Utils from "../../utils/Utils";

export type CommentType = {
  id: number;
  topic: number;
  parent?: number;
  author: string;
  text: string;
  currentAuthor: string;
  date: string;
  comments?: TComment[];
  deleteComment: (id: number) => void;
};

const Comment = (props: CommentType) => {
  const [isShowComments, setIsShowComments] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false); // === Array

  const onClick = () => {
    setIsShowPopup(true);
  };
  const onToggleShowComments = () => {
    setIsShowComments(!isShowComments);
  };

  const [comments, setComments] = useState<TComment[]>([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setComments(props?.comments ?? []);
  }, [props.comments]);

  // useEffect(() => {
  //   setAuthor(props.currentAuthor ?? "");
  // }, [props.currentAuthor]);

  const onSubmit = () => {
    const newId = Utils.getMaxId(comments) + 1;
    const newComment = {
      author: props.currentAuthor,
      currentAuthor: props.currentAuthor,
      text: text,
      date: date,
      comments: [],
      id: newId,
      topic: 1,
      parent: 1,
    };

    setComments([...comments, newComment]);
    setIsShowPopup(false);
    // setAuthor("");
    setText("");
    setDate("");
  };

  //   const onSaveData = (comment: any) => {
  //     const newComment = [
  //       {
  //         author: "123",
  //       },
  //     ];
  //     // const newComments = [...props.comments, newComment];
  //     // setComments(newComments);
  //     // props.comments;
  //   };

  const deleteCommentComment = (id: number) => {
    const newComment = [...comments];
    const index = newComment.findIndex((comment) => comment.id === id);
    newComment.splice(index, 1);
    setComments(newComment);
  };

  return (
    <div className="comment">
      {/* <Popup
        title="😈"
        onCancel={onCancel}
        onSubmit={onCancel}
        isShow={isShowPopup}
        content={undefined}
      /> */}
      <div className="body">
        <div className="author">{props.author}</div>
        <div className="text">{props.text}</div>
        <div className="date">{props.date}</div>
        <button className="add-comment" onClick={onClick}>
          Ответить
        </button>
        <button
          className="delete"
          onClick={() => props.deleteComment(props.id)}
        >
          Удалить
        </button>
        {/* <button className="hide-comments" onClick={onToggleShowComments}>
          {isShowComments ? "+" : "-"}
        </button> */}
        {comments?.length && comments?.length > 0 ? (
          <button className="hide-comments" onClick={onToggleShowComments}>
            {isShowComments ? "+" : "-"}
          </button>
        ) : null}
      </div>
      {isShowComments && comments?.length && comments?.length > 0 ? (
        <div className="comments">
          {comments?.map((comment, index) => (
            <Comment
              {...comment}
              key={`comment_${index}`}
              deleteComment={deleteCommentComment}
            />
          ))}
        </div>
      ) : null}
      <Popup
        title="Добавить комментарий"
        content={
          <div>
            <label>
              <div>Автор</div>
              <input
                type="text"
                value={props.currentAuthor}
                disabled
                // onChange={(event) => setAuthor(event.target.value)}
              />
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
        onCancel={() => setIsShowPopup(false)}
        onSubmit={onSubmit}
        isShow={isShowPopup}
        // saveData={onSaveData}
      />
    </div>
  );
};

export default Comment;
