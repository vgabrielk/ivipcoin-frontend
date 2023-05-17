import './style.css'

import { SpeedDial } from '@mui/material';
import { SpeedDialIcon } from '@mui/material';
import { SpeedDialAction } from '@mui/material';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const DialogComponent = () => {
    const actions = [
        {
            icon: <EditIcon />,
            name: 'Create task',
            link: "/tasks/create"
        },
        {
            icon: <AddIcon />,
            name: 'Tasks',
            link: "/tasks"
        }
    ];

    const redirectTo = (link: any) => {
        window.location.href= link
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);


    } 
    const handleClose = () => setOpen(false);
    return (
        <SpeedDial
            className='dialog'
            ariaLabel="SpeedDial"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onClick={handleOpen}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={() => redirectTo(action.link)}
                />
            ))}
        </SpeedDial>
    )
}

export default DialogComponent