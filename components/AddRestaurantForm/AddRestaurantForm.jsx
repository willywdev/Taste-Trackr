import { StyledButton } from "../StyledButton/Button.styled";
import { StyledSection } from "../StyledSection/Section.styled";
import {
  StyledForm,
  StyledInput,
  StyledTextarea,
} from "./AddRestaurantForm.styled";

export default function AddRestaurantForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const restaurantData = Object.fromEntries(formData);
    console.log(restaurantData);
    await fetch("/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    });

    event.target.reset();
    event.target.restaurant.focus();
  }

  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="restaurant">Name:</label>
        <StyledInput type="text" name="restaurant" id="restaurant" />

        <label htmlFor="rating">Rating:</label>
        <select name="rating" id="rating">
          <option value="red">Bad</option>
          <option value="yellow">Mediocre</option>
          <option value="green">Good</option>
        </select>

        <label htmlFor="text">Your text:</label>
        <StyledTextarea
          name="text"
          id="text"
          cols="30"
          rows="10"></StyledTextarea>

        <label htmlFor="city">City:</label>
        <StyledInput type="text" name="city" id="city" />

        <br />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </StyledSection>
  );
}
