import React, { useState } from 'react'
import Navigasi from '../components/Navigasi'

const AI = () => {

    const [question, setQuestion] = useState('')
    const [aiChat, setAiChat] = useState([])

    const handlerQuestion = (e) => {
        e.preventDefault()
        setQuestion(e.target.value)
    }

    const handlerEnter = (e) => {
        if (e.key === 'Enter') return handlerTanya(e)
    }

    const handlerTanya = async(e) => {
        e.preventDefault()
        if(!question) return alert('Pertanyaan dibutuhkan')
        setAiChat([
            ...aiChat,
            { q: question, a: '' }
        ])
        setQuestion('')
        const reqChatai = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        })
        const resChatai = await reqChatai.json()
        const answer = resChatai.data.a
        setAiChat([
            ...aiChat,
            {
                q: question,
                a: answer
            }
        ])
    }

    return (
        <>
            <Navigasi/>
            <div className='my-5 pt-5 pb-3 container'>
                <h1>Chat AI</h1>
                <div className='mt-4 d-flex flex-column'>
                    {
                        aiChat.map((chat, index) => {
                            return  <div className='mt-4 d-flex flex-column gap-4' key={index}>
                                        <div className='d-flex justify-content-end'>
                                            <div className="border rounded p-3" style={{ maxWidth: 700 }}>
                                                {chat.q}
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-start'>
                                            <div className="border rounded p-3" style={{ maxWidth: 700 }}>
                                                {
                                                    !chat.a ?
                                                    <div className="spinner-border" role="status"/>:
                                                    chat.a.split('\n').map((dataAnswer='', index) => {
                                                        return (
                                                            <p key={index}>{dataAnswer}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                        })
                    }
                </div>
                <div className="input-group mt-3 mb-5">
                    <input type="text" className="form-control" placeholder="Tanya sesuatu" aria-label="chat" aria-describedby="chat" value={question} onChange={e => handlerQuestion(e)} onKeyPress={e => handlerEnter(e)}/>
                    <button className="btn btn-dark rounded-right px-3" type="button" id="button" onClick={e => handlerTanya(e)}>Tanya</button>
                </div>
            </div>
        </>
    )
}

export default AI