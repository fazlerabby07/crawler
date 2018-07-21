# Initialize

1. Execute `npm install` on project root.
2. Create a database in mysql and name will be `dse`.

3. Create configuration file:
  - Create a copy of `[project root]/config/sample.config.json` file in the same directory
  - Rename to `config.json`
  - Adjust settings as needed

# Migration

1. node_modules/.bin/sequelize db:migrate

# Routes

1. for data crawling from Dhaka stockexchange and insert data in database
    `GET localhost:3000/stocks/crawler`
2. for see the performance based on (tread, value and volume) of all company 
    `localhost:3000/stocks/performance?type=value`
3. for see the growth of a company
    `localhost:3000/stocks/growth?company_name=AAMRANET`