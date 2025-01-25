// https://polarized-concrete-desert.glitch.me
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
// import { use } from 'react';
import axios from 'axios'
import { use } from 'react';
import '../styles/addemployeeform.css'

const EmployeeTable = () => {

    //state for manage employee details
    const[employee,setEmployee]=useState([]);
    const[isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)
    //state for managing department filter
    const[departmentFilter,setDepartmentFilter]=useState("All");
    const[filteredEmp,setFilteredEmp]=useState([])
    //state to manage add employee button
    const[addBtn,setAddBtn]=useState(false);

    // state for adding new employee
    const[newEmployee,setNewEmployee]=useState({});
    //state for managing submit button


    useEffect(()=>{
        fetchEmployee();
    },[]);

//updating phase
useEffect(()=>{
    let filteredDepartment=[...employee];
   if(departmentFilter){
    filteredDepartment=filteredDepartment.filter((el)=>el.department===departmentFilter)
   }
   setFilteredEmp(filteredDepartment)

},[departmentFilter])

    const fetchEmployee=()=>{
        setIsLoading(true);
        setError(null);
      axios({
        url:"http://localhost:3000/employees",
        method:"GET"

      }
        // "http://localhost:3000/employees"
            // method:"GET"
    

        
        )
        .then((res)=>{
            console.log(res.data);
            setEmployee(res.data)
            setFilteredEmp(res.data)
        }).catch((error)=>{
            setError(error.response? error.response.data :error.message);
        })
        
     }

//handle delete function
const handleDelete=(id)=>{
    axios({
        url:`http://localhost:3000/employees/${id}`,
        method:"DELETE"
    }).then((res)=>{
        alert("Employee got deleted");
        fetchEmployee();

    }).catch((err)=>{
        console.log(err)
    })

}
const handleSubmit=(e)=>{
e.preventDefault();
axios({
    url:"http://localhost:3000/employees/",
    method:"POST",
    data: newEmployee
}).then((res)=>{
    alert("Employee Got Added Sucessfully")
     fetchEmployee();
    //  setNewEmployee()

})

}
const handleChange=(e)=>{
    const{name,value}=e.target;
    setNewEmployee({...newEmployee,[name]:value})
}

  return (
    <div>
       <button onClick={()=>setAddBtn(!addBtn)}>Add Employee</button>
       { addBtn && (
      <div className="form">
     <form action="" onSubmit={handleSubmit}>
    
        <input type="text"  placeholder='Enter Employee Name' name="name" value={newEmployee.name} onChange={handleChange}/>
        <input type="text"  placeholder='Enter Designation' name="designation" value={newEmployee.designation} onChange={handleChange}/>
        <select  name="department" value={newEmployee.department} onChange={handleChange}>
       
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Marketing">Marketing</option>
</select>
<input type="submit" value="submit" />
    </form>
    </div>
       )

       }
       <span>Filter by Department</span>
<select  onChange={(e)=>setDepartmentFilter(e.target.value)}>
<option value="All">All</option>
    <option value="IT">IT</option>
    <option value="HR">HR</option>
    <option value="Marketing">Marketing</option>
</select>

    <div>
     
      <table border="1px"> 
        <thead>
        <tr>
            <td>Name</td>
            <td>Designation</td>
            <td>Department</td>
            <td>Action</td>
        </tr>
        </thead>
        <tbody>
            {filteredEmp.length>0  && (
                
           
       filteredEmp.map((el)=>{
        return <tr>
            <td>{el.name}</td>
            <td>{el.designation}</td>
            <td>{el.department}</td>
            <td> <button onClick={()=>handleDelete(el.id)}>Delete</button></td>
        </tr>
       })
    )
    }
        
    
       </tbody>
      </table>
    </div>
    </div>
  )
}

export default EmployeeTable
