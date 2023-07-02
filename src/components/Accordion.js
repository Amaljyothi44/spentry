import React, { useState } from 'react';
import './Accordion.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import {  BsPencilSquare} from 'react-icons/bs';
import { AiFillDelete} from 'react-icons/ai';
function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container-acc'>
    <div className="accordion-item">
      <button className="accordion-header" onClick={handleToggle}>
        {title}

        <span className="accordion-icon">
        <BsPencilSquare className='pencile'/>
        <AiFillDelete className='pencile'/>
                {isOpen === true ? <FaChevronUp /> : <FaChevronDown />}
              </span>
      </button>
      {isOpen && <div className="accordion-body">{content}</div>}
    </div>
    </div>
  );
}

function Accordion({ items }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem key={item.note_id} title={item.title} content={item.content} />
      ))}
    </div>
  );
}

export default Accordion;
