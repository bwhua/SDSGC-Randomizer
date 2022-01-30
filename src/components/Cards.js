import Card from "./Card"

const Cards = ({ cards }) => {

  return (
    <div className='cards'>
      <>
        {/* {cards.map((card) => (<Card name={Object.keys(card)} />))} */}
        {
          Object.keys(cards).map((key, index) => (<Card name={key} value={cards[key]} />))
        }
      </>
    </div>
  )
}

export default Cards
