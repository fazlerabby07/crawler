module.exports = (sequelize, DataTypes) => {
	const stockExchanges = sequelize.define(
		'stock_exchanges',
		{
			sl: {
				type: DataTypes.STRING,
			},
			date:{ 
        type: DataTypes.DATE
      },
      company_name: {
        type:DataTypes.STRING
      },
      ltp: {
        type:DataTypes.DOUBLE
      },
      high: {
        type:DataTypes.DOUBLE
      },
      low: {
        type:DataTypes.DOUBLE
      },
      openp: {
        type:DataTypes.DOUBLE
      },
      closep: {
        type:DataTypes.DOUBLE
      },
      ycp: {
        type:DataTypes.DOUBLE
      },
      trade: {
        type:DataTypes.DOUBLE
      },
      value: {
        type:DataTypes.DOUBLE
      },
      volume: {
        type:DataTypes.DOUBLE
      },
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updated_at: DataTypes.DATE,
		},
		{
			underscored: true,
		},
	);
	stockExchanges.associate = function(models) {
		// banks.hasMany(models.bank_branches, {as: 'branches'});
		// banks.hasMany(models.bank_accounts);
	};
	return stockExchanges;
};
