/* eslint-disable consistent-return */
import csvParser from 'csv-parser';
import fs from 'fs';
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

export default async function handler(req, res) {
    const { previous, current } = req.query;
    if (previous && current) {
        const previousFile = await parse(previous);
        const currentFile = await parse(current);
        const data = compare(previousFile, currentFile);
        res.status(200).json({ previous, current, data });
    } else {
        const files = fs.readdirSync(REPORT_DIR).reverse();
        const previousFile = await parse(files[1]);
        const currentFile = await parse(files[0]);
        const data = compare(previousFile, currentFile);
        res.status(200).json({ previous: files[1], current: files[0], data });
    }
}
