import React, { FC, useState } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
// import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { v4 as uuid } from 'uuid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TableCell, TableBody, TableRow, TextField, TableContainer, Typography, Box, TableHead, Table } from "@mui/material";
import styled from "@emotion/styled";

const App = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDetails, setTaskDetails] = useState<string>('');
  const [itemId, setItemId] = useState<number>(0);
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [error, setError] = useState<String>('');
  const [open, setOpen] = useState(false);
  const [editTaskName, setEditTaskName] = useState<string>("");
  const [editTaskDetails, setEditTaskDetails] = useState<string>('');
  const [editDeadline, setEditDealine] = useState<number>(0);

  const Error = styled(Typography)
    `background:red;
     color:#fff;
     padding:10px;
     width:50%;
  `
  const handleChange = (event: any): void => {
    if (event.target.name === "taskName") {
      setTaskName(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const handleChangeEdit = (event: any): void => {
    if (event.target.name === "editTaskName") {
      setEditTaskName(event.target.value);
    } else {
      setEditDealine(Number(event.target.value));
    }
  };

  const handleTaskDetails = (event: any): void => {
    setTaskDetails(event.target.value);
  };
  const handleEditTaskDetails = (event: any): void => {
    setEditTaskDetails(event.target.value);
  };

  const addTask = (): void => {
    if (!taskName && !taskDetails && !deadline) {
      setError('All fields are mendatory');
      return;
    }
    const newTask = {
      id: itemId, taskName: taskName, deadline: deadline, taskDetails: taskDetails
    };
    setTodoList([...todoList, newTask]);
    setItemId(uuid());
    setTaskName("");
    setTaskDetails('');
    setDealine(0);
    setError('');
  };

  const UpdateTask = (id: number): void => {
    const newTask = { id: id, taskName: editTaskName, deadline: editDeadline, taskDetails: editTaskDetails };
 
    setTodoList((todoList) =>
      todoList.map((task) =>
      (
        task.id === id ? newTask : task
      ))
    );

    setItemId(uuid());
    setEditTaskName("");
    setEditTaskDetails('');
    setEditDealine(0);
    setOpen(false);
  };

  const completeTask = (taskIDToDelete: number): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.id !== taskIDToDelete;
      })
    );
  };

  const handleOpen = (id: number, task: ITask) => {
    setOpen(true);
    if (!task && !taskDetails && !deadline) {
      setError('All fields are mendatory');
      return;
    }
    if (id === task.id) {
      setEditTaskName(task.taskName);
      setEditTaskDetails(task.taskDetails);
      setEditDealine(task.deadline);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };
  
  return (

    <Box sx={{ margin: 10, my: 5,padding:25 }} >
      
      <TextField
        placeholder="Task Name"
        name="taskName"
        value={taskName}
        onChange={handleChange}
        style={{margin:"2px "}}
      />
   
      <TextField
        type="text"
        placeholder="Task Details"
        name="taskDetails"
        value={taskDetails}
        onChange={handleTaskDetails}
        style={{margin:"0px 0px 0px 50px "}}
      />
      <TextField
        type="number"
        placeholder="Deadline (in Days)..."
        name="deadline"
        value={deadline}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{margin:"0px 0px 0px 50px ",
          
      }}
      />
      <br />
      <br />
      <Box   style={{ display: ""}}>
      <Button 

      onClick={addTask}
        variant="outlined"
        size="large">
        Add Task
      </Button>
      </Box>
  
      <br />
      <br />
      {error && <Error>{error}</Error>}
      <Box sx={{}}>
        <TableContainer>
          <TableHead>
            <TableCell align="center" sx={{
              bgcolor: 'skyblue',
              color: 'white',
              width: 300,
              alignItems: "center",
              alignSelf: "center",
            }} >
              Task Details
            </TableCell>
          </TableHead>
          <Table aria-label="contact table">
            <TableBody>
              <TableCell sx={{ bgcolor: 'black', color: 'white', flex: 1 }} >
                Sl No
              </TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', flex: 1 }} >
                Days
              </TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', flex: 1 }} >
                Task Name
              </TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', width: 2, alignContent: "center" }} >
                Task Details
              </TableCell>
              <TableCell sx={{ bgcolor: 'black', color: 'white', width: 2 }} >
                Task Operations
              </TableCell>
              {todoList.map((task: ITask, key: number) => {
                return (
                  <TableRow>
                    <TableCell>
                      <span style={{ alignItems: "start", alignContent: "end" }} >{key} </span>
                    </TableCell>
                    <TableCell>
                      <span style={{ alignItems: "start", alignContent: "end" }} > {task.deadline} </span>
                    </TableCell>
                    <TableCell>
                      <span style={{ textAlign: "center" }}>{task.taskName}</span>
                    </TableCell>
                    <TableCell>
                      <span style={{ textAlign: "center" }}>{task.taskDetails}</span>
                    </TableCell>
                    <Delete
                      sx={{ color: "red", }}
                      onClick={() => {
                        completeTask(task.id);
                      }}
                    />
                    <Edit sx={{ color: "black", }}
                      onClick={() => {
                        handleOpen(
                          task.id,
                          task);
                      }}
                    />
                    <Dialog open={open}
                    // onClose={handleClose}
                    >
                      <DialogTitle>Edit Data</DialogTitle>
                      <DialogContent>
                        <TextField
                          placeholder="Task Name"
                          name="editTaskName"
                          value={editTaskName}
                          onChange={handleChangeEdit}
                        />
                        <TextField
                          type="text"
                          placeholder="Task Details"
                          name="editTaskDetails"
                          value={editTaskDetails}
                          onChange={handleEditTaskDetails}
                        />
                        <TextField
                          // type="number"
                          placeholder="Deadline (in Days)..."
                          name="editDeadline"
                          value={editDeadline}
                          onChange={handleChangeEdit}
                        />

                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => {
                          UpdateTask(task.id);
                        }}

                          color="primary">
                          update
                        </Button>
                      </DialogActions>
                      <DialogActions>
                        <Button onClick={() => {
                          handleClose();
                        }}

                          color="primary">
                          CLose
                        </Button>
                      </DialogActions>
                    </Dialog>

                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default App;