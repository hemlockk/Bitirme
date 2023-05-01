import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks=[
    {title:'katalog',path: '/catalog'},
    {title:'Hakkında',path: '/about'},
    {title:'iletişim',path: '/contact'}
]

const rightLinks=[
    {title:'Giriş',path: '/login'},
    {title:'kayıt',path: '/regiter'}
]

interface Props{
    darkMode: boolean;
    handleThemeChange: () => void;
}

const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography:'h6', 
    '&:hover':{color: 'grey.500'},
     '&.active':{color:'text.secondary'}
}

export default function Header({darkMode,handleThemeChange}: Props){
    return(
        <AppBar position='static'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box  display= 'flex' alignItems= 'center'>
                    <Typography 
                    variant='h6' 
                    component={NavLink} 
                    to='/' 
                    sx={navStyles}>
                        E-Ticaret
                    </Typography>  
                    <Switch checked={darkMode} onChange={handleThemeChange}></Switch>
                </Box>

                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title,path})=>(
                        <ListItem 
                        component={NavLink} 
                        to={path} 
                        key={path} 
                        sx={navStyles}>
                            {title.toUpperCase()}
                        </ListItem>
                        
                    ))}
                </List>

                <Box display= 'flex' alignItems= 'center'>
                    <IconButton size = 'large'  sx = {{color:'inherit'}}>
                            <Badge badgeContent={4} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                    </IconButton>
                    
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title,path})=>(
                            <ListItem 
                            component={NavLink}
                            to={path} 
                            key={path} 
                            sx={navStyles}>
                                {title.toUpperCase()}
                            </ListItem>
                            
                        ))}
                    </List>
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}