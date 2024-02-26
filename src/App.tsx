import React, { FC, useState } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [taskDetails, setTaskDetails] = useState<string>('');
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);


  const handleChange = (event:any): void => {
    if (event.target.name === "task" ) {
      setTask(event.target.value);
    } else{
      setDealine(Number(event.target.value));
    }
  };

  const handleTaskDetails = (event:any): void => {
      setTaskDetails(event.target.value);
   
  };

  const editedTask = (taskNDeadline: number ,task:ITask): void => {
       console.log(taskNDeadline);
       if(taskNDeadline === task.deadline)
          {
                setTask(task.taskName); 
                setTaskDetails(task.taskDetails);
                setDealine(task.deadline);  
          }
  };
  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline,taskDetails: taskDetails  };
    setTodoList([...todoList, newTask]);
    setTask("");
    setTaskDetails('');
    setDealine(0);
  };

  const UpdateTask = (): void => {
    const newTask = { taskName: task, deadline: deadline ,taskDetails: taskDetails };
    console.log(newTask);
       setTodoList((todoList) =>
       todoList.map((task)=>(task.deadline ===deadline ?newTask :task))
     );
    
  };
  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  return (
   
      <Box  sx={{  margin: 10,my: 5  }} >
        <TextField 
         placeholder="Task Name"
         name="task"
         value={task}
         onChange={handleChange}
        />
        <TextField 
         type="text"
         placeholder="Task Details"
         name="taskDetails"
         value={taskDetails}
         onChange={handleTaskDetails}
        />
          <TextField 
          type="number"
          placeholder="Deadline (in Days)..."
          name="deadline"
          value={deadline}
          onChange={handleChange}
        />
          <br/>
        <br/>
        <Button onClick={addTask}
        variant="outlined"
         size="large"
       >
         Add Task
        </Button>
        <Button 
        onClick={UpdateTask}
        variant="outlined"
         size="large"
       >
         Update Task
        </Button>
        
      <Box sx={{}}>
      
        <TableContainer>
        <TableHead >
          <TableCell align="center" sx={{bgcolor:'skyblue',color:'white',width:250, margin: 'auto', }} >
                        Task Details
                </TableCell>
               
        </TableHead>
          <Table aria-label="contact table">
           <TableBody>
           <TableCell sx={{bgcolor:'black',color:'white',flex:1}} >
                         Days
                                      </TableCell>
            <TableCell sx={{bgcolor:'black',color:'white',flex:1}} >
                        Task Name 
                                      </TableCell>
                <TableCell sx={{bgcolor:'black',color:'white',width:2,alignContent:"center"}} >
                        Task Details
                </TableCell>
                <TableCell sx={{bgcolor:'black',color:'white',width:2}} >
                        Task Operations
                </TableCell>
            {todoList.map((task: ITask, key: number) => {
            return(
              <TableRow>
                <TableCell>
                <span style={{alignItems:"start",alignContent:"end"}} > {task.deadline} </span>
                </TableCell>
                <TableCell>
                <span style={{textAlign:"center"}}>{task.taskName}</span>
                </TableCell>
                <TableCell>
                <span style={{textAlign:"center"}}>{task.taskDetails}</span>
                </TableCell>
                <Delete
                sx={{ color: "red", }} 
                onClick={() => {
                  completeTask(task.taskName);
                }}
                />
                <Edit sx={{ color: "black", }}
                onClick={() => {
                  editedTask(task.deadline ,task);
                }}
                />
              </TableRow>
                )})}
                 
              </TableBody>
          
            
          </Table>
        </TableContainer>
        </Box> 
        </Box> 
  );
};

export default App;