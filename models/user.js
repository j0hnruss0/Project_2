module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    teamSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loggedIn: {
      type: DataTypes.BOOLEAN
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });

  Player.associate = function(models) {
    Player.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };

  return Player;
};
