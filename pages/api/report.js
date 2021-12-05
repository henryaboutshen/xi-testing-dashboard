import fs from 'fs';

const REPORT_DIR = 'report';

export default async function handler(req, res) {
    const file = fs.readdirSync(REPORT_DIR);
    res.status(200).json(file.filter((item) => item.endsWith('.csv')));
}
