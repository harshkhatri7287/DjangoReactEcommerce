import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddProduct from './addProduct';

const Search = styled('div')({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 4,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  width: '60%',
  marginInline:'20%'
});

const SearchIconWrapper = styled('div')({
  padding: '8px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
});

const StyledInputBase = styled(InputBase)({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '8px',
    paddingLeft: 'calc(1em + 32px)',
    transition: 'width 0.4s',
    width: '100%',
  },
});



export default function Navbar({userData, setSearched}) {

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleAddProduct = () => {
    setOpenAddProduct(true);
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: (!userData || !userData.superuser) ? 'green' : '' }}>
        <Toolbar >
          <Link to='/'  style={{ textDecoration: 'none' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{display: { xs: 'none', sm: 'block'},  textDecoration:"none" , backgroundColor:'yellow',  borderRadius:'5px' , color:'black', padding:'7px'} }
          >
            KARTON
          </Typography>
          </Link>
          {(userData && userData.superuser) ? (
              <Button  variant="contained" sx={{ marginLeft: '10px', backgroundColor:"yellow", color:"black", padding:'7px' , width:'250px'}}
                onClick={handleAddProduct}
              > <Typography variant="body1">ADD PRODUCT</Typography></Button>
          ):(null)}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search anything.."
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput}
              onChange={(e)=>{setSearchInput(e.target.value);}}
              onKeyDown={(e)=>{if (e.key === 'Enter') {
                setSearched(searchInput);
              }}}
            />
          </Search>
          <div style={{ marginLeft: 'auto', display:"flex", flexDirection:"row" }}>
          {userData ? (
            <Link to="/cart" style={{ color: 'white' }}>
            <Button color="inherit" sx={{ marginLeft: 1, marginRight: 1 }}><ShoppingCartIcon/> Cart</Button>
              </Link>
          ) : (null)}
          {userData ? (
            <Link to="/profile" style={{ color: 'white' }}>
              <Button color="inherit" sx={{ marginLeft: 1, marginRight: 1 }}>
                <PersonIcon /> {userData.first_name}
              </Button>
            </Link>
          ) : (
            <Link to="/login" style={{ color: 'white' }}>
              <Button color="inherit" sx={{ marginLeft: 1, marginRight: 1 }}>
                <PersonIcon /> Login
              </Button>
            </Link>
          )}
          </div>
        </Toolbar>
      </AppBar>
      <AddProduct
            open={openAddProduct}
            onClose={() => setOpenAddProduct(false)}
          />
    </Box>
  );
}