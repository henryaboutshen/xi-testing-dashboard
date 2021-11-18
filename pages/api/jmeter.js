import csvParser from 'csv-parser';
import fs from 'fs';

const REPORT_DIR = 'report';

function parse(file) {
    return new Promise((resolve, reject) => {
        const result = [];
        fs.createReadStream(`${REPORT_DIR}/${file}.csv`)
            .on('error', (error) => reject(error))
            .pipe(csvParser())
            .on('data', (data) => result.push(data))
            .on('end', () => {
                result.pop();
                resolve(result);
            })
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
