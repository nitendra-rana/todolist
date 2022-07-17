import React, { useState, useEffect } from 'react'
import './style.css'

const imgSrc = "https://cdn-icons-png.flaticon.com/128/6463/6463127.png"

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList")
    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}
const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData()); // <-- to get local data function instead of [] empty array
    const [isEditedItem, setEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add items to the list  
    const addItems = () => {
        if (!inputData) {
            alert("!Empty Item");
        } else if (toggleButton && inputData) {

            setItems(
                items.map((currElem) => {
                    if (currElem.id === isEditedItem) {
                        return { ...currElem, name: inputData }
                    }
                    return currElem;
                }));
            setInputData("")     //<--- to show value in input field
            setEditItem(null)
            setToggleButton(false)

        }

        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }
    //edit item
    const editItem = (index) => {
        const upItem = items.find((currElem) => {
            return currElem.id === index;
        })
        setInputData(upItem.name)     //<--- to show value in input field
        setEditItem(index)
        setToggleButton(true)
    }
    //delete items 
    const deleteItem = (index) => {
        const updateItem = items.filter((currElem) => {
            return currElem.id !== index; // except id match return all others
        })
        setItems(updateItem);

    }

    //remove all
    const removeAll = () => {
        setItems([]);
    }
    //use local storage 
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items));
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={imgSrc} alt="TODO LIST" />
                        <figcaption>Add List Items Here</figcaption>
                        <div>
                            <div className="addItems">
                                <input className="form-control" type="text"
                                    placeholder="✍️ start adding.........."
                                    value={inputData}
                                    onChange={(e) => setInputData(e.target.value)
                                    }
                                />
                                {
                                    toggleButton ? (<i className="far fa-edit add-btn" onClick={addItems}
                                    ></i>) : (
                                        <i className="fa fa-plus add-btn" onClick={addItems}></i>
                                    )
                                }

                            </div>
                            <div>
                                <div className="showItems">
                                    {/* show items here */
                                        items.map((currElem) => {
                                            return (
                                                <div className="eachItem" key={currElem.id}>
                                                    <h3>{currElem.name}</h3>
                                                    <div className="todo-btn">
                                                        <i className="far fa-edit add-btn"
                                                            onClick={() => editItem(currElem.id)}
                                                        ></i>
                                                        <i className="far fa-trash-alt add-btn"
                                                            onClick={() => deleteItem(currElem.id)}></i>
                                                    </div>
                                                </div>
                                            )
                                        })


                                    }


                                </div>
                            </div>
                            <div className="showItems">
                                <button className="btn effect04" data-sm-link-text="REMOVE ALL"
                                    onClick={() => removeAll()}>
                                    <span>OPEN LIST</span>
                                </button>
                            </div>
                        </div>
                    </figure>
                </div>

            </div>
        </>
    )
}

export default Todo