
import React from 'react';
import './Home.css';
import DatePick from '../components/Datepick';
import IncomeAdd from './IncomeAdd';

const Home = () => {

  const data = [
    { name: 'John', amount: 100 },
    { name: 'Jane', amount: 200 },
    { name: 'Alice', amount: 150 },
    { name: 'Bob', amount: 300 },
    { name: 'John', amount: 100 },
    { name: 'Jane', amount: 200 },
    { name: 'Alice', amount: 150 },
    { name: 'Bob', amount: 300 },
    { name: 'John', amount: 100 },
    { name: 'Jane', amount: 200 },
    { name: 'Alice', amount: 150 },
    { name: 'Bob', amount: 300 },
  ];

  return (
    <div className="container">
      <IncomeAdd/>
      <div className="top-container">
        <div className="left-container">
          <div className="mini-container1">
            <div className='blc'>Balance</div>
            <div className='amt'>Rs 100 </div>
          </div>

          <div className="mini-container2" >
            <div className='blc2'>Amount</div>
            <div className='amt2'>Rs 100 </div>
          </div>
        </div>
        <div className="right-container">
          <div className='Goal'>Goal</div>
          <div className='blc3'>Target</div>
          <div className='amt2'>Rs 2000</div>
          <div className='blc4'>Goal Balance</div>
          <div className='amt3'>Rs 120</div>
        </div>
      </div>
      <div>
        <div className='name-expance'>Expense</div>
      </div>
      <div className='cont-list-exp'>
        <div className='header-exp'>
          <div>
            <DatePick />
          </div>
        </div>
        <div className="list-container">
          <div className="list-con">
            <div className='list-exp'>
              {data.map((item, index) => (
                <div key={index} className="item">
                  <span className="name">{item.name}</span>
                
                  <span className="amount">Rs {item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};



export default Home