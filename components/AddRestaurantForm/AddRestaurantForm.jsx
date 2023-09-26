import { StyledSection } from "../StyledSection/Section.styled";

export default function AddRestaurantForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const restaurantData = Object.fromEntries(formData);
    const response = await fetch("/api/restaurants", {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="restaurant">Name:</label>
        <input type="text" name="restaurant" id="restaurant" />
        <label htmlFor="rating">Rating:</label>
        <select name="rating" id="rating">
          <option value="red">Bad</option>
          <option value="yellow">Mediocre</option>
          <option value="green">Good</option>
        </select>
        <label htmlFor="text">Your text:</label>
        <textarea name="text" id="text" cols="30" rows="10"></textarea>
        <label htmlFor="city">City:</label>
        <input type="text" name="city" id="city" />
        <button type="submit">Submit</button>
      </form>
    </StyledSection>
  );
}
