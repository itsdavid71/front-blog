import React, { FormEvent, useEffect, useRef, useState } from "react";
import TopicComponent, { TopicType } from "../../components/Topic/Topic";
import "./Topics.css";
import FormComment from "../../components/FormComment/FormComment";
import Popup from "../../components/Popup/Popup";
import Utils from "../../utils/Utils";

export type Comment = {
  id: number;
  topic: number;
  parent?: number;
  author: string;
  text: string;
  date: string;
  comments: Comment[];
  currentAuthor: string;
};

export type Topic = {
  id: number;
  author: string;
  text: string;
  date: string;
  comments: Comment[];
  currentAuthor: string;
};

const Topics = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");

  const [currentAuthor, setCurrentAuthor] = useState("");
  useEffect(() => {
    setCurrentAuthor(`${name} ${surname} ${patronymic}`);
  }, [name, surname, patronymic]);

  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      author: "Some author 1",
      text: "Some txetx",
      date: "1231321",
      comments: [],
      currentAuthor: "",
    },
    {
      id: 2,
      author: "Some author 2",
      text: "Some txetx",
      date: "",
      currentAuthor: "",
      comments: [
        {
          id: 3,
          topic: 1,
          parent: 2,
          author: "автор коммента",
          text: "фывввффвввфвв",
          date: "",
          currentAuthor: "",
          comments: [],
        },
      ],
    },
  ]);

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);

  // const currentTopics = topics;
  const addTopic = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newId = Utils.getMaxId(topics) + 1;
    const newTopic = {
      id: newId,
      author: currentAuthor,
      currentAuthor: currentAuthor,
      text: text,
      date: date,
      comments: [],
    };

    console.log(topics);
    const newTopics = [...topics, newTopic];
    setTopics(newTopics);
  };

  const addAuthorData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newAuthor = {
      name: name,
      surname: surname,
      patronymic: patronymic,
    };
  };

  const deleteTopic = (id: number) => {
    const newTopics = [...topics];
    const index = newTopics.findIndex((topic) => topic.id === id);
    newTopics.splice(index, 1);
    setTopics(newTopics);

    // const newTopics = [];
    // for (const topic of topics) {
    //   if (topic.id !== id) {
    //     newTopics.push({ ...topic });
    //   }
    // }
    // setTopics(newTopics);
  };

  return (
    <main>
      <section className="topic-items">
        <div className="form-comment">
          <p>
            {surname} {name} {patronymic}
          </p>
          <form onSubmit={addAuthorData}>
            <label>
              <span>Укажите имя</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label>
              <span>Укажите фамилию</span>
              <input
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </label>
            <label>
              <span>Укажите отчество</span>
              <input
                type="text"
                value={patronymic}
                onChange={(event) => setPatronymic(event.target.value)}
              />
            </label>
            <button>Сохранить</button>
          </form>
        </div>
        {topics.map((topic, index) => (
          <TopicComponent
            {...topic}
            currentAuthor={currentAuthor}
            key={`topic_${index}`}
            delete={deleteTopic}
          />
        ))}
        {/* <button onClick={addTopic}>Добавить топик</button> */}
        <FormComment />
        <div className="form-comment">
          <form onSubmit={addTopic}>
            <label>
              <span>Автор</span>
              <input
                type="text"
                disabled
                value={`${surname} ${name} ${patronymic}`}
                // onChange={(event) => setCurrentAuthor(event.target.value)}
              />
            </label>
            <label>
              <span>Текст</span>
              <textarea
                onChange={(event) => setText(event.target.value)}
                value={text}
                name="comment"
                placeholder="Введите коментарий"
              ></textarea>
            </label>
            <label>
              <span>Дата</span>
              <input type="date" ref={dateRef} />
            </label>

            <button>Отправить</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Topics;
