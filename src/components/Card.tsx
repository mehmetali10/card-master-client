import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ICardComponent } from '../models/ICard';


export default function Card(props: ICardComponent) {
    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickopenDialog = () => {
      setAnchorEl(null);
      setOpenDialog(true);
    };

    const handleClickCloseDialog = () => {
      setOpenDialog(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleDelete = async () => {
      setAnchorEl(null);
      props.onDeleteClick(props.id);
      setOpenDialog(false);
    }

    const handleUpdate = async () => {
      setAnchorEl(null)
      props.onUpdateClick(props.id);
    }

    return(
        <div className="card">
            <div className="card-header">
                <div className="card-title">
                {props.title}{props.isStarred && "🌟"}
                </div>
                <div className="card-options">
                <Button
                    id="demo-customized-button"
                    onClick={handleClick}
                >
                    <MoreHorizIcon className='options-icon'/>
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                     <MenuItem onClick={handleUpdate} disableRipple>
                        {props.isStarred ? <StarBorderIcon /> :<StarIcon />}
                        {props.isStarred ? "remove":"add"}
                    </MenuItem>
                    <MenuItem onClick={handleClickopenDialog} disableRipple>
                        <DeleteIcon />
                        Delete
                    </MenuItem>
                </StyledMenu>
                </div>
            </div>
            <div className="card-description">{props.description}</div>
            <div className="card-img"><img src={props.downloadedUri} alt={props.title}  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "7px"}}/></div>
            
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Card"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure delete the card
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDialog}>NO</Button>
          <Button onClick={handleDelete}>YES</Button>
        </DialogActions>
      </Dialog>

        </div>
    )
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 130,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[900],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));