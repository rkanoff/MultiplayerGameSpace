import { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'

const Card2 = ({player, start, connection, score2, setScore2}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [data, setData] = useState()
    const [response, setResponse] = useState('')
    const [flip, setFlip] = useState(false)
    const [score, setScore] = useState(0)
    const [win, setWin] = useState(0)
    const [winMessage, setWinMessage] = useState('')

    // generate question and answer
    const generateQuestion = () => {
        const operand1 = Math.floor(Math.random()*10)+1
        const operand2 = Math.floor(Math.random()*10)+1
        const operatorArray = ['+','-']
        const operator = operatorArray[Math.floor(Math.random()*operatorArray.length)]

        setQuestion(operand1+operator+operand2)
        connection?.emit('question2', operand1+operator+operand2+'=?')

        switch(operator) {
            case '+':
                connection.emit('answer2', operand1+operand2)
                break
            case '-':
                connection.emit('answer2', operand1-operand2)
                break
        }
    }

    // check if players answer is correct
    const checkAnswer = (e) => {
        e.preventDefault()
        connection.emit('flipCard2', true)
        setData('')
        let form = document.getElementById('form_id2')
        let form2 = document.getElementById('data_id2')
        form2.disabled = true

        if(data==answer) {
            connection.emit('response2', 'Correct!')
            connection.emit('score2', score2+1)
        }
        else {
            connection.emit('response2', 'Wrong...')
        }

        const timer = setTimeout(() => {
            form.reset()
            generateQuestion()
            setResponse('')
            form2.disabled = false
            connection.emit('flipCard2', false)
        },2000)
        return () => clearTimeout(timer)
    }

    // start round
    useEffect(() => {
        let form2 = document.getElementById('data_id2')
        if (start) {
            if (!player) {
                generateQuestion()
            }
            connection.emit('score2', 0)
            form2.disabled = false
        }
        else {
            form2.disabled = true
            connection?.emit('question2', 'Waiting...')
        }
    }, [start])

    // open socket
    useEffect(() => {
        connection?.on('question2', (message) => {
            if (question==='') {
                setQuestion(message)
            }
        })
        connection?.on('flipCard2', (message) => {
            setFlip(message[0])
        })
        connection?.on('response2', (message) => {
            setResponse(message)
        })
        connection?.on('answer2', (message) => {
            setAnswer(message)
        })
        connection?.on('score2', (message) => {
            setScore2(message[0])
        })
    }, [connection])

    // hide elements
    useEffect(() => {
        let form = document.getElementById('data_id2')
        form.disabled = true
        if (start && !player) {
            form.disabled = false
        }
    }, [start, player])

    return (
        <ReactCardFlip isFlipped={flip} flipDirection='horizontal' containerStyle={{height: '100%'}}>
            <div class='card h-100 text-dark justify-content-center'>
                <div class='body'>
                    <div class='col'>
                    <h3>{question}</h3>
                        <form class='mb-3' id='form_id2' onSubmit={checkAnswer}>
                            <input type='text' class='form-control text-center field'
                                id='data_id2'
                                defaultValue={data}
                                onChange={(e)=>setData(e.target.value)}/>
                        </form>
                        <h3>Score: {score2}</h3>
                    </div>
                </div>
            </div>
            <div class='card h-100 text-dark justify-content-center'>
                <h3 class='mb-4'>{response}</h3>
                <h3>{question}={answer}</h3>
            </div>
        </ReactCardFlip>
    )
}

export default Card2