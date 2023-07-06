import React, { useState} from 'react';
import '../components/Modal.css'; 
import axios from 'axios';
import FxButton from '../components/FxButton';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/",

});

function Modal(props) {
  const { show, onHide, addExpense } = props;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setAmount(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await client.post(
        "api/expense/",
        {
          title: title,
          amount: amount
        }
      );

      addExpense(response.data); 
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-overlay" onClick={onHide}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Income</h2>

          <button className="modal-close" onClick={onHide}>
            &times;
          </button>

        </div>
        <form onSubmit={e =>handleSubmit(e)}>
        <div className="modal-body">
          <div className="form-group">
            {/* <label htmlFor="title">Note</label> */}
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Note"
              className="form-control"
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="content">amount</label> */}
            <textarea
              id="amount"
              value={amount}
              onChange={handleContentChange}
              placeholder="amount"
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


function Modals(props) {

  const [modalShow, setModalShow] = useState(false);

  return (

    <>
      <div onClick={() => setModalShow(true)}>
        <FxButton />

      </div>
      {modalShow && <Modal show={modalShow} onHide={() => setModalShow(false)} addExpense={props.addExpense} />}
    </>
  );
}

export default Modals;
