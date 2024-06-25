import React, { useEffect, useState } from 'react'


const getLocalItems=()=>{
    let list=localStorage.getItem("lists");
    console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return[];
    }
}
const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [item, setItem] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem=()=>{
        if(!inputData){
            alert("Please Fill Data")
        }else if(inputData && !toggleSubmit){
            setItem(
                item.map((element)=>{
                    if(element.id === isEditItem){
                        return{...element, name:inputData}
                    }
                    return element;
                })
            ) 
            setToggleSubmit(true);
            setInputData("");
            setIsEditItem(null);   
        }
        else{
            const allInputData={id:new Date().getTime().toString(), name:inputData}
            setItem([...item, allInputData]);
            setInputData('');
        }
    }

    const deleteItem=(index)=>{
        const updateItem = item.filter((element)=>{
            return index !== element.id;
        });
        setItem(updateItem);
    }

    const editItem=(id)=>{
        let newEditItem= item.find((element)=>{
            return element.id === id;
        });
        console.log(newEditItem);

            setToggleSubmit(false);
            setInputData(newEditItem.name);
            setIsEditItem(id);
    }

    const RemoveAll=()=>{
        setItem([]);
    }

    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(item))
    },[item]);
  return (
    <>
        <div className='container h-100 d-flex align-items-center justify-content-center bg-success'>
            <div className="row align-center">
                <div className="col-lg-12 align-self-center">
                    <h1 className='text-danger text-center p-4'>Todo App</h1>
                    <div className='mt-3'>
                        <input type='text' className='form-control-lg' placeholder='AddTask' value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                        {
                            toggleSubmit ? <button className='btn btn-lg btn-primary'> <i className='fa fa-plus add-btn' title='add Item' onClick={addItem}></i> </button> : <button className='btn btn-lg btn-info'> <i className='fa fa-edit add-btn' title='update Item' onClick={addItem}></i> </button>
                        }
                    </div>
                    <table className="table table-bordered text-center p-2 mt-5">
                        <thead>
                                <tr>
                                    <th> Name</th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                item.map((element)=>{
                                    return(
                                        <tr key={element.id}>
                                            <td>{element.name}</td>
                                            <td>
                                            <button className='btn btn-md btn-info'><i className='fa fa-edit add-btn' title='Edit Item' onClick={()=>editItem(element.id)}></i></button>
                                            <button className='btn btn-md btn-danger'><i className='fa fa-trash-alt add-btn' title='Delete Item' onClick={()=>deleteItem(element.id)}></i></button>
                                            </td>    
                                        </tr>
                                        
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className='text-center mb-4'>
                        <button className='btn btn-md btn-danger'onClick={RemoveAll}>Remove All</button>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Todo
