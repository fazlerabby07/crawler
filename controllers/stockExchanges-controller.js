const models = require('../models');
const puppeteer = require('puppeteer');

// console.log(models);

const crawler= async function(req, res){
    try {
        let browser, page;
        browser = await puppeteer.launch({
            // headless: false,
        });
        page = await browser.newPage();
        await page.goto('https://www.dsebd.org/data_archive.php');

        const firstDate = '#DayEndSumDate1_day';
        const lastDate = '#DayEndSumDate2_day';
        const viewButton = 'body > table:nth-child(9) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="submit"]';


        await page.click(firstDate);
        await page.keyboard.type("1");

        await page.click(lastDate);
        await page.keyboard.type("15");

        await page.click(viewButton);

        await page.waitForNavigation({waitUntil: 'networkidle2'});


        await page.screenshot({path: 'example.png'});

        const data = await page.evaluate(() => {
            const tds = Array.from(document.querySelectorAll('body > table:nth-child(9) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(1) > table > tbody > tr'))
            return tds.map((td) => {
                const tabSep= td.innerText.replace(/\t/g, ' ');
                const removeCommas = tabSep.replace(/,/g, '');
                const addCommas = removeCommas.replace(/\s/g, ',');
                return addCommas;
            })
        });
        await browser.close();
        data.splice(0, 1);


        const bulkInsertData = data.map((d) => {
            const sp = d.split(',');
            const obj = sp.reduce(function(acc, cur, i) {
                switch(i) {
                    case 0: 
                        acc['sl']=  parseInt(cur);
                        break;
                    case 1: 
                        acc['date']=  cur;
                        break;
                    case 2: 
                        acc['company_name']=  cur;
                        break;
                    case 3: 
                        acc['ltp']=  parseFloat(cur);
                        break;
                    case 4: 
                        acc['high']=  parseFloat(cur);
                        break;
                    case 5: 
                        acc['low']=  parseFloat(cur);
                        break;
                    case 6: 
                        acc['openp']=  parseFloat(cur);
                        break;
                    case 7: 
                        acc['closep']=  parseFloat(cur);
                        break;
                    case 8: 
                        acc['ycp']=  parseFloat(cur);
                        break;
                    case 9: 
                        acc['trade']=  parseFloat(cur);
                        break;
                    case 10: 
                        acc['value']=  parseFloat(cur);
                        break;
                    case 11: 
                        acc['volume']=  parseFloat(cur);
                        break;
                }
                // acc[i] = cur;
                return acc;
              }, {});
              return obj;
        });
        const bulkInsert = await models.stock_exchanges.bulkCreate(bulkInsertData);
        return res.status(200).send(bulkInsert);
    } catch(err) {
        throw err;
    }
};
const performance = async function(req, res) {
    try {
        const search = req.query.type;
        let orderBy;
        if(search === 'value') {
            orderBy = [models.sequelize.fn('SUM', models.sequelize.col('value')),'DESC'];
        } else if(search === 'trade') {
            orderBy = [models.sequelize.fn('SUM', models.sequelize.col('trade')),'DESC'];
        } else if(search === 'volume') {
            orderBy = [models.sequelize.fn('SUM', models.sequelize.col('volume')),'DESC'];
        } else {
            orderBy = ['company_name', 'ASC'];
        }
        const stocks = await models.stock_exchanges.findAll({
            attributes: [
                'company_name',
                [models.sequelize.fn('SUM', models.sequelize.col('value')), 'total_value'],
                [models.sequelize.fn('SUM', models.sequelize.col('trade')), 'total_trade'],
                [models.sequelize.fn('SUM', models.sequelize.col('volume')), 'total_volume'],
            ],
            group: ['company_name'],
            order: [
                orderBy 
            ],
        });
        return res.status(200).send(stocks);
    } catch(err) {
        throw err;
    }
}

const growth = async function(req, res) {
    try{
        const company_name = req.query.company_name;
        const stocks = await models.stock_exchanges.findAll({
            attributes: [
                'date',
                'company_name',
                'ltp',
                'high',
                'low',
                'openp',
                'closep',
                'ycp',
                'trade',
                'value',
                'volume'
            ],
            where: {
                'company_name': company_name
            },
            order: [
                ['date', 'DESC'] 
            ],
        });
        return res.status(200).send(stocks);
    } catch(err) {
        throw err;
    }
}


module.exports= {
    crawler,
    performance,
    growth
};
