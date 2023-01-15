import React, { useState } from 'react';
import './Registor.scss';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registor = () => {
  const [name, setName] = useState('');
  const [img, setFile] = useState("");
  const history = useNavigate();
  const setData = (e) => {
    setName(e.target.value)
  }
  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  const addUserData = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("photo", img);
    formData.append("fName", name);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    const resp = await Axios.post('/register', formData, config);
    // console.log(resp);
    if (resp.data.status === 201) {
      history("/")
    } else {
      alert('No data added')
    }
  }


  return (
    <div className='wrap'>
      <form style={{ width: '900px' }}>
        <div className='form_row'>
          <input type={`text`} placeholder="Name" name="fName" onChange={setData} />
        </div>
        <div className='form_row'>
          <input type="file" name='photo' onChange={setimgfile} />
        </div>
        <div className='form_row'>
          <input type={`submit`} value="Send" onClick={addUserData} />
        </div>
      </form>
    </div>
  )
}

export default Registor