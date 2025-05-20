import React from 'react'
import Tasks from './components/Taskss/Taskss'
import  '../Dashboard/Dashboard.css'
import Points from './components/Points/Points'
import Clock  from './components/Clock/Clock'
import Leaderboard from './components/Leaderboard/Leaderboard'
import  Award  from './components/Awards/Awards'
import Courses from'./components/Courses/Courses'
import Sidebar from './components/Sidebar/Sidebar'

function Dashboard() {
  return (
    <div className="Header">
      <Sidebar/>
      
  <div className="TaskCss"><Tasks/></div>
  
  <div className='Points'><Points/></div>
  
  <div className='Leaderboard'> <Leaderboard/></div>
  <div className='Clock'> <Clock/></div>
  
  <div className='Courses'> <Courses/></div>
  <div className='Awards'> < Award/></div>
  
   
  </div>
   
  )
}

export default Dashboard