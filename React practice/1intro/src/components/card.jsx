function Card(props){
    // props means properties which acts as perimeter to the function
    console.log(props);
    return <div className="card"><h1>hii {props.user} </h1> 
   <p>age is {props.age}</p>  </div>;
}

export default Card;