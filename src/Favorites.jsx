import { useState } from 'react';
import ReactMarkdown from 'react-markdown'

export default function Favorites(props) {
  const [showRecipe, setShowRecipe] = useState(false);
  

  const toggleRecipe = () => {
    setShowRecipe(!showRecipe);
  };

  return (
    
    <section>
      {props.recipe.map((item, index) => (
        <div key={index} className="recipe-container">
          {props.fav && (
            <>
              <button className="recipe" onClick={toggleRecipe}>
                {item.name} {showRecipe ? '▲' : '▼'}
              </button>
              {showRecipe && (
                <section>
                  <ReactMarkdown>
                  {item.recipe}
                  </ReactMarkdown>
                    
                  
                </section> 
              )}
            </>
          )}
        </div>
      ))}
      
    </section>
    
  );
}