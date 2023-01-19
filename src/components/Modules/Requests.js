import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableComponent from '../../utils/components/Table'

const Requests = () => {

  const base_url = process.env.REACT_APP_BASE_URL;
  const [regTable, setRegTable] = useState([])
  const [leaveTable, setLeaveTable] = useState([])

  const viewButton = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className='flex  gap-2 justify-center '>
        <button className='bg-[#40d88c] text-[#000] px-1 my-1' variant="contained"
          onClick={() => {
            console.log(row);
          }}
        >
          OK
        </button>
        <button className='bg-[#e21e1e] px-1 my-1' variant="contained"
          onClick={() => {
            console.log(row);
          }}
        >
          DEL
        </button>
      </div>
    );
  };
  const dateFormatter = (row) => {
    const date = new Date(row)
    return date.toLocaleDateString()

  }
  const leave_columns = [
    {
      headerStyle: { 'width': '6%', 'text-align': 'start' },
      dataField: 'employee_id',
      text: 'Emp. ID'
    }, {
      headerStyle: { 'width': '10%', 'text-align': 'start' },
      dataField: 'full_name',
      text: 'Employee Name'
    }, {
      headerStyle: { 'width': '10%', 'text-align': 'start' },
      dataField: 'department_id',
      text: 'Department'
    },
    {
      headerStyle: { 'width': '10%', 'text-align': 'start' },
      dataField: 'designation_id',
      text: 'Designatione'
    },
    {
      headerStyle: { 'width': '10%', 'text-align': 'start' },
      dataField: 'leave_category',
      text: 'Category'
    },
    {
      headerStyle: { 'width': '10%', 'text-align': 'start' },
      dataField: 'leave_type',
      text: 'Leave Type'
    },
    {
      headerStyle: { 'width': '10%', 'text-align': 'start' },
      dataField: 'cause_of_leave',
      text: 'Reason'
    },
    {
      headerStyle: { 'width': '7%', 'text-align': 'start' },
      formatter: dateFormatter,
      dataField: 'from_date',
      text: 'From'
    },
    {
      headerStyle: { 'width': '7%', 'text-align': 'start' },
      formatter: dateFormatter,
      dataField: 'to_date',
      text: 'Till'
    },
    {
      headerStyle: { 'width': '7%', 'text-align': 'start' },
      formatter: dateFormatter,
      dataField: 'join_date',
      text: 'Joining On'
    },
    {
      headerStyle: { 'width': '7%', 'text-align': 'start' },
      dataField: 'sup_name',
      text: 'Supervisor'
    },
    {
      dataField: "approve",
      text: "Action",
      formatter: viewButton,
      // sort: true,
      headerStyle: { 'text-align': 'center', 'width': '6%' },
    },
  ];

  const reg_columns = [
    {
      headerStyle: { 'width': '6%', 'text-align': 'start' },
      dataField: 'employee_id',
      text: 'Emp. ID'
    }, {
      headerStyle: { 'width': '10%', 'text-align': 'start' },
      dataField: 'full_name',
      text: 'Employee Name'
    }, {
      headerStyle: { 'width': '9%', 'text-align': 'start' },
      dataField: 'department_name',
      text: 'Department'
    },
    {
      headerStyle: { 'width': '6%', 'text-align': 'start', },
      dataField: 'designation_id',
      text: 'Designation'
    },
    {
      headerStyle: { 'width': '6%', 'text-align': 'start', },
      dataField: 'phone',
      text: 'Phone No.'
    },
    {
      headerStyle: { 'width': '10%', 'text-align': 'start', },
      dataField: 'email',
      text: 'Email'
    },
    {
      headerStyle: { 'width': '6%', 'text-align': 'start', },
      formatter: dateFormatter,
      dataField: 'join_date',
      text: 'Join Date'
    },
    {
      headerStyle: { 'text-align': 'center', 'width': '2%' },
      dataField: "approve",
      text: "Action",
      formatter: viewButton,
      // sort: true,

    },
  ];

  const getRegTable = () => {
    axios.get(`${base_url}/select/regreq`)
      .then(res => {
        setRegTable(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }
  const getLeaveTable = () => {
    axios.get(`${base_url}/select/leavereq`)
      .then(res => {
        const temp = []
        res.data.map(el => {
          el.id = el.employee_id + el.leave_category
          temp.push(el)
        })
        setLeaveTable(temp);
      })
      .catch(e => {
        console.log(e);
      })
  }

  useEffect(() => {
    getRegTable()
    getLeaveTable()
  }, [])
  return (
    <div className='h-full  text-center'>
      <div className='h-full  text-center bg-[#000] pb-2 '>
        <h2 className='text-[1.5rem] font-semibold bg-slate-400'>Leave Approve</h2>
        <br />
        <TableComponent data={leaveTable} columns={leave_columns} keyField={'id'} />
      </div>
      <div className='h-full  text-center bg-[#000] pb-2 '>
        <h2 className='text-[1.5rem] font-semibold bg-slate-400'>Registration Approve</h2>
        <br />
        <TableComponent data={regTable} columns={reg_columns} keyField={'employee_id' + "id"} />
      </div>

    </div>
  )
}

export default Requests