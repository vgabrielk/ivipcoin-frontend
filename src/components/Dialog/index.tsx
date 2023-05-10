import './style.css'

import { SpeedDial } from '@mui/material';
import { SpeedDialIcon } from '@mui/material';
import { SpeedDialAction } from '@mui/material';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';

const DialogComponent = () => {
    const actions = [
        {
            icon: <LogoutIcon />,
            name: 'Sair'
        },
        {
            icon: <EditIcon />,
            name: 'Tarefas'
        },
        {
            icon: <PersonIcon />,
            name: 'Perfil'
        },
    ];
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
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
                    onClick={handleClose}
                />
            ))}
        </SpeedDial>
    )
}

export default DialogComponent