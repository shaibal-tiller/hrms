import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

const TableComponent = ({ data, columns, keyField = 'id' }) => {

  // const products = [{ id: 0, name: 'hasib', price: '50tk', tee: '54545' }, { id: 1, name: 'hasib', price: '50tk' }, { id: 2, name: 'hasib', price: '50tk' }, { id: 3, name: 'hasib', price: '50tk' }];
  // const columns = [{
  //   dataField: 'id',
  //   text: 'Product ID'
  // }, {
  //   dataField: 'name',
  //   text: 'Product Name'
  // }, {
  //   dataField: 'price',
  //   text: 'Product Price'
  // },
  // {
  //   dataField: 'price',
  //   text: 'Product Price'
  // },
  // {
  //   dataField: 'price',
  //   text: 'Product Price'
  // },
  // {
  //   dataField: 'price',
  //   text: 'Product Price'
  // },
  // {
  //   dataField: 'price',
  //   text: 'Product Price'
  // },
  // {
  //   dataField: 'price',
  //   text: 'Product Price'
  // }];

  return (
    <div className='mx-auto w-[95%]'>
      <BootstrapTable
        striped
      
        rowClasses='border  border-2 border-[#fff] text-start'
        classes='p-4 border  border-2 border-[#fff]'
        keyField={keyField}
        data={data}
        columns={columns} />
    </div>
  )
}

export default TableComponent