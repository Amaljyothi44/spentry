
import React, {useState,useEffect} from 'react'
import GoalAdd from './Addgoal'
import './Goal.css'
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://localhost:8000/"
});

const Goal = () => {

  const [goal, setGoal] = useState([]);

  useEffect(() => {
    const fetchgoal = async () => {
      try {
        const response = await client.get('api/goal/');
        setGoal(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error); 
      }
    };
    fetchgoal();
  }, []);

  const addGoal = (goal) => {
    setGoal((prevGoal) => [...prevGoal, goal]);
  }; 
  return (
    <div className="container10">
      <div className='cont-list-exp10'>
        <div className="list-container10">
          <div className="list-con10">
            <div className='list-exp10'>


              <div className="top-container">

                <div className="left-container0">
                  <div className='Goal0'>Goal</div>
                  {goal.map((item, index) => (
                  <div key={index} className="mini-container0">
                  
                    <div className='Title'>{item.title}</div>
                    <div className='blc4'>Goal Balance</div>
                    <div className='amt3'>Rs 120</div>
                    <div className='blc3'>Target</div>
                    <div className='amt2'>Rs {item.target}</div>
                    <div className='Title'>{item.goaldate}</div>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoalAdd addGoal={addGoal} />
    </div>
  )
}

export default Goal