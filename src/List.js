
export default function List(props) {
    const ingredientsList=props.ingredients.map((item,index)=>(
        
       
        <li key={index} >{item}
        <button className="delt-btn" onClick={()=>props.delt(index)}>X </button></li>
       
        
    ))
    return(
        <div>
            <h2> Ingredients on hand:</h2>
             <ul className='ingredientsList'>

            {ingredientsList}
        </ul>
        {props.ingredients.length>3 && <button className='recipe-btn' onClick={props.showRecipe}    >Get The Recipe!</button>}
        </div>
            
        
       
      
    )

}