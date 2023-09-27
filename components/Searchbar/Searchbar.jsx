import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { StyledButton } from "../StyledButton/Button.styled";
import { StyledSearchbar } from "./Searchbar.styled";

export default function Searchbar({ handleSearchValue }) {
  function handleSearchInput(event) {
    event.preventDefault();
    const newFormdata = new FormData(event.target);
    const searchData = Object.fromEntries(newFormdata).search;
    handleSearchValue(searchData);
  }

  return (
    <StyledSearchbarForm onSubmit={handleSearchInput}>
      <StyledSearchbar type="text" name="search" />
      <StyledButton>
        <FiSearch />
      </StyledButton>
    </StyledSearchbarForm>
  );
}

const StyledSearchbarForm = styled.form`
  display: flex;
  gap: 0.7rem;
  height: 2rem;
`;
