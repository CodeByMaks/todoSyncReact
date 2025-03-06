import React, { useEffect, useState } from 'react'
import './App.css'
import './index.css'

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

const initialTasks: Task[] = [
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

const App:React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  useEffect(()=> {
    setData(initialTasks);
  }, [])

  const handleDelete = (id:number) => {
    setData(data.filter((e) => e.id !== id));
  }

  function openAdd(){
    setIsOpenAdd(true);
  }

  function closeAdd(){
    setIsOpenAdd(false);
  }

  function openEdit(id:number){
    const taskEdit = data.find(e => e.id === id)
    if (!taskEdit) return;
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
      status: false,
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

  const toggleChange = (id: number) => {
    const checked = data.map((e)=> {
      if(e.id === id){
        return {...e, status: !e.status}
      }else{
        return e;
      }
    })
    setData(checked);
  }

  return (
    <div className="w-[60%] m-auto h-[400px] mt-[8%]">
      <button className="py-1 rounded text-white my-5 cursor-pointer px-4 bg-blue-600" onClick={openAdd}>
        Add +
      </button>

      {isOpenAdd && (
        <div className="w-[300px] m-auto py-7 gap-5 flex flex-col justify-center items-center">
          <input type="text" placeholder="Enter the task" className="border-2 border-blue-300 rounded-xl py-1 px-5" value={task} onChange={(e) => setTask(e.target.value)} />
          <textarea placeholder="Enter the description" className="border-2 border-blue-300 rounded-xl py-1 px-7" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="flex gap-3">
            <button className="py-1 rounded text-white cursor-pointer px-4 bg-blue-600" onClick={handleAdd}>Save</button>
            <button className="py-1 rounded text-white cursor-pointer px-4 bg-red-600" onClick={closeAdd}>Cancel</button>
          </div>
        </div>
      )}

      {isOpenEdit && (
        <div className="w-[300px] m-auto py-7 gap-5 flex flex-col justify-center items-center">
          <input type="text" className="border-2 border-blue-300 rounded-xl py-1 px-5" value={task} onChange={(e) => setTask(e.target.value)} />
          <textarea className="border-2 border-blue-300 rounded-xl py-1 px-7" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="flex gap-3">
            <button className="py-1 rounded text-white cursor-pointer px-4 bg-blue-600" onClick={handleEdit}>Save</button>
            <button className="py-1 rounded text-white cursor-pointer px-4 bg-red-600" onClick={closeEdit}>Cancel</button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-10 items-center">
        {data.map(task => (
          <div key={task.id} className="w-[280px] h-[150px] rounded flex flex-col items-center text-center justify-center shadow-2xl">
            <h2 className="font-bold py-2 text-xl">{task.title}</h2>
            <p>{task.description}</p>
            <div className="flex gap-3 py-3 justify-center">
              <button className="py-1 rounded text-white cursor-pointer px-4 bg-red-600" onClick={() => handleDelete(task.id)}>Delete</button>
              <button className="py-1 rounded text-white cursor-pointer px-4 bg-blue-600" onClick={() => openEdit(task.id)}>Edit</button>
              <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-[20px] h-[20px]" checked={task.status} onChange={() => toggleChange(task.id)} />
                <p style={{ color: task.status ? 'green' : 'red' }}>{task.status ? 'Active' : 'Inactive'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App