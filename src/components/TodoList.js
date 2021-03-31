import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from 'react-date-picker';


const TodoList = () => {
  const [key, setKey] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [colour, setColour] = useState("");
  const [editable, setEditable] = useState(false);
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [completed, setCompleted] = useState("");
  const [indexoflist, setIndexoflist] = useState(0);
  const [indexInData, setIndexInData] = useState(0);
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(new Date());


  const toggle = () => {
    setModal(!modal);
  };

  const handleChangeFilter = (e) => {
    e.target.value && e.target.value != "All"
      ? setList(
        data.filter(
          (data) =>
            data.priority
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            data.colour
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            data.content.toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
      : setList(data);
  };

  const updateItem = (e) => {
    setModal(true);
    setKey(e.key);
    setContent(e.content);
    setPriority(e.priority);
    setColour(e.colour);
    setKey(e.date);
    setEditable(true);

    var array = [...list];
    var array2 = [...data];
    var index = array.indexOf(e);
    setIndexoflist(index);

    var index2 = array2.indexOf(e);
    setIndexInData(index2);
  };

  const completeItem = (e) => {
    var array = [...list];
    var index = array.indexOf(e);

    var item = {
      key: e.key,
      content: e.content,
      priority: e.priority,
      colour: e.colour,
      date: e.date,
      isCompleted: true,
    };

    if (index !== -1) {
      array.splice(index, 1);
      array.push(item);
      setList(array);
      setData(array);
    }
  };

  const unCompleteItem = (e) => {
    var array = [...list];
    var index = array.indexOf(e);

    var item = {
      key: e.key,
      content: e.content,
      priority: e.priority,
      colour: e.colour,
      date: e.date,
      isCompleted: false,
    };

    if (index !== -1) {
      array.splice(index, 1);
      array.push(item);
      setList(array);
      setData(array);
    }
  };

  const removeItem = (e) => {
    var array = [...list];
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setList(array);
      setData(array);
    }
  };

  const handleSubmit = () => {
    if (editable && key != null) {
      var item = {
        key: key,
        content: content,
        priority: priority,
        colour: colour,
        date: date,
        isCompleted: false,
      };

      if (item.content == null || item.content == "") {
        toast.error("Todo content cannot be null!");
      }

      if (item.content != null && item.content != "") {
        list[indexoflist] = item;
        data[indexInData] = item;
        toast.success("Updated!");

        setColour("");
        setContent("");
        setPriority("");
        setEditable(false);
        setDate(new Date());
      }
    } else {
      var item = {
        key: Date.now(),
        content: content,
        priority: priority,
        colour: colour,
        date: date,
        isCompleted: false,
      };

      if (item.content == null || item.content == "") {
        toast.error("Todo content cannot be null!");
      }

      if (item.content != null && item.content != "") {
        list.push(item);
        toast.success("Added!");

        setColour("");
        setContent("");
        setPriority("");
        setDate(new Date());
        setData(list);
      }

      console.log(list);
    }
  };

  let btn_class_high =
    priority == "High" ? "btn btn-danger" : "btn btn-secondary";
  let btn_class_medium =
    priority == "Medium" ? "btn btn-success" : "btn btn-secondary";
  let btn_class_low =
    priority == "Low" ? "btn btn-warning" : "btn btn-secondary";

  useEffect(() => {

    if (completed == "completed") {
      setList(data.filter((data) => data.isCompleted === true));
    } else if (completed == "pending") {
      setList(data.filter((data) => data.isCompleted === false));
    } else {
      setList(data);
    }
  }, [completed]);

  useEffect(() => {
    console.log(value);

    if (value) {
      setList(data.filter((data) => data.key === value));
    }

    else {
      setList(data)
    }
  }, [value]);


  return (
    <div className="container-fluid p-3">
      <div className="container-fluid p-5 bg-dark text-white">
        <h2>Todo Manager</h2>

        <div className="row mt-3">
          <div className="col-10">
            <input
              className="search_input"
              type="text"
              placeholder="Search...."
              onChange={handleChangeFilter}
            />
          </div>

          <div className="col-2">
            <button
              className="btn btn-info"
              style={{ width: "100%", height: "50px" }}
              onClick={() => setModal(true)}
            >
              Add New
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div style={{ background: "grey", height: "55px" }} className="row p-2">
          <div className="col-1">
            <p
              style={{
                background: "#dddddd",
                height: "38px",
                "padding-left": "12px",
                "padding-top": "6px",
                "font-weight": "bold",
                "font-size": "18px",
                color:"hsl(0,0%,35%)"
              }}
            >
              Filter by
            </p>
          </div>

          <div className="col-2">
            <select className="form-control" onChange={handleChangeFilter}>
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="col-2">
            <select className="form-control" onChange={handleChangeFilter}>
              <option value="All">All</option>
              <option value="#00bfff">Blue</option>
              <option value="#ee82ee">Purple</option>
              <option value="#fd79a8">Pink</option>
              <option value="#fdcb6e">Yellow</option>
            </select>
          </div>

          <div className="col-5">
            <button
              type="button"
              style={{ width: "30%" }}
              className="btn btn-success"
              onClick={(event) => {
                setCompleted(event.target.value);
              }}
              value="completed"
            >
              Completed
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              style={{ width: "30%" }}
              className="btn btn-danger"
              onClick={(event) => {
                setCompleted(event.target.value);
              }}
              value="pending"
            >
              Pending
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              style={{ width: "30%" }}
              className="btn btn-info"
              onClick={(event) => {
                setCompleted(event.target.value);
              }}
              value="All"
            >
              All
            </button>
          </div>
          <div className="col-2" style={{ background: "#dddddd", height: "38px", width: "100%", "border-radius": "5px" }}>
            <DatePicker
              onChange={onChange}
              value={value} />
          </div>
        </div>
      </div>
      <div className="todo-list-container">
        {list.length > 0
          ? list.map((e) =>
            e !== null ? (
              <div>
                <div className="row">
                  <div className="col-11">
                  </div>
                  <div className="col-1">
                    <b style={{color:"GrayText"}}>{e.date.getUTCDay()}/{e.date.getUTCMonth()}/{e.date.getUTCFullYear()}</b>
                  </div>
                </div>
                <div
                  className="row m-3 p-3"
                  key={e.key}
                  style={{ background: `${e.colour}` }}
                >
                  <div className="col-1">
                    {e.priority == "High" ? <b style={{ color: "#dc3545" }}>{e.priority}</b> : e.priority == "Medium" ? <b style={{ color: " #28a745" }}>{e.priority}</b> : e.priority == "Low" ? <b style={{ color: "#ffd700" }}>{e.priority}</b> : null}
                  </div>
                  <div className="col-9">
                    <b style={{ color: "#44504d" }}>{e.isCompleted ? <strike>{e.content}</strike> : e.content}</b>
                  </div>
                  <div className="col-2">
                    <i
                      title="complete task"
                      className="fa fa-check-circle fa-lg"
                      style={{"color":"green"}}
                      onClick={() => {
                        completeItem(e);
                      }}
                    ></i>
                    &nbsp;&nbsp;
                    {e.isCompleted ? (
                      <i
                        title="uncomplete task"
                        className="fa fa-minus-circle fa-lg"
                        style={{"color":"light-blue"}}
                        onClick={() => {
                          unCompleteItem(e);
                        }}
                      ></i>
                    ) : null}
                    &nbsp;&nbsp;
                    <i
                      title="update task"
                      className="fa fa-edit fa-lg"
                      style={{"color":"orange"}}
                      onClick={() => updateItem(e)}
                    ></i>
                    &nbsp;&nbsp;
                    <i
                      title="remove task"
                      className="fa fa-trash fa-lg"
                      style={{"color":"grey"}}
                      onClick={() => {
                        removeItem(e);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            ) : null
          )
          : <p style={{ "margin-left": "650px" }}>No todos Yet !!</p>}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Todo</ModalHeader>
        <ModalBody>
          <form>
            <div style={{ float: "right" }}>
              <DatePicker
                onChange={setDate}
                value={date} />
            </div>

            <div className="form-group">
              <textarea
                rows="5"
                className="form-control"
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
                value={content}
              ></textarea>
            </div>

            <div class="row">
              <div class="col">
                <button
                  type="button"
                  className={btn_class_high}
                  onClick={(event) => {
                    setPriority(event.target.value);
                  }}
                  value="High"
                >
                  High
                </button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className={btn_class_medium}
                  onClick={(event) => {
                    setPriority(event.target.value);
                  }}
                  value="Medium"
                >
                  Medium
                </button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className={btn_class_low}
                  onClick={(event) => {
                    setPriority(event.target.value);
                  }}
                  value="Low"
                >
                  Low
                </button>
              </div>

              <div className="col">
                <select
                  className="form-control"
                  style={{ float: "right" }}
                  onChange={(event) => {
                    setColour(event.target.value);
                  }}
                  value={colour}
                >
                  <option value="select">select</option>
                  <option value="#00bfff">Blue</option>
                  <option value="#ee82ee">Purple</option>
                  <option value="#fd79a8">Pink</option>
                  <option value="#fdcb6e">Yellow</option>
                </select>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            style={{ width: "500px" }}
            color="primary"
            onClick={toggle}
            onClick={handleSubmit}
          >
            {editable ? "Update" : "Add"}
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TodoList;
