import fs from 'fs';
import moment from 'moment';

const REPORT_DIR = 'report';

export default async function handler(req, res) {
    const result = [];
    const file = fs.readdirSync(REPORT_DIR);
    file.forEach((item) => {
        if (item.endsWith('.csv')) {
            const temp = {};
            if (item.indexOf('-') !== -1) {
                const format = process.env.reportNameFormat.split('-');
                const fileParam = item.replace('.csv', '').split('-');
                format.forEach((key) => {
                    if (key === 'date') {
                        temp[key] = moment(fileParam[format.indexOf(key)], 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
                    } else {
                        temp[key] = fileParam[format.indexOf(key)];
                    }
                });
            }
            temp.report = item;
            result.push(temp);
        }
    });
    res.status(200).json(result);
}
