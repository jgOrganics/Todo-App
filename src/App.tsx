import React, { FC, useState } from "react";
import "./App.css";
import { ITask } from "./Interfaces";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Delete, Edit, Update } from "@mui/icons-material";
import { v4 as uuid } from 'uuid';
import styled from "@emotion/styled";
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [taskDetails, setTaskDetails] = useState<string>('');
  const [itemId, setItemId] = useState<number>(0);
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [error,setError] =useState<String>('');
  const Error=styled(Typography)
  `background:red;
   color:#fff;
   padding:10px;
   width:50%;
  `
  const handleChange = (event: any): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const handleTaskDetails = (event: any): void => {
      setTaskDetails(event.target.value);
  };

  const editedTask = (id: number, task: ITask): void => {
    if(!task && !taskDetails && !deadline)
    {
        setError('All fields are mendatory');
        return;
    }
    if (id === task.id) {
      setTask(task.taskName);
      setTaskDetails(task.taskDetails);
      setDealine(task.deadline);
    }
  };
  const addTask = (): void => {
    if(!task && !taskDetails && !deadline)
    {
        setError('All fields are mendatory');
         return;
    }
    const newTask = {
      id: uuid(), taskName: task, deadline: deadline, taskDetails: taskDetails
    };
    setTodoList([...todoList, newTask]);
    setItemId(uuid());
    setTask("");
    setTaskDetails('');
    setDealine(0);
    console.log();
  };


  const UpdateTask = (id: number): void => {
    const newTask = { id: id, taskName: task, deadline: deadline, taskDetails: taskDetails };
    console.log(newTask);
    setTodoList((todoList) =>
      todoList.map((task) =>
      (
        task.id === id ? newTask : task
      ))
    );
  };

  const completeTask = (taskNameToDelete: number): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.id !== taskNameToDelete;
      })
    );
  };

  return (
    <Box sx={{ margin: 10, my: 5 }} >
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
      <br />
      <br />
      <Button onClick={addTask}
        variant="outlined"
        size="large">
        Add Task
      </Button>
      {error &&  <Error>{error}</Error>}
      <Box sx={{}}>
        <TableContainer>
          <TableHead >
            <TableCell align="center" sx={{ bgcolor: 'skyblue', color: 'white', width: 250, margin: 'auto', }} >
              Task Details
            </TableCell>
          </TableHead>
          <Table aria-label="contact table">
            <TableBody>
              <TableCell sx={{ bgcolor: 'black', color: 'white', flex: 1 }} >
                SL NO
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
                        editedTask(
                          task.id,
                          task);
                      }}
                    />
                    <Update sx={{ color: "black", }}
                      onClick={() => {
                        UpdateTask(
                          task.id

                        )
                      }}
                    />
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