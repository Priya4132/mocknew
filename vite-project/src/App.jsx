import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react'
import EmployeeTable from './components/EmployeeTable'

const App = () => {
  return (
    <div><h1>Employee Management System</h1>
      <EmployeeTable />
    </div>
  )
}

export default App
