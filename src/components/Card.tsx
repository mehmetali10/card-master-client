import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarIcon from '@mui/icons-material/Star';
import IosShareIcon from '@mui/icons-material/IosShare';

interface CardParticles {
    title: string;
    description: string;
    imgUri: string;
}

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

export default function Card(props: CardParticles) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = () => {
        //api call
    }
    
    const handleDelete = () => {
        //api call
    }

    return(
        <div className="card">
            <div className="card-header">
                <div className="card-title">
                {props.title}
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
                     <MenuItem onClick={handleClose} disableRipple>
                    <StarIcon />
                    add
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <IosShareIcon />
                        Share
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                    <DeleteIcon />
                    Delete
                    </MenuItem>
                </StyledMenu>
                </div>
            </div>
            <div className="card-description">{props.description}</div>
            <div className="card-img"><img src={props.imgUri} alt={props.title}  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "7px"}}/></div>
        </div>
    )
}