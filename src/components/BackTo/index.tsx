import { Fragment } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';

type Props = {
    url: string
}

const BackTo = (props : Props) => {
    return (
        <Fragment>
            <Link to={props.url}>
                <KeyboardBackspaceIcon />
            </Link>
        </Fragment>
    )
}

export default BackTo