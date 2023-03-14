import { useEffect } from 'react'
import { useState } from 'react'

const Header = ({player1, player2}) => {
    const [timer, setTimer] = useState(60)

    useEffect(() => {
        setTimeout(() => {
            if (timer>0)setTimer(timer-1)
            else setTimer(60)
        }, 1000)
    }, [timer])

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