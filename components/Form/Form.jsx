import { StyledButton } from "../StyledButton/Button.styled";
import { StyledInput } from "../StyledInput/Input.styled";
import { StyledSection } from "../StyledSection/Section.styled";
import { StyledForm, StyledTextarea } from "./Form.styled";

export default function Form({ handleSubmit, placeholders }) {
  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="restaurant">Name:</label>
        <StyledInput
          type="text"
          name="restaurant"
          id="restaurant"
          defaultValue={placeholders?.restaurant}
        />

        <label htmlFor="rating">Rating:</label>
        <select name="rating" id="rating">
          {placeholders?.rating === "red" ? (
            <option value="red" selected>
              Bad
            </option>
          ) : (
            <option value="red">Bad</option>
          )}
          {placeholders?.rating === "yellow" ? (
            <option value="yellow" selected>
              Mediocre
            </option>
          ) : (
            <option value="yellow">Mediocre</option>
          )}
          {placeholders?.rating === "green" ? (
            <option value="green" selected>
              Good
            </option>
          ) : (
            <option value="green">Good</option>
          )}
        </select>

        <label htmlFor="text">Your text:</label>
        <StyledTextarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          defaultValue={placeholders?.text}></StyledTextarea>

        <label htmlFor="city">City:</label>
        <StyledInput
          type="text"
          name="city"
          id="city"
          defaultValue={placeholders?.city}
        />

        <br />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </StyledSection>
  );
}
