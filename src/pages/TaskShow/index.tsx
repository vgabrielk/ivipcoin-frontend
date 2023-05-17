import { Button, Container, IconButton, MenuItem, Select, Skeleton, TextField, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/system';


import toast, { Toaster } from 'react-hot-toast';

import InfoIcon from '@mui/icons-material/Info';
import BackTo from '../../components/BackTo';

type TaskType = {
    id: string,
    task_title: string,
    task_status: number
}

const TaskShow = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [task_data, setTaskData] = useState<TaskType>({
        id: '', task_title: '',
        task_status: 0
    });

    const [payload, setPayload] = useState({
        task_title: '',
        task_status: task_data.task_status
    })

    const handleInputChange = (event: any) => {
        setPayload({
            ...payload,
            [event.target.name]: event.target.value
        })
    }

    const getTask = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/task/${params.id}`);
            setPayload({
                ...payload,
                task_title: response.data.task_title,
                task_status: response.data.task_status
            })
            setLoading(false);

        } catch (error) {
            console.log(error);
            toast.error("Error!")
            setLoading(false);
        }
    }

    const deleteTask = async () => {
        try {
            await api.delete(`/task/${params.id}`);
            toast.success("Deleted successfuly")
            setTimeout(() => {
                return navigate("/tasks")
            },1200)
        } catch (error) {
            toast.error("Error!")
            console.log(error);
        }
    }


    const updateTask = async (e: any) => {
        e.preventDefault();
        try {
            const data = {
                task_title: payload.task_title || task_data.task_title,
                task_status: payload.task_status
            }
            if (payload.task_title == '') {
                return;
            }
            const response = await api.put(`/task/${params.id}`, data);
            setTaskData(response.data);
            toast.success("Updated successfuly")
            setTimeout(() => {
                return navigate("/tasks")
            },1200)

        } catch (error) {
            toast.error("Error!")
            console.log(error);
        }
    }


    useEffect(() => {
        getTask()
    }, [])

    return (
        <Container
            style={{ marginTop: '4rem' }}
        >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <BackTo url="/tasks" />
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" style={{ padding: 0 }} sx={{ mr: 1, }}>
                    <InfoIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Details
                </Typography>
            </Toolbar>
            <Box component="form" onSubmit={updateTask} noValidate sx={{ mt: 1 }}>
                {loading ? (
                    <>
                        <Skeleton animation='wave' height={80} />
                        <Skeleton animation='wave' height={80} />
                        <div style={{ display: 'flex' }}>
                            <Skeleton animation='wave' height={60} width={90} />
                            <Skeleton animation='wave' height={60} sx={{ ml: 2 }} width={90} />
                        </div>
                    </>
                ) : (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            name="task_title"
                            label="Task title"
                            autoFocus
                            value={payload.task_title}
                            onChange={handleInputChange}
                        />
                        <Select
                            fullWidth
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={payload.task_status}
                            name='task_status'
                            onChange={handleInputChange}
                        >
                            <MenuItem value={1}>Done</MenuItem>
                            <MenuItem value={0}>To Do</MenuItem>
                        </Select>
                        <Button
                            style={{ margin: '20px 10px 0px 0px' }}
                            variant="contained"
                            type="submit"
                        >
                            Update
                        </Button>
                        <Button
                            onClick={deleteTask}
                            style={{ margin: '20px 10px 0px 0px' }}
                            variant="outlined"
                        >
                            Delete
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    )
}

export default TaskShow