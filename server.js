const express = require('express');
const bodyParser = require('body-parser');
const { saveCodeInput } = require('./services/code.service');
const { respond, respondWithException } = require('./helpers/response.helper');

const app = express();
const port = 5500;

app.use(bodyParser.json());

app.post('/api/submit-code', async (req, res) => {
    try {
        const codeData = req.body;
        if (saveCodeInput) {
            await saveCodeInput(codeData);
            respond(res, 200, { message: 'Code input saved successfully.', code: codeData });
        } else {
            res.status(200).json({ message: 'Code input received.', code: codeData });
        }
    } catch (error) {
        respondWithException(res, error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
