
import React, {useEffect, useState} from 'react';
import './Home.css';
import DatePick from '../components/Datepick';
import IncomeAdd from './Addexpense';
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/"
});
const Home = () => {

  const [expense, setExpense] = useState([]);
  const [goal, setGoal] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);

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
    const fetchGoals = async () => {
      try {
        const response = await client.get('api/goal/');
        const goals = response.data;
        if (goals.length > 0) {
          const firstGoal = goals[0];
          setGoal(firstGoal);
        }
      } catch (error) {
        console.error('Error fetching goals:', error); 
      }
    };
  
    fetchGoals();
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

  const addExpense = (expense) => {
    setExpense((prevExpense) => [...prevExpense, expense]);
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredExpenses = expense.filter((item) => {
    const expenseDate = new Date(item.date);
    if (selectedDate) {
      return (
        expenseDate.toISOString().split('T')[0] ===
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

          <div className="mini-container2" >
            <div className='blc2'>Amount</div>
            <div className='amt2'>Rs {totalIncome} </div>
          </div>
        </div>
        <div className="right-container">
          <div className='Goal'>Goal</div>
          <div className='blc3'>Target</div>
          <div className='amt2'>Rs {goal.target}</div>
          <div className='blc4'>Goal Balance</div>
          <div className='amt3'>Rs {balanceAmount}</div>
        </div>
      </div>
      <div>
        <div className='name-expance'>Expense</div>
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
            {filteredExpenses.map((item, index) => (
                <div key={index} className="item">
                  <span className="name">{item.title}</span>
                  <span className="amount">-{item.amount} rs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <IncomeAdd addExpense={addExpense}/>
    </div>

  );
};



export default Home