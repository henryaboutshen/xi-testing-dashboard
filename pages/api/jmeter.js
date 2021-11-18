import csvParser from 'csv-parser';
import fs from 'fs';

function parse(file) {
    return new Promise((resolve, reject) => {
        const result = [];
        fs.createReadStream(`report/${file}.csv`)
            .on('error', (error) => reject(error))
            .pipe(csvParser())
            .on('data', (data) => result.push(data))
            .on('end', () => resolve(result))
            .on('error', (error) => reject(error));
    });
}

export default async function handler(req, res) {
    const { file } = req.query;
    if (file) {
        const result = await parse(file);
        res.status(200).json(result);
    } else {
        res.status(404).json({ error: 'Invalid parameter' });
    }
}
