export default function Planner(props) {
  
    return (
      <div className="Planner-container">
        {props.meals.length > 0 && 
          props.meals.map((meal, index) => (
            <div key={index} className="day">
              <span>{meal.name}</span>
              <button className="delt-btn" onClick={()=>props.delt(index)}>X</button>
            </div>
          ))

          
        }
        <button className="delt-all" onClick={props.deleteAll}>delete all</button>
      </div>
    );
  }
  