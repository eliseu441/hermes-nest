import  { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import colunas from './columns';

function DataTable( { onRowClick,dataBuildings }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(dataBuildings); // Inicializado com dataBuildings
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    useEffect(() => {
        const results = dataBuildings.filter(row =>
            Object.values(row).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredData(results);
    }, [searchTerm, dataBuildings]); 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }


    return (
        <>
                <div className='row col-sm-11  d-flex justify-content-center'>

                    <div className='table-repos '>
                        <>
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                className="mb-3"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Table striped bordered hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th >OPEN</th>
                                        <th>BUILDING</th>
                                        <th>CONTRY</th>
                                        <th>YEAR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                            <div 
                                            className='d-flex justify-content-center align-items-center'
                                            data-bs-toggle="modal" data-bs-target="#modalBuildings"
                                            key={item.id} onClick={() => onRowClick(item.id)}
                                            >
                                            <i className="bi bi-brightness-high-fill information" ></i>
                                                </div>                                                </td>
                                            <td>{item.build}</td>
                                            <td>{item.country}</td>
                                            <td>{item.year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination>{items}</Pagination>
                        </>
                    </div>
                </div>
        </>
    )
}

export default DataTable;