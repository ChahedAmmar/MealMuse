import React,{useState} from 'react';
import List from './List';
import Actions from './Actions';
import Favorites from './Favorites';
import Planner from './planner';
import getRecipe from './Recipe';
import ReactMarkdown from 'react-markdown'




function Home() {
  const[toggled,SetHealthy]=useState(false)
  const[toggledVegan,SetVegan]=useState(false)
  const [ingredients, setIngredients] = useState(["tomatoes", "onions", "garlic","pasta","cheese"]);
  const [recipe, setRecipe] = useState([]);
  const[fav,setFav]=useState(false);
  const[favRecipe,setFavRecipe]=useState([]);
  const [mealPlan, setMealPlan] = useState(false);
  const[meals,setMeals]=useState([])
  const [name, setName] = useState("");
  function toggleMealPlan() {
    setMealPlan((prevMealPlan) => !prevMealPlan);}

function addFavorite(){
  if(recipe.length>0){
    const lastRecipe = recipe[recipe.length - 1];
    const updatedFavs = [...favRecipe, lastRecipe];
    setFavRecipe(updatedFavs);
    setFav(true);
    localStorage.setItem('favRecipe', JSON.stringify(updatedFavs));
  }
}
function deleteAll(){
  setMeals(prevMeal=>[])
}
function deleteMeal(index){
  setMeals(prevMeal=>prevMeal.filter((_,i)=>(
    i!==index

  )))
}
  function addIngredient(formData) {
    const newIngredient = formData.get('ingredientInput');
    if (newIngredient) {
      setIngredients((prevIng) => [...prevIng, newIngredient]);
      
    }
  }
  function delt(index){
  setIngredients(preving => preving.filter((_, i) => i !== index));
  }
  function getName(recipeText) {
    if (!recipeText) return "";
    const lines = recipeText.split('\n')
    const firstline=lines[0].trim()
    return firstline.replace(/^#+\s*/, '');  
    
   
  }

 function addToPlanner(){
  if(recipe.length>0){
    const lastRecipe = recipe[recipe.length - 1];
    setMeals((prevMeal) => [...prevMeal, {recipe:lastRecipe,name:getName(lastRecipe.recipe)}]);
    setMealPlan(true);
  }
 }

  async function showRecipe() {
    console.log("ingredients before getRecipe call:", ingredients);
    
    const genRecipe = await getRecipe(ingredients, { vegan: toggledVegan, health: toggled }); 
    setRecipe(prevRecipe =>{
  return [...prevRecipe, { recipe: genRecipe, name: getName(genRecipe) }];
    } );
    
    
  }

  function favorite(){
    setFav(prevFav => !prevFav);
  }
  console.log(meals)


  return (
    <div className="container">
      <nav className='navBar'>
        <h1>MealMuse</h1>
        <ul className='navLinks'>
          <li><a href="#"></a>Home</li>
          <li><a href="#"></a>Favorites</li>
          <li><a href="#"></a>Meal Planner</li>
          </ul>
      </nav>
      <main>
        <form action={addIngredient} >
        <label htmlFor='ingredientInput'> Enter your ingredients</label> <br/> <br/>
        <input type='text' id='ingredientInput' placeholder='e.g Tomatoes' name='ingredientInput' />
        <button className='add_btn' type='submit'>Add ingrediant</button>
        </form>
       
        <label> Healthy
        <button className={`toggle-btn ${toggled ?"toggled":""}`} onClick={() => SetHealthy(!toggled)}>
          <div className='thumb'></div>

        </button>

        </label>
        <label> Vegan
        <button className={`toggle-btn ${toggledVegan ? "toggled" : ""}`} onClick={() => SetVegan(!toggledVegan)}>
          <div className='thumb'></div>

        </button>

        </label>
        <div className='ingredientsList'>
          {
            ingredients.length>0 && <List 
            ingredients={ ingredients} 
            showRecipe={showRecipe}
            delt={delt}

            
            />
          }
        </div>
        {recipe && (
          <>
         {recipe.length > 0 && (
  <>
    <h2>Your Recipe is here!</h2>
    <section>
      <ReactMarkdown>
        {recipe[recipe.length - 1].recipe}
      </ReactMarkdown>
    </section>
   
  </>
)}

            <Actions  favorite={addFavorite}
            favv={favorite}
            toggleMealPlan={addToPlanner}
            />
          </>
        )}
       <Favorites fav={fav} favorite={fav} recipe={favRecipe} />

        {mealPlan && <Planner meals={meals} 
        deleteAll={deleteAll}
        delt={deleteMeal}/>}
     
        
      </main>
     
    </div>
  );
}

export default Home;
