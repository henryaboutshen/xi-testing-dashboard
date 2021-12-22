import csvParser from 'csv-parser';
import fs from 'fs';
import moment from 'moment';

const REPORT_DIR = 'report';

const parse = (file) => new Promise((resolve, reject) => {
    const result = [];
    fs.createReadStream(`${REPORT_DIR}/${file}`)
        .on('error', (error) => reject(error))
        .pipe(csvParser({
            mapValues: ({ header, value }) => {
                if (['# Samples', 'Average', 'Median', '90% Line', '95% Line', '99% Line', 'Min', 'Max'].includes(header)) {
                    return parseInt(value, 10);
                }
                if (['Error %', 'Throughput', 'Received KB/sec', 'Sent KB/sec'].includes(header)) {
                    return parseFloat(value);
                }
                return value;
            },
        }))
        .on('data', (data) => result.push(data))
        .on('end', () => {
            result.pop();
            resolve(result);
        })
        .on('error', (error) => reject(error));
});

const indicatorParse = (file) => {
    const indicator = {};
    if (file.endsWith('.csv') && file.indexOf('-') !== -1) {
        const format = process.env.reportNameFormat.split('-');
        const fileParam = file.replace('.csv', '').split('-');
        format.forEach((key) => {
            if (key === 'date') {
                indicator[key] = moment(fileParam[format.indexOf(key)], 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
            } else {
                indicator[key] = fileParam[format.indexOf(key)];
            }
        });
    }
    return indicator;
};

export default async function handler(req, res) {
    const { file } = req.query;
    if (file) {
        const indicator = indicatorParse(file);
        const data = await parse(file);
        res.status(200).json({ file, indicator, data });
    } else {
        const files = fs.readdirSync(REPORT_DIR).reverse();
        const indicator = indicatorParse(files[0]);
        const data = await parse(files[0]);
        res.status(200).json({ file: files[0], indicator, data });
    }
}
