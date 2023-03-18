import { useEffect } from 'react'
import { useState } from 'react'

const Header = ({player1, player2, start, setStart}) => {

    const [timer, setTimer] = useState(0)

    const timer1 = setTimeout(() => {
        if (timer>0)setTimer(timer-1)
        else {
            setStart(false)
            return
        }
    }, 1000)

    useEffect(() => {
        if (start) {
            setTimer(10)
            timer1
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