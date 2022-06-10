import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { useState } from 'react'
const Header = ({teams, changeTeam}) => {
  
  const[battle, setBattle] = useState(true)


  document.addEventListener('click', e =>{
    const isDropdownButton = e.target.matches('[data-dropdown-button]')
    if (!isDropdownButton && e.target.closest('[data-dropdown]') == null) {
      document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        dropdown.classList.remove('active')
      })
    }
  })
// controlls when header and section in header are clicked
  let setTeamLogic = (value, parameters) => {
    if (value === 'attribute'){
      if(teams['sameTeam']){
        teams['team2'][parameters[1]] = JSON.parse(JSON.stringify(teams['team1'][parameters[1]]))
        document.getElementById(['team2', parameters[1], parameters[2]].join('-')).classList = {...document.getElementById(['team1', parameters[1], parameters[2]].join('-'))}
      }
    }
    if (value === 'restriction_chkbox' && teams['sameTeam']){
      teams['team2'][parameters[1]] = teams['team1'][parameters[1]]
      document.getElementById(['team2', parameters[1]].join('-')).checked = document.getElementById(['team1', parameters[1]].join('-')).checked
    }
    if (value === 'sameTeam'){
      teams['team2'] = JSON.parse(JSON.stringify(teams['team1']))
      if (document.getElementById('same_constraints').checked === true){
        let attributes = [['race', 'Human'], ['race', 'Giant'], ['race', 'Fairy'], ['race', 'Demon'], ['race', 'Goddess'], ['race', 'Unknown'],
          ['color', 'Red'], ['color', 'Green'], ['color', 'Blue'], ['color', 'Darkness'], ['color', 'Light'],
          ['grade', 'R'], ['grade', 'SR'], ['grade', 'SSR']]
        for(let i of attributes){
          document.getElementById(['team2', i[0], i[1]].join('-')).classList = document.getElementById(['team1', i[0], i[1]].join('-')).classList
        }
      }
    }
    changeTeam(teams)
  }

  const handleClick = (e) => {
    const isDropdownButton = e.target.matches('[data-dropdown-button]')
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return
    let currentDropdown
    if (isDropdownButton) {
      currentDropdown = e.target.closest('[data-dropdown]')
      currentDropdown.classList.toggle('active')
    }
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
      if (dropdown === currentDropdown) return
      dropdown.classList.remove('active')
    })
  };

  let toggle_attribute = (target, list, value) =>{
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1)
      target.classList.remove('list-border-active');
      target.classList.add('list-border-inactive');
    } else {
      list.push(value)
      target.classList.remove('list-border-inactive');
      target.classList.add('list-border-active');
    }
    return list
  }
  let changeAttribute = (e) => {
    let parameters = e.target.id.split('-')
    teams[parameters[0]][parameters[1]] = toggle_attribute(e.target, teams[parameters[0]][parameters[1]], parameters[2])
    setTeamLogic('attribute', parameters)
  }
  let toggleCheckBox = (e) => {
    let parameters = e.target.id.split('-')
    if (e.target.id === 'same_constraints') {
      if (e.target.checked) document.getElementById('team1').innerHTML = "Team Restrictions"
      else document.getElementById('team1').innerHTML = "Team 1"
      document.getElementById('team2').hidden = !document.getElementById('team2').hidden
      teams['sameTeam'] = !teams['sameTeam']
      setTeamLogic('sameTeam', parameters)
    }
    else{
      teams[parameters[0]][parameters[1]] = !teams[parameters[0]][parameters[1]]
      setTeamLogic('restriction_chkbox', parameters)
    }
  }
  return (
    <header className='header'>
      <div className="header-left">
        <div className='dropdown '>SDSGC: PVP Randomizer</div>

        <div className='dropdown' data-dropdown style={{ zIndex: 10 }}>
          <button id="team1" className="link" data-dropdown-button onClick={handleClick}>Team Restrictions</button>
          <div className="dropdown-menu">
            <div className="team-choices">
              <div className="grid">
                <div className="team-color">
                  <div className='constraint-header'>Team Color</div>
                  <ul>
                    <li className="list-border-active" id='team1-color-Red' onClick={changeAttribute} style={{borderColor: "red"}}>Red</li>
                    <li className="list-border-active" id='team1-color-Blue' onClick={changeAttribute} style={{borderColor: "red"}}>Blue</li>
                    <li className="list-border-active" id='team1-color-Green' onClick={changeAttribute} style={{borderColor: "red"}}>Green</li>
                    <li className="list-border-active" id='team1-color-Darkness' onClick={changeAttribute} style={{ borderColor: "red" }}>Darkness</li>
                    <li className="list-border-active" id='team1-color-Light' onClick={changeAttribute} style={{ borderColor: "red" }}>Light</li>
                  </ul>
                </div>
                <div className="team-race">
                  <div className='constraint-header'>Team Race</div>
                  <ul>
                    <li className="list-border-active" id='team1-race-Human' onClick={changeAttribute} style={{borderColor: "red"}}>Human</li>
                    <li className="list-border-active" id='team1-race-Giant' onClick={changeAttribute} style={{ borderColor: "red" }}>Giant</li>
                    <li className="list-border-active" id='team1-race-Fairy' onClick={changeAttribute} style={{ borderColor: "red"}}>Fairy</li>
                    <li className="list-border-active" id='team1-race-Demon' onClick={changeAttribute} style={{borderColor: "red"}}>Demon</li>
                    <li className="list-border-active" id='team1-race-Goddess' onClick={changeAttribute} style={{borderColor: "red"}}>Goddess</li>
                    <li className="list-border-active" id='team1-race-Unknown' onClick={changeAttribute} style={{ borderColor: "red" }}>Unknown</li>
                  </ul>
                </div>
                <div className="team-grade">
                  <div className='constraint-header'>Team Grade</div>
                  <ul>
                    <li className="list-border-active" id='team1-grade-R' onClick={changeAttribute} style={{borderColor: "red"}}>R</li>
                    <li className="list-border-active" id='team1-grade-SR' onClick={changeAttribute} style={{borderColor: "red"}}>SR</li>
                    <li className="list-border-active" id='team1-grade-SSR' onClick={changeAttribute} style={{borderColor: "red"}}>SSR</li>
                  </ul>
                </div>
              </div>
              <div>
                <label htmlFor="collab" style={{ marginRight: '0.5rem' }}>Collab Units</label>
                <input type="checkbox" id="team1-collab" onChange={toggleCheckBox} defaultChecked/><br />
              </div>
              <div>
                <label htmlFor="collab" style={{ marginRight: '0.5rem' }}>Festival Units</label>
                <input type="checkbox" id="team1-festival" onChange={toggleCheckBox} defaultChecked/><br />
              </div>
            </div>
          </div>
        </div>
        <div className='dropdown' data-dropdown style={{ zIndex: 10 }} onClick={handleClick}>
          <button id="team2" className="link" data-dropdown-button hidden> Team 2</button>
          <div className="dropdown-menu">
            <div className="team-choices">
              <div className="grid">
                <div className="team-color">
                  <div className='constraint-header'>Team Color</div>
                  <ul>
                    <li className="list-border-active" id='team2-color-Red' onClick={changeAttribute} style={{borderColor: "blue"}}>Red</li>
                    <li className="list-border-active" id='team2-color-Blue' onClick={changeAttribute} style={{borderColor: "blue"}}>Blue</li>
                    <li className="list-border-active" id='team2-color-Green' onClick={changeAttribute} style={{ borderColor: "blue" }}>Green</li>
                    <li className="list-border-active" id='team2-color-Darkness' onClick={changeAttribute} style={{ borderColor: "blue" }}>Darkness</li>
                    <li className="list-border-active" id='team2-color-Light' onClick={changeAttribute} style={{borderColor: "blue"}}>Light</li>
                  </ul>
                </div>
                <div className="team-race">
                  <div className='constraint-header'>Team Race</div>
                  <ul>
                    <li className="list-border-active" id='team2-race-Human' onClick={changeAttribute} style={{borderColor: "blue"}}>Human</li>
                    <li className="list-border-active" id='team2-race-Giant' onClick={changeAttribute} style={{ borderColor: "blue" }}>Giant</li>
                    <li className="list-border-active" id='team2-race-Fairy' onClick={changeAttribute} style={{ borderColor: "blue"}}>Fairy</li>
                    <li className="list-border-active" id='team2-race-Demon' onClick={changeAttribute} style={{borderColor: "blue"}}>Demon</li>
                    <li className="list-border-active" id='team2-race-Goddess' onClick={changeAttribute} style={{borderColor: "blue"}}>Goddess</li>
                    <li className="list-border-active" id='team2-race-Unknown' onClick={changeAttribute} style={{ borderColor: "blue" }}>Unknown</li>
                  </ul>
                </div>
                <div className="team-grade">
                  <div className='constraint-header'>Team Grade</div>
                  <ul>
                    <li className="list-border-active" id='team2-grade-R' onClick={changeAttribute} style={{borderColor: "blue"}}>R</li>
                    <li className="list-border-active" id='team2-grade-SR' onClick={changeAttribute} style={{borderColor: "blue"}}>SR</li>
                    <li className="list-border-active" id='team2-grade-SSR' onClick={changeAttribute} style={{borderColor: "blue"}}>SSR</li>
                  </ul>
                </div>
              </div>
              <div>
            </div>
              <label htmlFor="collab" style={{marginRight:'0.5rem'}}>Collab Units</label>
              <input type="checkbox" id="team2-collab" onChange={toggleCheckBox} defaultChecked/><br />
            </div>
            <div>
              <label htmlFor="collab" style={{ marginRight: '0.5rem' }}>Festival Units</label>
              <input type="checkbox" id="team2-festival" onChange={toggleCheckBox} defaultChecked/><br />
            </div>
          </div>
        </div>
      </div>
      <div className="header-right">
        <div className='dropdown header-right' data-dropdown justify-content='right'>
          <label htmlFor="same_constraints" style={{marginRight: '0.5rem'}}> Same constraints</label>
          <input type="checkbox" id="same_constraints" onClick={toggleCheckBox} defaultChecked/>

        </div>
        <div className='dropdown header-right' data-dropdown onClick={handleClick} justify-content='right'>
          {battle ? 
            <Link to='/battle'>
              <button className="link" data-dropdown-button onClick= {() => setBattle(false)}> 
                Battle 
              </button>
            </Link>
            : 
            <Link to='/'>
              <button className="link" data-dropdown-button onClick={() => setBattle(true)} >
                Select Character 
              </button>
            </Link>
          }

        </div>
    </div>
    </header>
  )
}

Header.defaultProps = {
  title: "SDSGC: PVP Randomizer",
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Header
