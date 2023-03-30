import { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'

const Card1 = ({player, start, connection}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [data, setData] = useState()
    const [response, setResponse] = useState('')
    const [flip, setFlip] = useState(false)

    // generate question and answer
    const generateQuestion = () => {
        const operand1 = Math.floor(Math.random()*10)+1
        const operand2 = Math.floor(Math.random()*10)+1
        const operatorArray = ['+','-']
        const operator = operatorArray[Math.floor(Math.random()*operatorArray.length)]

        setQuestion(operand1+operator+operand2)
        connection.emit('question1', operand1+operator+operand2)

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
    }, [connection])

    // start round
    useEffect(() => {
        if (start) {
            if (player) {
                generateQuestion()
            }
        }
    }, [start])

    // hide elements
    useEffect(() => {
        let form = document.getElementById('form_id')
        form.hidden = false
        if (!player) {
            let form = document.getElementById('form_id')
            form.hidden = true
        }
    }, [player])

    return (
        <ReactCardFlip isFlipped={flip} flipDirection='horizontal' containerStyle={{height: '100%'}}>
            <div class='card h-100 text-dark justify-content-center'>
                <div class='body'>
                    <div class='row'>
                    <div class='col'></div>
                    <div class='col'>
                    <h3>{question}=?</h3>
                        <form class='mb-3' id='form_id' onSubmit={checkAnswer}>
                            <input type='text' class='form-control text-center field'
                                id='data_id'
                                defaultValue={data}
                                onChange={(e)=>setData(e.target.value)}/>
                        </form>
                    </div>
                    <div class='col'></div>
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