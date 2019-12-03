import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'


function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function PopUp(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*
    const onClickHandler = (event) => {                                                         
        
            fetch(`${props.baseEndpoint}/${props.item._id}`, {
                method: "PUT",
                body: JSON.stringify(),                                      
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(httpResult => {
                    if (httpResult.statusText === "OK") {
                        props.refresh()
                        handleClose()                              
                    }
                })
    }
    */

    return (
        <span>

            <IconButton onClick={handleOpen}>
                <EditOutlinedIcon color="secondary" value="EDIT"></EditOutlinedIcon>
            </IconButton>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}>

                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">EDIT PRODUCT</h2>
                    <p id="simple-modal-description">
                        <div>Edit your product here</div>
                        
                    </p>
                    <TextField
                        
                    />
                    <TextField
                        
                    />
                    <br></br>
                    <Button
                        
                        variant="contained"
                        
                    >Save</Button>
                    
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        
                    >Cancel</Button>
                </div>
            </Modal>
        </span>
    );
}