import { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'

const Card1 = ({player, start, connection, score1, setScore1}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [data, setData] = useState()
    const [response, setResponse] = useState('')
    const [flip, setFlip] = useState(false)
    const [score, setScore] = useState(0)

    // generate question and answer
    const generateQuestion = () => {
        const operand1 = Math.floor(Math.random()*10)+1
        const operand2 = Math.floor(Math.random()*10)+1
        const operatorArray = ['+','-']
        const operator = operatorArray[Math.floor(Math.random()*operatorArray.length)]

        setQuestion(operand1+operator+operand2)
        connection?.emit('question1', operand1+operator+operand2+'=?')

        switch(operator) {
            case '+':
                connection.emit('answer1', operand1+operand2)
                break
            case '-':
                connection.emit('answer1', operand1-operand2)
                break
        }
    }

    // check if players answer is correct
    const checkAnswer = (e) => {
        e.preventDefault()
        connection.emit('flipCard1', true)
        setData('')
        let form = document.getElementById('form_id')
        let form2 = document.getElementById('data_id')
        form2.disabled = true

        if(data==answer) {
            connection.emit('response1', 'Correct!')
            connection.emit('score1', score1+1)
        }
        else {
            connection.emit('response1', 'Wrong...')
        }

        const timer = setTimeout(() => {
            form.reset()
            generateQuestion()
            setResponse('')
            form2.disabled = false
            connection.emit('flipCard1', false)
        },2000)
        return () => clearTimeout(timer)
    }

    // add socket listeners
    useEffect(() => {
        connection?.on('question1', (message) => {
            if (question==='') {
                setQuestion(message)
            }
        })
        connection?.on('flipCard1', (message) => {
            setFlip(message[0])
            console.log(flip)
        })
        connection?.on('response1', (message) => {
            setResponse(message)
        })
        connection?.on('answer1', (message) => {
            setAnswer(message)
        })
        connection?.on('score1', (message) => {
            setScore1(message[0])
        })
    }, [connection])

    // start round
    useEffect(() => {
        let form = document.getElementById('data_id')
        if (start) {
            if (player) {
                generateQuestion()
            }
            connection.emit('score1', 0)
            form.disabled = false
        }
        else {
            connection?.emit('question1', 'Waiting...')
            form.disabled = true
        }
    }, [start])

    // hide elements
    useEffect(() => {
        let form = document.getElementById('data_id')
        form.disabled = true
        if (start && player) {
            form.disabled = false
        }
    }, [start, player])

    return (
        <ReactCardFlip isFlipped={flip} flipDirection='horizontal' containerStyle={{height: '100%'}}>
            <div class='card h-100 text-dark justify-content-center'>
                <div class='body'>
                    <div class='col'>
                    <h3>{question}</h3>
                        <form class='mb-3' id='form_id' onSubmit={checkAnswer}>
                            <input type='text' class='form-control text-center field'
                                id='data_id'
                                defaultValue={data}
                                onChange={(e)=>setData(e.target.value)}/>
                        </form>
                        <h3>Score: {score1}</h3>
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

export default Card1