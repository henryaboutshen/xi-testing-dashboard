import fs from 'fs';

const REPORT_DIR = 'report';

export default async function handler(req, res) {
    const { file } = req.query;
    if (file) {
        const path = `${REPORT_DIR}/${file}.csv`;
        const stat = fs.statSync(path);
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Length': stat.size,
        });
        const readStream = fs.createReadStream(path);
        readStream.pipe(res);
    } else {
        res.status(404).json({ error: 'Invalid parameter' });
    }
}
