import { Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import { api } from '../../services/api';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import ReactPaginate from 'react-paginate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type TaskType = {
    id: string,
    task_title: string,
    task_status: number
}

const Tasks = () => {
    const [loading, setLoading] = useState(false);
    const [taskData, setTaskData] = useState<TaskType[]>([]);
    const [taskFilter, setTaskFilter] = useState<TaskType[]>([]);
    const [result, setResult] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [tasksPerPage] = useState(5);

    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await api.get('/tasks');
            if (result === '') {
                setTaskData(response.data);
            }
            setTaskFilter(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setResult(evt.target.value);
    };

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        const results = taskFilter.filter((resp: TaskType) =>
            resp.task_title.toLowerCase().includes(result.toLowerCase())
        );
        setTaskData(results);
    }, [result, taskFilter]);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = taskData.slice(indexOfFirstTask, indexOfLastTask);
    const pageCount = Math.ceil(taskData.length / tasksPerPage);


    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <Container style={{ marginTop: '4rem' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <PersonIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    Task list
                </Typography>
            </Toolbar>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Search by Name"
                    name="title"
                    autoFocus
                    value={result}
                    onChange={onChange}
                />
            </Box>
            <List component="nav" aria-label="mailbox folders">
                {loading ? (
                    <h5>Loading...</h5>
                ) : (
                    <>
                        {!taskData.length && 'No task registered'}
                        {currentTasks.map((item: TaskType) => (
                            <Fragment key={item.id}>
                                <Link to={`/task/${item.id}`}>
                                    <ListItem button>
                                        <ListItemText primary={item.task_title} />
                                        <span>{item.task_status === 1 ? '🟢' : '🟠'}</span>
                                    </ListItem>
                                </Link>
                                <Divider />
                            </Fragment>
                        ))}
                    </>
                )}
            </List>
            <ReactPaginate
                previousLabel={<ArrowBackIcon/>}
                nextLabel={<ArrowForwardIcon/>}
                onPageChange={handlePageClick   }
                pageCount={pageCount}
                renderOnZeroPageCount={null}
            />

        </Container>
    )
}

export default Tasks