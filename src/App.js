import Header from './components/Header'
import './App.css';
import data from './data.json';
import React, { useState } from 'react';
import CharSelect from './components/CharSelect';
import { HashRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Battle from './components/Battle';

function App() {
  let allCharPool = JSON.parse(JSON.stringify(data, null, 2));
  // disregard Race
  let all_char_combined = {}
  for (let race in allCharPool) {
    for (let character in allCharPool[race]) {
      all_char_combined[character] = allCharPool[race][character]
    }
  }

  const [teams, setTeams] = useState({
    team1: {
      'color': ['Red', 'Blue', 'Green', 'Darkness'],
      'race': ['Human', 'Giant', 'Fairy', 'Demon', 'Goddess', 'Unknown'],
      'grade': ['R', 'SR', 'SSR'],
      'collab': true,
      'festival': true,
    },
    team2: {
      'color': ['Red', 'Blue', 'Green', 'Darkness'],
      'race': ['Human', 'Giant', 'Fairy', 'Demon', 'Goddess', 'Unknown'],
      'grade': ['R', 'SR', 'SSR'],
      'collab': true,
      'festival': true
    },
    sameTeam: true
  })
  let createPool = (team) => {
    let potentialPool = {}
    
    let teamRestrictions = teams[team];
    // Filter by race first
    for (let race of teamRestrictions['race']) {
      if (race in allCharPool) {
        for (let character in allCharPool[race]) {
          potentialPool[character] = allCharPool[race][character]
        }
      }
    }
    // Filter by color and grade
    for(let character in potentialPool){
      console.log(character);
      if (!teamRestrictions['color'].includes(potentialPool[character]['Color']) || 
        !teamRestrictions['grade'].includes(potentialPool[character]['Rarity']) ||
        !(potentialPool[character].hasOwnProperty("Festival") && teamRestrictions.festival || !potentialPool[character].hasOwnProperty("Festival")) ||
        !(potentialPool[character].hasOwnProperty("Collab") && teamRestrictions.collab || !potentialPool[character].hasOwnProperty("Collab"))
        ) delete potentialPool[character]
    }
    return potentialPool
  }
  const [teamPool1, setTeamPool1] = useState(createPool('team1'))
  const [teamPool2, setTeamPool2] = useState(createPool('team1'))

  let updateTeams = (teams) => {
    setTeams(teams)
    setTeamPool1(createPool('team1'))
    setTeamPool2(createPool('team2'))
  }

  return (
    <HashRouter>
    <div className="App">
      <Header teams={teams} changeTeam={teams => updateTeams(teams)}/>
      <br /><br /><br />
      <Routes>
          <Route path='/' element={<CharSelect teams={teams} teamPool1={teamPool1} teamPool2={teamPool2} />} />
          <Route path='/battle' element={<Battle team1={teamPool1} team2={teamPool2} allChar={all_char_combined}/>} />
      </Routes>
      
    </div >
    </HashRouter>
  );
}

export default App;
