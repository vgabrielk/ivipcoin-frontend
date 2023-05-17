import { Button, Select, TextField } from "@mui/material"
import { Box, Container } from "@mui/system"
import { api } from '../../services/api';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import MenuItem from '@mui/material/MenuItem';
import BackTo from '../../components/BackTo';

const TaskStore = () => {

  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    title: '',
    status: 0
  })

  const handleInputChange = (event: any) => {
    setPayload({
      ...payload,
      [event.target.name]: event.target.value
    })
  }

  const createTask = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        task_title: payload.title || 'Nova tarefa',
        task_status: payload.status
      }
      await api.post('/task', data);
      toast.success("Created successfuly")
      setTimeout(() => {
        return navigate("/tasks")
      },1200)
    } catch (error) {
      toast.error("Error! ")
      console.log(error);
    }
  }

  return (

    <Container
      style={{ marginTop: '4rem' }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <BackTo url="/tasks" />
      <Box component="form" onSubmit={createTask} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Task title"
          name="title"
          autoFocus
          value={payload.title}
          onChange={handleInputChange}
        />
        <Select
          fullWidth
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={payload.status}
          label="Status"
          name='status'
          onChange={handleInputChange}
        >
          <MenuItem value={1}>Done</MenuItem>
          <MenuItem value={0}>To Do</MenuItem>
        </Select>
        <Button
          variant='contained'
          type="submit"
          style={{ margin: '20px 0' }}
        >
          Criar tarefa
        </Button>
      </Box>
    </Container>
  )
}

export default TaskStore