module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: DataTypes.STRING,
    pic: DataTypes.STRING,
    strength: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER,
    skill: DataTypes.INTEGER
  });

  Character.associate = function(models) {
    Character.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Character;
};
