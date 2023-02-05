import { Configuration, OpenAIApi } from 'openai'

const handler = async(req, res) => {
    try {
        const method = req.method
        if (method !== 'POST') return res.status(405).json({ code: 405, status: 'Method Not Allowed' })
        const { question } = req.body
        if (!question || question.length === 0) return res.status(400).json({ code: 400, status: 'Bad Request', message: 'Pertanyaan dibutuhkan' })
        const API_KEY = process.env.OPENAI_API_KEY
        if (!API_KEY) return res.status(500).json({ code: 500, status: 'Internal Server Error', message: 'API KEY Dibutuhkan' })
        const configuration = new Configuration({ apiKey: API_KEY })
        const openai = new OpenAIApi(configuration)
        let newQuestion = ''
        if (typeof question === 'string') {
            newQuestion = question
        } else {
            newQuestion = await question.map(element => `${element.q} ${element.a}`).reduce((result, e) => result += ` ${e}`)
        }
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: newQuestion,
            temperature: 0.9,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: ["Human", "AI"]
        })
        const answer = response.data.choices[0].text
        return res.status(200).json({ code: 200, status: 'Berhasil', data: { q: question, a: answer } })
    } catch (error) {
        return res.status(500).json({ code: 500, status: 'Internal Server Error', error: error.message })
    }
}

export default handler