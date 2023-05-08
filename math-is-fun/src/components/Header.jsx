import { useEffect } from 'react'
import { useState } from 'react'

const Header = ({player1, player2, start, setStart, setReset}) => {

    const [timer, setTimer] = useState(20)

    const timer1 = setTimeout(() => {
        if (timer>0 && start) {
            setTimer(timer-1)
            if(timer===1) {
                setReset(true)
            }
        }
        else {
            setStart(false)
            return
        }
    }, 1000)

    useEffect(() => {
        if (start) {
            setTimer(20)
        }
    }, [start])

    return (
        <div class='container-fluid'>
            <div class='row'>

                <div class='col'>
                    <h1>{player1}</h1>
                </div>

                <div class='col'>
                    <h1>{timer}</h1>
                </div>

                <div class='col'>
                    <h1>{player2}</h1>
                </div>

            </div>
        </div>
    )
}

export default Header