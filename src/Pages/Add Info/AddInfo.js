import React,{useState} from 'react';
import axios from 'axios';

 const AddInfo = () => {
    const [singleInfo, setSingleInfo] = useState({
        name: '',
        age: ''
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Take Input from Form 
    const handleInput = e => {
        const copyInfo = { ...singleInfo };
        copyInfo[e.target.name] = e.target.value;
        setSingleInfo(copyInfo);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false)
        setError(false)
        axios.post('http://localhost:4000/infos', singleInfo)
            .then(result => {
                if (result.data.status === 401) { setError(true) }
                else { setSuccess(true) }
            })
            .catch(e => setError(true))
            .finally(() => e.target.reset())
    };

    return (
        <>
                <h1>Add New Info</h1>
                {
                    success && <div>
                        <strong>Added!</strong> New Cycle.
                        <button type="button" onClick={() => setSuccess(false)}></button>
                        <br />
                    </div>
                }
                {
                    error && <div>
                        <strong>Failed!</strong> To Add Cycle.
                        <button type="button" onClick={() => setError(false)}></button>
                        <br />
                    </div>
                }
                <form onSubmit={handleSubmit} autoComplete="off">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Provide User Name"
                                required
                                onBlur={handleInput}
                            />

                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                placeholder="Age"
                                required
                                onBlur={handleInput}
                            />
                    <button>Add Info</button>
                </form>
        </>
    );
};

export default AddInfo;