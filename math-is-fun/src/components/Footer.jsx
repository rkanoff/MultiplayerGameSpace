import { useEffect } from 'react'
import { useState } from 'react'

const Footer = ({player, connection, setStart}) => {

    const [difficulty1, setDifficulty1] = useState('Easy')
    const [difficulty2, setDifficulty2] = useState('Easy')
    const [ready, setReady] = useState(false)
    const [readyDisplay, setReadyDisplay] = useState('Ready?')
    const [ready2, setReady2] = useState(false)
    const [readyDisplay2, setReadyDisplay2] = useState('Ready?')

    // enable/disable ui elements based on player
    useEffect(() => {
        let btn1 = document.getElementById('dropdownMenuButton2')
        let btn2 = document.getElementById('ready2')
        let btn3 = document.getElementById('dropdownMenuButton1')
        let btn4 = document.getElementById('ready1')

        if (player) {
            btn1.disabled = true
            btn2.disabled = true
            btn3.disabled = false
            btn4.disabled = false
        }
        else {
            btn1.disabled = false
            btn2.disabled = false
            btn3.disabled = true
            btn4.disabled = true
        }
    }, [player])

    const ready1btn = () => {
        if(ready)
            connection.emit('ready1', { ready: !ready, display: 'Ready?'})
        else      
            connection.emit('ready1', { ready: !ready, display: 'Ready!!!'})
    }

    const ready2btn = () => {
        if(ready2)
            connection.emit('ready2', { ready: !ready2, display: 'Ready?'})
        else      
            connection.emit('ready2', { ready: !ready2, display: 'Ready!!!'})
    }

    useEffect(() => {
        connection?.on('start', () => {
            setStart(true)
        })
        connection?.on('ready1', (message) => {
            setReady(message[0].ready)
            setReadyDisplay(message[0].display)
        })
        connection?.on('ready2', (message) => {
            setReady2(message[0].ready)
            setReadyDisplay2(message[0].display)
        })
    }, [connection])

    useEffect(() => {
        if (ready && ready2) setStart(true)
    }, [ready, ready2])

    return (
        <div class='container-fluid'>
            <div class='row'>

                <div class='col'>
                    <div class='row'>
                    <div class='col'>
                    <button class='btn bg-primary' id='ready1' onClick={ready1btn}>
                        {readyDisplay}
                    </button>   
                    </div>
                    <div class='col'>
                        <button class="btn btn-secondary dropdown-toggle disableBtn" type="button" id="dropdownMenuButton1" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {difficulty1}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <button class="dropdown-item" onClick={()=>setDifficulty1('Easy')}>Easy</button>
                            <button class="dropdown-item" onClick={()=>setDifficulty1('Medium')}>Medium</button>
                            <button class="dropdown-item" onClick={()=>setDifficulty1('Hard')}>Hard</button>
                        </div>
                    </div>
                    </div>
                </div>

                <div class='col'>
                <div class='row'>
                    <div class='col'>
                        <button class="btn btn-secondary dropdown-toggle disableBtn" type="button" id="dropdownMenuButton2" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {difficulty2}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <button class="dropdown-item" onClick={()=>setDifficulty2('Easy')}>Easy</button>
                            <button class="dropdown-item" onClick={()=>setDifficulty2('Medium')}>Medium</button>
                            <button class="dropdown-item" onClick={()=>setDifficulty2('Hard')}>Hard</button>
                        </div>
                    </div>
                    <div class='col'>
                    <button class='btn bg-primary' id='ready2' onClick={ready2btn}>
                        {readyDisplay2}
                    </button>   
                    </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Footer