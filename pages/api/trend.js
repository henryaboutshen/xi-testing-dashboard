/* eslint-disable consistent-return */
import csvParser from 'csv-parser';
import fs from 'fs';
import moment from 'moment';
import _ from 'lodash';

const REPORT_DIR = 'report';

const parse = (file) => new Promise((resolve, reject) => {
    const result = [];
    fs.createReadStream(`${REPORT_DIR}/${file}`)
        .on('error', (error) => reject(error))
        .pipe(csvParser({
            mapValues: ({ header, value }) => {
                if (header === '90% Line') {
                    return parseInt(value, 10);
                }
                if (header === 'Label') {
                    return value;
                }
            },
        }))
        .on('data', (data) => result.push(data))
        .on('end', () => {
            result.pop();
            resolve(result);
        })
        .on('error', (error) => reject(error));
});

const compare = (benchmark, current) => {
    const result = [];
    current.forEach((item) => {
        const temp = {};
        temp.Label = item.Label;
        temp.Current = item['90% Line'];
        const benchmarkLine90 = _.find(benchmark, { Label: item.Label });
        if (benchmarkLine90) {
            temp.Previous = benchmarkLine90 ? benchmarkLine90['90% Line'] : null;
            temp.Difference = benchmarkLine90 ? temp.Current - temp.Previous : null;
            result.push(temp);
        }
    });
    return result;
};

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
    const { file1, file2 } = req.query;
    if (file1 && file2) {
        const indicator = indicatorParse(file1);
        const data = await parse(file1);
        res.status(200).json({ file1, indicator, data });
    } else {
        const files = fs.readdirSync(REPORT_DIR).reverse();
        const benchmark = await parse(files[1]);
        const current = await parse(files[0]);
        const data = compare(benchmark, current);
        res.status(200).json({ benchmark: files[1], current: files[0], data });
    }
}
