import React from 'react'
import Cards from './Cards';



const CharSelect = ({teams, teamPool1, teamPool2}) => {
  return (
    <div className='pools'>
      <div className='charPool' id="team 1"
      >
        <h2 style={{ textAlign: 'center' }}>{!teams['sameTeam'] ? 'Team 1' : 'Character Pool'} </h2>
        {Object.keys(teamPool1).length > 4 ?
          <Cards className='cards' cards={teamPool1} /> : 'Choose Restrictions with more than 4 character'}
      </div>
      {!teams['sameTeam'] ?
        <div className='charPool' id="team 2"
        >
        <h2 style={{ textAlign: 'center' }}> Team 2 </h2>
        {Object.keys(teamPool2).length > 4 ?
          <Cards className='cards' cards={teamPool2} /> : 'Choose Restrictions with more than 4 character'}:
          </div> : ''}
    </div>
  )
}

export default CharSelect
