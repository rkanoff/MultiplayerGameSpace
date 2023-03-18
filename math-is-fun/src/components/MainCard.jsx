import { useEffect, useState } from 'react'

const MainCard = ({player, start, connection}) => {
    
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [data, setData] = useState()
    const [response, setResponse] = useState('')
    const [p1score, setP1Score] = useState(0)
    const [p2score, setP2Score] = useState(0)

    // enable/disable ui based on player
    useEffect(() => {
        let field1 = document.getElementsByClassName('field')
        if(player) {
            field1[0].disabled = true
            field1[0].hidden = true
            field1[1].disabled = false
            field1[1].hidden = false
        }
        else {
            field1[0].disabled =false
            field1[0].hidden = false
            field1[1].disabled = true
            field1[1].hidden = true
        }
    }, [player])

    // generate question and answer
    const generateQuestion = () => {
        const operand1 = Math.floor(Math.random()*10)+1
        const operand2 = Math.floor(Math.random()*10)+1
        const operatorArray = ['+','-']
        const operator = operatorArray[Math.floor(Math.random()*operatorArray.length)]

        setQuestion(operand1+operator+operand2)
        connection.emit('question', operand1+operator+operand2)

        switch(operator) {
            case '+':
                setAnswer(operand1+operand2)
                break
            case '-':
                setAnswer(operand1-operand2)
                break
        }
    }

    //  check if players answer is correct
    const checkAnswer = (e) => {
        e.preventDefault()
        setData('')
        let form = document.getElementById('form_id')
        let form2 = document.getElementById('data_id')
        form2.disabled = true

        if(data==answer) {
            setResponse('Correct!')
        }
        else {
            setResponse('Wrong...')
        }

        const timer = setTimeout(() => {
            form.reset()
            generateQuestion()
            setResponse('')
            form2.disabled = false
        },2000)
        return () => clearTimeout(timer)
    }

    // start round
    useEffect(() => {
        if (start) {
            if (player) {
                generateQuestion()
            }
        }
    }, [start])

    useEffect(() => {
        connection?.on('question', (message) => {
            if (question==='') {
                setQuestion(message)
            }
        })
    }, [connection])

    return (
        <div class='card h-100 text-dark justify-content-center'>
            <div class='body'>
                    <div class='row'>
                        <div class='col'></div>
                        <div class='col'>
                        <h3 class='mb-4'>{response}</h3>
                        <h3>{question}={answer}?{data}</h3>
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
    )
}

export default MainCard