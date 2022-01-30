const Card = ({ name, value}) => {
  return (
    <div className="card" style={{justifyContent: 'center', textAlign: 'center'}}>
      <img src={value['Image']} width='75px' height='75px'/>
      <p className='name' >{name}</p>

    </div>
  )
}

export default Card