import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Home = () => {
    const [info,setInfo]=useState([]);
    let [refreshed, setRefreshed] = useState(false);
    let [loader, setLoader] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        setLoader(true);
        axios.get('http://localhost:4000/infos')
            .then(result => {
                if (result.data) {
                    setInfo(result.data);
                    setLoader(false);
                }
            })
            .catch((e) => {})
                .finally(() => {})
    },[refreshed])

    const handleAction=(infoId,e)=>{
       let event = e.target.name;
       let ids=infoId;
       if(event==='delete'){
        let confirm = window.confirm(`Do you want to ${event}`);
        if (confirm){
        setRefreshed(false);
        axios.delete(`http://localhost:4000/infos/${ids}`)
        .then(result => {
                    if (result.data.deletedCount === '0') { alert('Failed'); setRefreshed(false) }
                    else {
                        setRefreshed(true);
                    }
                })
                .catch(() => {})
                .finally(() => {})
        }
       }
       else if (event==='update'){
        navigate(`update/info/${ids}`)
       }
    }

    // useEffect(()=>{
    //     fetch('http://localhost:4000/infos')
    //     .then(res=>res.json())
    //     .then (result=>{
    //          setInfo(result);
    //     })
    // })

    return (
        <div>
            <h1>All Infos List {info.length||0}</h1>
            {
                !loader?<>
                {
                    info.map(list=>{
                    return <>
                    <li>Name: {list?.name} and Age: {list?.age}
                    <button name='delete' onClick={(e)=>handleAction(list?._id,e)}>Delete</button>
                    <button name='update' onClick={(e)=>handleAction(list?._id,e)}>Update</button>
                    </li>
                    </>
                })
                }
                </>:<h1>Still Loaded....</h1>
            }
        </div>
    );
};

export default Home;