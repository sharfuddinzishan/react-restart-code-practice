import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateInfo = () => {
    const {id} = useParams();
    const [getInfo,setInfo]=useState([]);
    let [loader, setLoader] = useState(false);
    let navigate =useNavigate();

    useEffect(() => {
        setLoader(true);
        axios.get(`http://localhost:4000/infos/${id}`)
            .then(result => {
                if (result.data) {
                    setInfo(result.data);
                    setLoader(false);
                }
            })
            .catch((e) => {})
                .finally(() => {})
    },[id])

    // const handleAction=(infoId)=>{
    //    let ids=infoId;
    //     let confirm = window.confirm(`Do you want to Update?`);
    //     if (confirm){
    //     axios.put(`http://localhost:4000/infos/${id}`)
    //     .then(result => {
    //                 if (result.data.updatedCount === '0') { 
    //                     alert('Failed'); 
    //                      navigate('/');
    //                 }
    //                 else {
    //                    navigate('/');
    //                 }
    //             })
    //             .catch(() => {})
    //             .finally(() => {})
    //     }
    // }

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

     const handleInput = e => {
        const copyInfo = { ...getInfo };
        copyInfo[e.target.name] = e.target.value;
        setInfo(copyInfo);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false)
        setError(false)
        axios.put(`http://localhost:4000/info`, getInfo)
            .then(result => {
                if (!result?.data?.modifiedCount) { setError(true) }
                else { setSuccess(true) }
            })
            .catch(e => setError(true))
            .finally(() => {})
    };

    return (
        <div>
            <h4>Update Info</h4>
                          {
                    success && <div>
                        <strong>Updated!</strong> New Info.
                        <button type="button" onClick={() => setSuccess(false)}></button>
                        <br />
                    </div>
                }
                {
                    error && <div>
                        <strong>Failed!</strong> To Updated.
                        <button type="button" onClick={() => setError(false)}></button>
                        <br />
                    </div>
                }
             {
                !loader?<>
                {

                <form onSubmit={handleSubmit} autoComplete="off">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                onBlur={handleInput}
                                defaultValue={getInfo?.name}
                            />

                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                onBlur={handleInput}
                                defaultValue={getInfo?.age}
                            />
                    <button>Update Info</button>
                </form>
                }
                </>:<h1>Still Loaded....</h1>
            }
        </div>
    );
};

export default UpdateInfo;