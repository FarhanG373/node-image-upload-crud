import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import Axios from 'axios';
const Home = () => {
  const [data, setData] = useState([]);
  const [alertMsg, setAlertMsg] = useState(false);
  const getData = async () => {
    const resp = await Axios.get('/getData', {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (resp.data.status === 201) {
      console.log("Data selected");
      setData(resp.data.data)
    } else {
      alert('No data Available')
    }
  }

  const dltUsr = async (id) => {
    const resp = await Axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (resp.data.status === 201) {
      getData();
      setAlertMsg(true)
    } else {
      console.log('No data Available')
    }
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      <>{alertMsg ? <div className='alert'>Data deleted</div> : ""}</>
      <div className='wrap'>

        {
          data.map((item) => (
            <div className='card'>
              <div className='cardImage'>
                <img src={`/uploads/${item.image}`} alt={item.name} width={'100%'}></img>
              </div>
              <div className='cardBody'>
                <h2>heading</h2>
                <p>{item.date}</p>
                <button onClick={() => dltUsr(item.id)}>Delete</button>
              </div>
            </div>
          ))
        }
        <div className='card addNew'>
          <Link className='addBtn' to="/registor">Add New</Link>
        </div>

      </div>
    </>
  )
}

export default Home