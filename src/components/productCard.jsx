export default function ProductCard(props) {
  console.log(props.name);
  return (
    <div>
      <h1>{props.name}</h1>
      <img src = {props.image}/>
      <p>price LKR: {props.price}</p>
    </div>
  );
}
