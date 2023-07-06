import React, { useState } from 'react';
import './Accordion.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import {  BsPencilSquare} from 'react-icons/bs';
import { AiFillDelete} from 'react-icons/ai';
function AccordionItem({ title, content, onDelete, id }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className='container-acc'>
    <div className="accordion-item">
      <button className="accordion-header" onClick={handleToggle}>
        {title}

        <span className="accordion-icon">
        <BsPencilSquare className='pencile'/>
        <AiFillDelete className='pencile' onClick={handleDelete}/>
                {isOpen === true ? <FaChevronUp /> : <FaChevronDown />}
              </span>
      </button>
      {isOpen && <div className="accordion-body">{content}</div>}
    </div>
    </div>
  );
}

function Accordion({ items, onDelete }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem key={item.id} id={item.id} title={item.title} content={item.content} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default Accordion;
