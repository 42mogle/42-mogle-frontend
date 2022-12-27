import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar(props) {
  const { setSearchQuery } = props;

  const handleSearchQuery = (event) => {
    event.preventDefault();
    console.log(event.target.searchBar.value);
    setSearchQuery(event.target.searchBar.value);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}component="form" onSubmit={handleSearchQuery}>
      <TextField
        id="searchBar"
        label="Intra ID"
        variant="outlined"
        placeholder="Intra ID 를 입력하세요."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default SearchBar;
