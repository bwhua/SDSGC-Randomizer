import { Select, Button, MenuItem, InputLabel, FormControl} from '@mui/material'
import Card from "./Card"
import React, { useState } from 'react';
import { display } from '@mui/system';
import mysterious from '../images/mysterious-07.jpg'
import celticKnot from '../images/celtic_knot.png'
import odin from '../images/odin.png'
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Battle({team1, team2, allChar}){

  const [team1_rand, setTeam1_rand] = useState([])
  const [team2_rand, setTeam2_rand] = useState([])
  const [imageList, setImageList] = useState([
    'image_one',
    'image_two',
    'image_three',
    'image_four',
    'image_five',
    'image_six',
    'image_seven',
    'image_eight',
  ]);

  const randomize = (team, teamList) => {
    let addImgList = team === 'team1' ?
      ['image_one', 'image_two', 'image_three', 'image_four'] :
      ['image_five', 'image_six', 'image_seven', 'image_eight']
    setImageList(Array.from(new Set([...imageList, ...addImgList])))

    let keysSorted = Object.keys(teamList).sort((a, b) => 0.5 - Math.random())
    team === 'team1' ? setTeam1_rand([...keysSorted]) : setTeam2_rand([...keysSorted])
  }

  const rerollChar = (event) => {
    let team = event.target.name === 'team1' ? team1_rand : team2_rand
    
    let addImgList = event.target.name === 'team1' ?
      ['image_one', 'image_two', 'image_three', 'image_four'] :
      ['image_five', 'image_six', 'image_seven', 'image_eight']
    setImageList(Array.from(new Set([...imageList, ...[addImgList[event.target.value - 1]] ])))

    console.log(event.target.name);
    if(team.length < 5){
      alert("There are no more characters in the reroll pool")
    }else{
      let newChar = team.splice(4, 1)[0]
      team.splice(event.target.value - 1, 1, newChar)
      // team.splice(event.target.value - 1, 1)
    }
    event.target.name === 'team1' ? setTeam1_rand([...team]) : setTeam2_rand([...team])
  }

  const renderTeam = (team, teamList) => {
    let classKey={
      'team1': ['one', 'two', 'three', 'four'],
      'team2': ['five', 'six', 'seven', 'eight']
    }
    let teamBackground = { 'team1': 'battleTeam1', 'team2': 'battleTeam2'}
    let retDiv = (
      classKey[team].map((number, index) => {
        return <div className={number + ' ' + teamBackground[team]} style={{ position: 'relative', overflow: 'hidden' }}>
          {teamList.length !== 0 && imageList.indexOf('image_' + number) > -1 && 
            <img className='coverImg' name={'image_' + number} alt="mysterious" src={mysterious} style={{ position: 'absolute', left: '0', top: '0' }} onClick={handleRemoveItem}></img>
          }
          {teamList.length !== 0 && <Card name={teamList[index]} value={allChar[teamList[index]]}/>}
        </div>
      })
    )
    return retDiv
  }
  
  const handleRemoveItem = (e) => {
    const newList = imageList.filter(function (imgName) {
      return imgName !== e.target.getAttribute("name")})
    setImageList(newList)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='randomizer'>
      </div>
      <br />
      <div className='battle' >
        <div className="team1_header" style={{ justifyContent: 'space-between', display: 'flex' }}>
          <img alt="Symbol of Odin" src={odin} style={{ maxHeight: '100px', marginLeft: '1rem', padding: '5px' }}></img>
          <div>
            <h1 style={{textAlign:'center'}}>TEAM 1</h1>
            <Button onClick={() => randomize('team1', team1)}><FontAwesomeIcon icon={faDice} className='fa-4x'/></Button>
            <FormControl sx={{ m: 0, minWidth: 175 }}>
              <InputLabel id="demo-simple-select-helper-label">Reroll Character</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="reroll_char_team_1"
                value = ''
                label="Reroll Character"
                name='team1'
                onChange={rerollChar}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </div>
          <img alt="Symbol of Odin" src={odin} style={{ maxHeight: '100px', marginLeft: '1rem', padding: '5px' }}></img>

        </div>
        {renderTeam('team1', team1_rand)}

        <div className="team2_header" style={{justifyContent: 'space-between', display: 'flex'}}>
          <img alt="celticKnot" src={celticKnot} style={{maxHeight: '100px', marginLeft: '1rem', padding:'5px'}} onClick={handleRemoveItem}></img>
          <div>
            <h1 style={{ textAlign: 'center', justifyContent: 'center' }}>TEAM 2</h1>
            <Button onClick={() => randomize('team2', team2)}><FontAwesomeIcon icon={faDice} className='fa-4x' /></Button>
            <FormControl sx={{ m: 0, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label">Reroll Character</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="reroll_char_team_2"
                value = ''
                label="Reroll Character"
                name='team2'
                onChange={rerollChar}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </div>
          <img alt="celticKnot" src={celticKnot} style={{ maxHeight: '100px', marginLeft: '1rem', padding: '5px' }} onClick={handleRemoveItem}></img>
        </div>
        {renderTeam('team2', team2_rand)}

      </div>
    </div>
  )
}
export default Battle
