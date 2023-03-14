import { useEffect } from 'react'
import { useState } from 'react'

const Footer = () => {
    const [difficulty, setDifficulty] = useState('Easy')
    const [ready, setReady] = useState(false)
    const [readyDisplay, setReadyDisplay] = useState('Ready?')

    useEffect(() => {
        let disabledButton = document.getElementById('dropdownMenuButton')
        if(ready) {
            setReadyDisplay('Ready!!!')
            disabledButton.disabled = true
        }
        else {
            setReadyDisplay('Not Ready?')
            disabledButton.disabled = false
        }
    }, [ready])

    return (
        <div class='container-fluid'>
            <div class='row'>

                <div class='col'>
                    <div class='row'>
                    <div class='col'>
                    <button class='btn bg-primary' onClick={()=>setReady(!ready)}>
                        {readyDisplay}
                    </button>   
                    </div>
                    <div class='col'>
                        <button class="btn btn-secondary dropdown-toggle disableBtn" type="button" id="dropdownMenuButton" 
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {difficulty}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button class="dropdown-item" onClick={()=>setDifficulty('Easy')}>Easy</button>
                            <button class="dropdown-item" onClick={()=>setDifficulty('Medium')}>Medium</button>
                            <button class="dropdown-item" onClick={()=>setDifficulty('Hard')}>Hard</button>
                        </div>
                    </div>
                    </div>
                </div>

                <div class='col'>

                </div>

            </div>
        </div>
    )
}

export default Footer