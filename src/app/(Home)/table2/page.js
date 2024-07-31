// "use client"

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { CiSearch } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa";
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import "../table/table.css"

// const DataTable = () => {
//   const TOKEN = Cookies.get('Tokensss');
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalInfo, setModalInfo] = useState({ show: false, recipient: '' });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [data, setData] = useState( [
//     {
//         id: 9,
//         data_uniq_id: "",
//         created_date: "",
//         active_status: '',
//         customer_class: "",
//         created_f_date: "",
//         s_no: 2,
//         formatted_created_date: "",
//         readable_created_date: ""
//     },
//     {
//         id: 8,
//         data_uniq_id: "",
//         created_date: "",
//         active_status: '',
//         customer_class: "",
//         created_f_date: "",
//         s_no: 3,
//         formatted_created_date: "",
//         readable_created_date: ""
//     },
//     {
//         id: 7,
//         data_uniq_id: "",
//         created_date: "",
//         active_status:'',
//         customer_class: "",
//         created_f_date: "",
//         s_no: 4,
//         formatted_created_date: "",
//         readable_created_date: ""
//     }
    
// ]);
//   const [updData, setUpdData] = useState([]);
//   const API_TOKEN = "engguergi09ertgiojg";

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://192.168.29.143:8004/customer_class_master_list?access_token=${TOKEN}`, {
//         headers: {
//           'Authorization': `${API_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log("Data fetched successfully:", response.data);

//       const result = response.data;

//       if (result.action === 'success') {
//         const apiData = result.data;

//         const fetchedColumns = [
//           { field: 'id', headerName: 'ID', width: 100 },
//           { field: 'data_uniq_id', headerName: 'data_uniq_id', width: 210 },
//           { field: 'customer_class', headerName: 'customer_class', width: 210 },
//           { field: 'created_f_date', headerName: 'created_f_date', width: 210 },
//         //   { field: 'created_date', headerName: 'created_date', width: 210 },
//         //   { field: 'active_status', headerName: 'active_status', width: 210 },
//         //   { field: 'trading_type', headerName: 'Trading Type', width: 210 },
//         ];

//         const fetchedRows = apiData.map((item, index) => ({
//           id: index,
//           data_uniq_id: item.data_uniq_id,
//           customer_class: item.customer_class,
//           created_f_date: item.created_f_date,
//         //   contact_number: item.contact_number,
//         //   gst_no: item.gst_no,
//         //   trading_type: item.trading_type,
//         }));

//         setColumns(fetchedColumns);
//         setRows(fetchedRows);
//       } else {
//         setError("There has been some error while fetching the data");
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(`Error fetching data: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     if (TOKEN) {
//       fetchData();
//     }
//   }, [TOKEN]);

 

//   const handleSubmitButton = async () => {
//     console.log("the data is", data);
//     const jsonData = JSON.stringify(data);

//     console.log(jsonData,'jsonData');
  
//     try {
//       const response = await axios.post(`http://192.168.29.143:8004/customer_class_master`, data, {
//         headers: {
//           'Authorization': `${API_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log("the response received is", response);
//       if (response.status === 200) {
//         fetchData(); // Call fetchData after successful post
//         setUpdData(jsonData);
//         handleCloseModal();
//       }
//     } catch (error) {
//       console.error('Error posting data:', error);
//     }
//   };



//   const handleChanges = (e) => {
//     const { name, value } = e.target;
//     setData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleNext = () => {
//     setPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handlePrev = () => {
//     setPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handlePageSizeChange = (newPageSize) => {
//     setPageSize(newPageSize);
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredRows = rows.filter(row =>
//     Object.values(row).some(value =>
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );
//   console.log(filteredRows);

//   const handleOpenModal = () => {
//     setModalInfo({ show: true });
//   };

//   const handleCloseModal = () => {
//     setModalInfo({ show: false, recipient: '' });
//   };

//   const fruits = ["apple", "Mango", "guava"];
//   const trades = ["General Type", "Reserved", "Reserved Type"];

//   return (
//     <>
//       <div className='text-right mb-3 w-100 d-flex justify-content-between align-items-center input-div p-3'>
//         <div className='input-button '>
//           <button className='text-light p-1 me-5 fs-6 d-flex align-items-center gap-1 justify-content-between' onClick={handleOpenModal}><FaPlus /> Add New</button>
//         </div>
//         <div className='d-flex w-25 bg-light rounded justify-content-between p-2 align-items-center'>
//           <input
//             type="text"
//             className='w-50 rounded p-1'
//             placeholder='Search'
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <CiSearch className='me-3 fs-5' />
//         </div>
//       </div>
//       <div style={{ height: 400, width: '100%' }}>
//         {error && <div style={{ color: 'red' }}>Error: {error}</div>}
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           disableColumnFilter
//           disableColumnMenu
//           pagination
//           pageSize={pageSize}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           onPageChange={handlePageChange}
//           onPageSizeChange={(params) => handlePageSizeChange(params.pageSize)}
//           paginationMode="server"
//           rowCount={filteredRows.length}
//           page={page - 1}
//           className='data-grid-height'
//         />
//         <Stack spacing={2} className="stack-spacing">
//           <Pagination
//             count={Math.ceil(filteredRows.length / pageSize)}
//             page={page}
//             onChange={handlePageChange}
//             showFirstButton
//             showLastButton
//           />
//         </Stack>
//         {updData && <div>{updData}</div>}
//       </div>

//       <div>
//         {modalInfo.show && (
//           <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog modal-boxx" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="exampleModalLabel">Add Details</h5>
//                   <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                   <form>
//                     <div className="mb-3">
//                       <label htmlFor="customer_name" className="col-form-label">Data Uniq Id:</label>
//                       <input type="text" className="form-control h-25" id="data_uniq_id" name="data_uniq_id" value={data.data_uniq_id} onChange={handleChanges} />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="bussiness_name" className="col-form-label">Customer Class:</label>
//                       <input type="text" className="form-control h-25" id="customer_class" name="customer_class" value={data.customer_class} onChange={handleChanges} />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="customer_code" className="col-form-label">Created f date:</label>
//                       <input type="text" className="form-control h-25" id="created_f_date" name='created_f_date' value={data.created_f_date} onChange={handleChanges} />
//                     </div>
//                     {/* <div className="mb-3">
//                       <label htmlFor="contact_number" className="col-form-label">Contact Number:</label>
//                       <input type="text" className="form-control h-25" id="contact_number" name='contact_number' value={data.contact_number} onChange={handleChanges} />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="gst_no" className="col-form-label">GST No:</label>
//                       <input type="text" className="form-control h-25" id="gst_no" name="gst_no" value={data.gst_no} onChange={handleChanges} />
//                     </div> */}
//                     <div className='d-flex justify-content-between '>
//                       {/* <div className="mb-3">
//                         <label htmlFor="selected_fruit" className="col-form-label me-2">Fruits:</label>
//                         <select name="selected_fruit" id="selected_fruit" className='border'>
//                           {fruits.map((fruit, index) => (
//                             <option key={index} value={fruit}>
//                               {fruit}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="mb-3">
//                         <label htmlFor="trading_type" className="col-form-label me-2">Trading Type:</label>
//                         <select name="trading_type" id="trading_type" className='border' value={data.trading_type} onChange={handleChanges}>
//                           {trades.map((trade, index) => (
//                             <option key={index} value={trade} className='w-25'>
//                               {trade}
//                             </option>
//                           ))}
//                         </select>
//                       </div> */}
//                     </div>
//                   </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
//                   <button type="button" className="btn btn-primary" onClick={handleSubmitButton}>Save</button>
//                 </div>
//               </div>
//             </div>

            
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DataTable;


// "use client"

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { CiSearch } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa";
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import "../table/table.css";

// const DataTable = () => {
//   const TOKEN = Cookies.get('Tokensss');
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [modalInfo, setModalInfo] = useState({ show: false, recipient: '' });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);
//   const [data, setData] = useState({
//     data_uniq_id: "",
//     created_date: "",
//     active_status: '',
//     customer_class: "",
//     created_f_date: "",
//     s_no: 0,
//     formatted_created_date: "",
//     readable_created_date: ""
//   });
//   const [updData, setUpdData] = useState([]);
//   const API_TOKEN = "engguergi09ertgiojg";

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://192.168.29.143:8004/customer_class_master_list?access_token=${TOKEN}`, {
//         headers: {
//           'Authorization': `${API_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log("Data fetched successfully:", response.data);

//       const result = response.data;

//       if (result.action === 'success') {
//         const apiData = result.data;

//         // const fetchedColumns = [
//         //   { field: 'id', headerName: 'ID', width: 100 },
//         //   { field: 'data_uniq_id', headerName: 'data_uniq_id', width: 210 },
//         //   { field: 'customer_class', headerName: 'customer_class', width: 210 },
//         //   { field: 'created_f_date', headerName: 'created_f_date', width: 210 },
//         // ];

//         const fetchedColumns = [
//             { field: 'id', headerName: 'ID', width: 100 },
//             { field: 'data_uniq_id', headerName: 'Data Unique ID', width: 200 },
//             { field: 'created_date', headerName: 'Created Date', width: 200 },
//             { field: 'active_status', headerName: 'Active Status', width: 130 },
//             { field: 'customer_class', headerName: 'Customer Class', width: 200 },
//             { field: 'created_f_date', headerName: 'Created F Date', width: 200 },
//             { field: 'formatted_created_date', headerName: 'Formatted Created Date', width: 210 },
//             { field: 'readable_created_date', headerName: 'Readable Created Date', width: 210 },
//           ];
          

//         // const fetchedRows = apiData.map((item, index) => ({
//         //   id: index,
//         //   data_uniq_id: item.data_uniq_id,
//         //   customer_class: item.customer_class,
//         //   created_f_date: item.created_f_date,
//         // }));

//         const fetchedRows = apiData.map(item => ({
//             id: item.id,  // Use item.id for DataGrid row ID
//             data_uniq_id: item.data_uniq_id,
//             created_date: item.created_date,
//             active_status: item.active_status,
//             customer_class: item.customer_class,
//             created_f_date: item.created_f_date,
//             formatted_created_date: item.formatted_created_date,
//             readable_created_date: item.readable_created_date,
//           }));

//         setColumns(fetchedColumns);
//         setRows(fetchedRows);
//       } else {
//         setError("There has been some error while fetching the data");
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(`Error fetching data: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     if (TOKEN) {
//       fetchData();
//     }
//   }, [TOKEN, API_TOKEN]);

//   const handleSubmitButton = async () => {
//     console.log("the data is", data);
//     const jsonData = JSON.stringify(data);

//     console.log(jsonData, 'jsonData');
  
//     try {
//       const response = await axios.post(`http://192.168.29.143:8004/customer_class_master`, data, {
//         headers: {
//           'Authorization': `Bearer ${API_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log("the response received is", response);
//       if (response.status === 200) {
//         fetchData(); // Call fetchData after successful post
//         setUpdData(jsonData);
//         handleCloseModal();
//       }
//     } catch (error) {
//       console.error('Error posting data:', error);
//     }
//   };

//   const handleChanges = (e) => {
//     const { name, value } = e.target;
//     setData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleNext = () => {
//     setPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handlePrev = () => {
//     setPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handlePageSizeChange = (event) => {
//     setPageSize(event.target.value);
//     setPage(1); // Reset page to 1 when page size changes
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredRows = rows.filter(row =>
//     Object.values(row).some(value =>
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );
//   console.log(filteredRows);

//   const handleOpenModal = () => {
//     setModalInfo({ show: true });
//   };

//   const handleCloseModal = () => {
//     setModalInfo({ show: false, recipient: '' });
//   };

//   const fruits = ["apple", "Mango", "guava"];
//   const trades = ["General Type", "Reserved", "Reserved Type"];

//   const totalPages = Math.ceil(filteredRows.length / pageSize);

//   return (
//     <>
//       <div className='text-right mb-3 w-100 d-flex justify-content-between align-items-center input-div p-3'>
//         <div className='input-button '>
//           <button className='text-light p-1 me-5 fs-6 d-flex align-items-center gap-1 justify-content-between' onClick={handleOpenModal}><FaPlus /> Add New</button>
//         </div>
//         <div className='d-flex w-25 bg-light rounded justify-content-between p-2 align-items-center'>
//           <input
//             type="text"
//             className='w-50 rounded p-1'
//             placeholder='Search'
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <CiSearch className='me-3 fs-5' />
//         </div>
//       </div>
//       <div style={{ height: 400, width: '100%' }}>
//         {error && <div style={{ color: 'red' }}>Error: {error}</div>}
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           disableColumnFilter
//           disableColumnMenu
//           pagination
//           pageSize={pageSize}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           onPageChange={handlePageChange}
//           onPageSizeChange={handlePageSizeChange}
//           paginationMode="server"
//           rowCount={filteredRows.length}
//           page={page - 1}
//           className='data-grid-height'
//         />
//         <Stack spacing={2} className="stack-spacing">
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={handlePageChange}
//             showFirstButton
//             showLastButton
//           />
//         </Stack>
//         {updData && <div>{updData}</div>}
//       </div>

//       <div>
//         {modalInfo.show && (
//           <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog modal-boxx" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="exampleModalLabel">Add Details</h5>
//                   <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                   <form>

//                 <div className="mb-3">
//                 <label htmlFor="id" className="col-form-label">ID:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="id"
//                     name="id"
//                     value={data.id || ''}
//                     onChange={handleChanges}
//                     disabled  // Assuming ID is not editable
//                 />
//                 </div>

//                 <div className="mb-3">
//                 <label htmlFor="data_uniq_id" className="col-form-label">Data Unique ID:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="data_uniq_id"
//                     name="data_uniq_id"
//                     value={data.data_uniq_id || ''}
//                     onChange={handleChanges}
//                 />
//                 </div>

//                 <div className="mb-3">
//                 <label htmlFor="created_date" className="col-form-label">Created Date:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="created_date"
//                     name="created_date"
//                     value={data.created_date || ''}
//                     onChange={handleChanges}
//                 />
//                 </div>

//                 <div className="mb-3">
//                 <label htmlFor="active_status" className="col-form-label">Active Status:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="active_status"
//                     name="active_status"
//                     value={data.active_status || ''}
//                     onChange={handleChanges}
//                 />
//                 </div>

//                 <div className="mb-3">
//                 <label htmlFor="customer_class" className="col-form-label">Customer Class:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="customer_class"
//                     name="customer_class"
//                     value={data.customer_class || ''}
//                     onChange={handleChanges}
//                 />
//                 </div>

//                 <div className="mb-3">
//                 <label htmlFor="created_f_date" className="col-form-label">Created F Date:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="created_f_date"
//                     name="created_f_date"
//                     value={data.created_f_date || ''}
//                     onChange={handleChanges}
//                 />
//                 </div>

//                 <div className="mb-3">
//                 <label htmlFor="formatted_created_date" className="col-form-label">Formatted Created Date:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="formatted_created_date"
//                     name="formatted_created_date"
//                     value={data.formatted_created_date || ''}
//                     onChange={handleChanges}
//                 />
//                 </div>

//                 <div className="mb-3">
//                 <label htmlFor="readable_created_date" className="col-form-label">Readable Created Date:</label>
//                 <input
//                     type="text"
//                     className="form-control h-25"
//                     id="readable_created_date"
//                     name="readable_created_date"
//                     value={data.readable_created_date || ''}
//                     onChange={handleChanges}
//                 />
//                 </div>
//                     <div className='d-flex justify-content-between '>
//                       {/* <div className="mb-3">
//                         <label htmlFor="selected_fruit" className="col-form-label me-2">Fruits:</label>
//                         <select name="selected_fruit" id="selected_fruit" className='border'>
//                           {fruits.map((fruit, index) => (
//                             <option key={index} value={fruit}>
//                               {fruit}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="mb-3">
//                         <label htmlFor="trading_type" className="col-form-label me-2">Trading Type:</label>
//                         <select name="trading_type" id="trading_type" className='border' value={data.trading_type} onChange={handleChanges}>
//                           {trades.map((trade, index) => (
//                             <option key={index} value={trade} className='w-25'>
//                               {trade}
//                             </option>
//                           ))}
//                         </select>
//                       </div> */}
//                     </div>
//                   </form>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
//                   <button type="button" className="btn btn-primary" onClick={handleSubmitButton}>Save</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default DataTable;

"use client"

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Cookies from 'js-cookie';
import "bootstrap/dist/css/bootstrap.min.css";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "../table/table.css";

const DataTable = () => {
  const TOKEN = Cookies.get('Tokensss');
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalInfo, setModalInfo] = useState({ show: false, recipient: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState({
    customer_class: "",

  });
  const [updData, setUpdData] = useState([]);
  const API_TOKEN = "engguergi09ertgiojg";

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.29.143:8004/customer_class_master_list?access_token=${TOKEN}`, {
        headers: {
          'Authorization': `${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("Data fetched successfully:", response.data);

      const result = response.data;

      if (result.action === 'success') {
        const apiData = result.data;

        // const fetchedColumns = [
        //   { field: 'id', headerName: 'ID', width: 100 },
        //   { field: 'data_uniq_id', headerName: 'data_uniq_id', width: 210 },
        //   { field: 'customer_class', headerName: 'customer_class', width: 210 },
        //   { field: 'created_f_date', headerName: 'created_f_date', width: 210 },
        // ];

        const fetchedColumns = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'data_uniq_id', headerName: 'Data Unique ID', width: 200 },
            { field: 'created_date', headerName: 'Created Date', width: 200 },
            { field: 'active_status', headerName: 'Active Status', width: 130 },
            { field: 'customer_class', headerName: 'Customer Class', width: 200 },
            { field: 'created_f_date', headerName: 'Created F Date', width: 200 },
            { field: 'formatted_created_date', headerName: 'Formatted Created Date', width: 210 },
            { field: 'readable_created_date', headerName: 'Readable Created Date', width: 210 },
          ];
          

        // const fetchedRows = apiData.map((item, index) => ({
        //   id: index,
        //   data_uniq_id: item.data_uniq_id,
        //   customer_class: item.customer_class,
        //   created_f_date: item.created_f_date,
        // }));

        const fetchedRows = apiData.map(item => ({
            id: item.id,  // Use item.id for DataGrid row ID
            data_uniq_id: item.data_uniq_id,
            created_date: item.created_date,
            active_status: item.active_status,
            customer_class: item.customer_class,
            created_f_date: item.created_f_date,
            formatted_created_date: item.formatted_created_date,
            readable_created_date: item.readable_created_date,
          }));

        setColumns(fetchedColumns);
        setRows(fetchedRows);
      } else {
        setError("There has been some error while fetching the data");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    if (TOKEN) {
      fetchData();
    }
  }, [TOKEN, API_TOKEN]);

  const handleSubmitButton = async () => {
    console.log("the data is", data);
    const jsonData = JSON.stringify(data);

    console.log(jsonData, 'jsonData');
  
    try {
      const response = await axios.post(`http://192.168.29.143:8004/customer_class_master`, data, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("the response received is", response);
      if (response.status === 200) {
        fetchData(); // Call fetchData after successful post
        setUpdData(jsonData);
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1); // Reset page to 1 when page size changes
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  console.log(filteredRows);

  const handleOpenModal = () => {
    setModalInfo({ show: true });
  };

  const handleCloseModal = () => {
    setModalInfo({ show: false, recipient: '' });
  };

  const fruits = ["apple", "Mango", "guava"];
  const trades = ["General Type", "Reserved", "Reserved Type"];

  const totalPages = Math.ceil(filteredRows.length / pageSize);

  return (
    <>
      <div className='text-right mb-3 w-100 d-flex justify-content-between align-items-center input-div p-3'>
        <div className='input-button '>
          <button className='text-light p-1 me-5 fs-6 d-flex align-items-center gap-1 justify-content-between' onClick={handleOpenModal}><FaPlus /> Add New</button>
        </div>
        <div className='d-flex w-25 bg-light rounded justify-content-between p-2 align-items-center'>
          <input
            type="text"
            className='w-50 rounded p-1'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearch}
          />
          <CiSearch className='me-3 fs-5' />
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        <DataGrid
          rows={filteredRows}
          columns={columns}
          disableColumnFilter
          disableColumnMenu
          pagination
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 15, 25]}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          paginationMode="server"
          rowCount={filteredRows.length}
          page={page - 1}
          className='data-grid-height'
        />
        <Stack spacing={2} className="stack-spacing">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
        {updData && <div>{updData}</div>}
      </div>

      <div>
        {modalInfo.show && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-boxx" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Add Details</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>

                {/* <div className="mb-3">
                <label htmlFor="id" className="col-form-label">ID:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="id"
                    name="id"
                    value={data.id || ''}
                    onChange={handleChanges}
                    disabled  // Assuming ID is not editable
                />
                </div>

                <div className="mb-3">
                <label htmlFor="data_uniq_id" className="col-form-label">Data Unique ID:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="data_uniq_id"
                    name="data_uniq_id"
                    value={data.data_uniq_id || ''}
                    onChange={handleChanges}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="created_date" className="col-form-label">Created Date:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="created_date"
                    name="created_date"
                    value={data.created_date || ''}
                    onChange={handleChanges}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="active_status" className="col-form-label">Active Status:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="active_status"
                    name="active_status"
                    value={data.active_status || ''}
                    onChange={handleChanges}
                />
                </div> */}

                <div className="mb-3">
                <label htmlFor="customer_class" className="col-form-label">Customer Class:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="customer_class"
                    name="customer_class"
                    value={data.customer_class || ''}
                    onChange={handleChanges}
                />
                </div>
{/* 
                <div className="mb-3">
                <label htmlFor="created_f_date" className="col-form-label">Created F Date:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="created_f_date"
                    name="created_f_date"
                    value={data.created_f_date || ''}
                    onChange={handleChanges}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="formatted_created_date" className="col-form-label">Formatted Created Date:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="formatted_created_date"
                    name="formatted_created_date"
                    value={data.formatted_created_date || ''}
                    onChange={handleChanges}
                />
                </div>

                <div className="mb-3">
                <label htmlFor="readable_created_date" className="col-form-label">Readable Created Date:</label>
                <input
                    type="text"
                    className="form-control h-25"
                    id="readable_created_date"
                    name="readable_created_date"
                    value={data.readable_created_date || ''}
                    onChange={handleChanges}
                />
                </div> */}
                    <div className='d-flex justify-content-between '>
                      {/* <div className="mb-3">
                        <label htmlFor="selected_fruit" className="col-form-label me-2">Fruits:</label>
                        <select name="selected_fruit" id="selected_fruit" className='border'>
                          {fruits.map((fruit, index) => (
                            <option key={index} value={fruit}>
                              {fruit}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="trading_type" className="col-form-label me-2">Trading Type:</label>
                        <select name="trading_type" id="trading_type" className='border' value={data.trading_type} onChange={handleChanges}>
                          {trades.map((trade, index) => (
                            <option key={index} value={trade} className='w-25'>
                              {trade}
                            </option>
                          ))}
                        </select>
                      </div> */}
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmitButton}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DataTable;

