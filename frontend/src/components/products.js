import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Pagination,
  Box,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import ProductCard from "./productDisplayHome";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Product({ searched }) {
  // State Variablese

  const [searchedProductData, setSearchedProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);

  const fetchSearchedData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/search/?searched=${searched}`
      );
      const data = await response.json();
      setSearchedProductData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetching Searched Data or All Data

  useEffect(() => {
    const fetchData = async () => {
      await fetchSearchedData();
    };

    fetchData();
  }, [searched]);

  // Filteration and Pagination of Searched Data

  useEffect(() => {
    if (searchedProductData) {
      const filterProducts = (product) => {
        return (
          (selectedCategory === "" || product.category === selectedCategory) &&
          (selectedBrand === "" || product.brand === selectedBrand) &&
          (minPrice === "" || product.price >= parseInt(minPrice)) &&
          (maxPrice === "" || product.price <= parseInt(maxPrice))
        );
      };
      const filtered = searchedProductData.filter(filterProducts);
      setFilteredProductData(filtered);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const paginated = filteredProductData.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setCurrentItems(paginated);
    }
  }, [filteredProductData , currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleClearFilter = () => {
    setMaxPrice("");
    setMinPrice("");
    setSelectedBrand("");
    setSelectedCategory("");
  }

  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "mobiles", label: "Mobiles" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home" },
    { value: "sport", label: "Sport" },
  ];

  const brandOptions = [
    { value: "apple", label: "Apple" },
    { value: "hp", label: "HP" },
    { value: "acer", label: "Acer" },
    { value: "adidas", label: "Adidas" },
    { value: "honor", label: "Honor" },
    { value: "samsung", label: "Samsung" },
    { value: "stag", label: "Stag" },
    { value: "boat", label: "Boat" },
    { value: "asus", label: "Asus" },
  ];

  return (
    <Grid container>
      <Grid item xs={2} display={"flex"} flexDirection={"column"} style={{ borderRight: "1px solid black" }}>
        <Box style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "30px",
              justifyContent:"center",
              alignContent:"center",
              
              
            }}>

            <Button onClick={handleClearFilter} variant="outlined" color="error" style={{marginBottom:"20px"}} >Clear Filters  </Button>

            
            <Typography variant="h6" textAlign={"center"} marginBottom={"15px"}>
              PRICE
            </Typography>
            
            <TextField
              label="Min Price"
              type="number"
              value={minPrice}
              onChange={(e) => {setMinPrice(e.target.value);}}
              style={{width:"60%", alignSelf:"center"}}
            />

            <TextField
              label="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => {setMaxPrice(e.target.value);}}
              style={{ margin: "20px", width:"60%", alignSelf:"center"}}
            />
        </Box>
        <Box
          sx={{
            alignContent: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <FormControl>
          <Typography id="brand" variant="h6" textAlign={"center"} marginBottom={"15px"}>
              BRAND
            </Typography>
            <RadioGroup
              aria-labelledby="brand"
              value={selectedBrand}
              onChange={(e) => {setSelectedBrand(e.target.value);}}
            >
              {brandOptions.map((brand) => (
                <FormControlLabel
                  key={brand.value}
                  value={brand.value}
                  control={<Radio />}
                  label={brand.label}
                  
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid
        item
        xs={10}
        sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
      >
        <Box
          sx={{
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            justifyContent:"center",
          }}
        >
          <FormControl  >
            <ToggleButtonGroup
              id="category-group"
              value={selectedCategory}
              exclusive
              onChange={(e, value) => {setSelectedCategory(value);}}
              aria-label="Category"
            >
              {categoryOptions.map((category) => (
                <ToggleButton
                  key={category.value}
                  value={category.value}
                  aria-label={category.label}
                  style={{width:"200px", color:"black", padding:"20px"}}>
                  <Typography fontSize={"large"}>{category.label}</Typography>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {currentItems.map((product, index) => (
            <ProductCard product={product} key={index}></ProductCard>
          ))}
        </Box>

        <div
          style={{
            margin: "auto",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Pagination
            count={Math.max(1, Math.ceil(filteredProductData.length / itemsPerPage))}
            page={currentPage}
            onChange={handlePageChange}
            color="success"
            size="large"
          />
        </div>
      </Grid>
    </Grid>
  );
}
