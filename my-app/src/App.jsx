import React, { useEffect, useState } from 'react'
import './App.css'
import './index.css'

function App() {
  const [data, setData] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  
  const tasks = [
    {
      id: 1,
      title: 'Do tasks1',
      description: 'Just do it. And everything will be fine',
      status: false
    },
    {
      id: 2,
      title: 'Do tasks2',
      description: 'Just do it. And everything will be fine',
      status: true
    },
    {
      id: 3,
      title: 'Do tasks3',
      description: 'Just do it. And everything will be fine',
      status: false
    },

  ]

  useEffect(()=> {
    setData(tasks);
  }, [])

  const handleDelete = (id) => {
    setData(data.filter((e) => e.id !== id));
  }

  function openAdd(){
    setIsOpenAdd(true);
  }

  function closeAdd(){
    setIsOpenAdd(false);
  }

  function openEdit(id){
    const taskEdit = data.find(e => e.id === id)
    setTask(taskEdit.title);
    setDesc(taskEdit.description);
    setEditTaskId(id);
    setIsOpenEdit(true);
  }

  function closeEdit(){
    setIsOpenEdit(false);
  }

  const handleAdd = () => {
    if (task == "" || desc == ""){
      alert("Please, try again");
      return;
    }

    let newTask = {
      id: Date.now(),
      title: task,
      description: desc,
    }
    setData([newTask, ...data]);
    setTask('')
    setDesc('')
    setIsOpenAdd(false)
  }

  const handleEdit = () => {
    if (task === "" || desc === "") {
      alert("Please, try again");
      return;
    }

    const updateData = data.map((e)=> {
      if(e.id === editTaskId) { 
       return {...e, title: task, description: desc}
      }else {
        return e;
      }  
    })
    setData(updateData);
    setIsOpenEdit(false);
  }

  const toogleChange = (id) => {
    const checked = data.map((e)=> {
      if(e.id === id){
        return {...e, status: !e.status}
      }else{
        return e;
      }
    })
    setData(checked);
  }

  return React.createElement(
        'div', 
       {
          className: 'w-[60%] m-auto h-[400px] mt-[8%]'
       },
       React.createElement(
        'button',
        {
          className: 'py-1 rounded text-white my-5 cursor-pointer px-4 bg-blue-600',
          onClick: openAdd,
        },
        'Add +',
       ),
       isOpenAdd && React.createElement(
        'div',
        {
          className: 'w-[300px] m-auto py-7 gap-5 flex flex-col justify-center items-center'
        },
        React.createElement(
          'input',
          {
            type: 'text',
            placeholder: 'Enter the task',
            className: 'border-2 border-blue-300 rounded-xl py-1 px-5',
            value: task,
            onChange:  (e) => setTask(e.target.value), 
          },
          null,
        ),
        React.createElement(
          'textarea',
          {
            type: 'text',
            placeholder: 'Enter the descript',
            className: 'border-2 border-blue-300 rounded-xl py-1 px-7',
            value: desc,
            onChange: (e) => setDesc(e.target.value),
          },
          null,
        ),
        React.createElement(
          'div',
          {
            className: 'flex gap-3'
          },
        React.createElement(
          'button',
          {
            className: 'py-1 rounded text-white cursor-pointer px-4 bg-blue-600',
            onClick: handleAdd
          },
          'Save'
        ),
        React.createElement(
          'button',
          {
            onClick: closeAdd,
            className: 'py-1 rounded text-white cursor-pointer px-4 bg-red-600'
          },
          'Cancel'
        ),
       )
      ),
      isOpenEdit && React.createElement(
        'div',
        {
          className: 'w-[300px] m-auto py-7 gap-5 flex flex-col justify-center items-center'
        },
        React.createElement(
          'input',
          {
            type: 'text',
            className: 'border-2 border-blue-300 rounded-xl py-1 px-5',
            value: task,
            onChange:  (e) => setTask(e.target.value), 
          },
          null,
        ),
        React.createElement(
          'textarea',
          {
            type: 'text',
            className: 'border-2 border-blue-300 rounded-xl py-1 px-7',
            value: desc,
            onChange: (e) => setDesc(e.target.value),
          },
          null,
        ),
        React.createElement(
          'div',
          {
            className: 'flex gap-3'
          },
        React.createElement(
          'button',
          {
            className: 'py-1 rounded text-white cursor-pointer px-4 bg-blue-600',
            onClick: handleEdit,
          },
          'Save'
        ),
        React.createElement(
          'button',
          {
            onClick: closeEdit,
            className: 'py-1 rounded text-white cursor-pointer px-4 bg-red-600'
          },
          'Cancel'
        ),
       )
      ),
       React.createElement(
         'div',
          {
            className: 'flex flex-wrap gap-10 items-center',
          },
          data.map((e)=> 
            React.createElement(
              'div',
              {
                className: "w-[280px] h-[150px] rounded flex flex-col items-center text-center justify-center shadow-2xl"
              },
              React.createElement(
                'h2',
                {
                  className: 'font-bold py-2 text-xl'
                },
                e.title
              ),
              React.createElement(
                'p',
                null,
                e.description
              ),
              React.createElement(
                "div",
                {className: 'flex gap-3 py-3 justify-center'},
                React.createElement(
                  'button',
                  {
                    className: 'py-1 rounded text-white cursor-pointer px-4 bg-red-600',
                    onClick: () => handleDelete(e.id),
                  },
                  "Delete",
                ),
                React.createElement(
                  'button',
                  {
                     className: 'py-1 rounded text-white cursor-pointer px-4 bg-blue-600',
                     onClick: () => openEdit(e.id),
                  },
                  "Edit",
                ),
                React.createElement(
                  'div',
                  {
                    className: 'flex gap-2 items-center'
                  },
                React.createElement(
                  'input',
                  {
                    type: 'checkbox',
                    className: 'w-[20px] h-[20px]',
                    onClick: () => toogleChange(e.id)
                  },
                  null,
                ),
                React.createElement(
                  'p',
                  {
                    style: { 
                     color: e.status ? 'green' : "red"
                    }
                  },
                  e.status ? "Active": "Inactive",
                )
              )
              )
            ),
          )
          )
       )
}

export default App