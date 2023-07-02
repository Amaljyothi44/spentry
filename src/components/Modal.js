import React, { useState} from 'react';
import './Modal.css'; 
import axios from 'axios';
import FxButton from './FxButton';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/",

});

function Modal(props) {
  const { show, onHide } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };



 
  async function handleSubmit(e) {
    e.preventDefault();
    try {
  
      const response = await client.post(
        "api/notes/",
        {
          title: title,
          content: content
        }
      );
  
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-overlay" onClick={onHide}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Create Note</h2>

          <button className="modal-close" onClick={onHide}>
            &times;
          </button>

        </div>
        <form onSubmit={e =>handleSubmit(e)}>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter note title"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Enter note content"
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button" type="submit" >
            Save
          </button>
          <button className="modal-button" onClick={onHide}>
            Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}


function Modals() {

  const [modalShow, setModalShow] = useState(false);

  return (

    <>
      <div onClick={() => setModalShow(true)}>
        <FxButton />

      </div>
      {modalShow && <Modal show={modalShow} onHide={() => setModalShow(false)} />}
    </>
  );
}

export default Modals;
