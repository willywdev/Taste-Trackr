import { StyledArticle } from "../StyledArticle/Article.styled";

export default function AddRestaurantForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const restaurantData = Object.fromEntries(formData);
    // --- delete console.log when in prod
    console.log(restaurantData);
    event.target.reset();
    event.target.name.focus();
  }

  return (
    <StyledArticle>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
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
    </StyledArticle>
  );
}
