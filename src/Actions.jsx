export default  function Action(props){
    return(
        <div>
            <button className="fav-btn" onClick={props.favorite}>Add To favorites</button>
            <button className="planner-btn" onClick={props.toggleMealPlan} >Add to the meal planner </button>
           
        </div>
    )
}