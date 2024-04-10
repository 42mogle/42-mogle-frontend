import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

function SearchBar(props) {
  const { searchQuery, setSearchQuery, onSubmit } = props;

  const handleSearchQuery = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.searchBar.value);
    onSubmit();
  };

  const handleResetButton = () => {
    setSearchQuery("");
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }} component="form" onSubmit={handleSearchQuery}>
      <TextField
        id="searchBar"
        label="Intra ID"
        variant="outlined"
        placeholder="Intra ID 를 입력하세요."
        size="small"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      <Button variant="text" onClick={handleResetButton}>
        초기화
      </Button>
    </Box>
  );
}

export default SearchBar;
