import React, { useState, useEffect } from 'react';
import '../components//Modal.css'; // Import your custom CSS file
import axios from 'axios';
import FxButton from '../components/FxButton';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/"
});

function Modal(props) {
  const { show, onHide } = props;
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [user_id, setUser_id] = useState('');

  const handleTitleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get('/api/user');
        const { user_id } = response.data.user;
        setUser_id(user_id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    console.log(user_id);
    console.log(amount);
    console.log(content);

    try {
      const response = await client.post('api/income/create/',
        {
          amount: parseInt(amount, 10),
          content: content
        }
        );
      console.log('Note created:', response.data);
      setAmount('');
      setContent('');
      onHide();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

 

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
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={amount}
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
          <button className="modal-button" onClick={e =>handleSubmit(e)}>
            Save
          </button>
          <button className="modal-button" onClick={onHide}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


function IncomeAdd() {

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

export default IncomeAdd;
