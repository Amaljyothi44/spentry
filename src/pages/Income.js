
import React, {useEffect, useState} from 'react';
import './Income.css';
import DatePick from '../components/Datepick';
import IncomeAdd from './Addincome';
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/"
});
const Income = () => {

  const [income, setIncome] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await client.get('api/income/');
        setIncome(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error); 
      }
    };
    fetchIncome();
  }, []);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await client.get('api/expense');
        setExpense(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error); 
      }
    };
    fetchExpense();
  }, []);

  useEffect(() => {
    let incomeTotal = 0;
    let balanceTotal = 0;
    let balance = 0;

    income.forEach((item) => {
      const amount = parseFloat(item.amount);
      if (!isNaN(amount)) {
        incomeTotal += amount;
      }
    });
    expense.forEach((item) => {
      const amount = parseFloat(item.amount);
      if (!isNaN(amount)) {
        balance += amount;
      }
    });

    setTotalIncome(incomeTotal);
    balanceTotal = incomeTotal - balance;
    setBalanceAmount(balanceTotal)
    
  }, [income, expense]);



  const addIncome = (income) => {
    setIncome((previncome) => [...previncome, income]);
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  

  const filteredincomes = income.filter((item) => {
    const incomeDate = new Date(item.date);
    if (selectedDate) {
      return (
        incomeDate.toISOString().split('T')[0] ===
        selectedDate.toISOString().split('T')[0]
      );
    } else {
      return true;
    }
  });

  return (
    <div className="container">
      
      <div className="top-container">
        <div className="left-container">
          <div className="mini-container1">
            <div className='blc'>Balance</div>
            <div className='amt'>Rs {balanceAmount} </div>
          </div>

        </div>
        <div className="right-container">
        <div className="mini-container2" >
            <div className='blc2'>Amount</div>
            <div className='amt2'>Rs {totalIncome} </div>
          </div>
        </div>
      </div>
      <div>
        <div className='name-expance'>Income</div>
      </div>
      <div className='cont-list-exp'>
        <div className='header-exp'>
          <div>
            <DatePick handleDateChange={handleDateChange} />
          </div>
        </div>
        <div className="list-container">
          <div className="list-con">
            <div className='list-exp'>
            {filteredincomes.map((item, index) => (
                <div key={index} className="item">
                  <span className="name">{item.title}</span>
                  <span className="income">{item.amount} rs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <IncomeAdd addIncome={addIncome}/>
    </div>

  );
};



export default Income