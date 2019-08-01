module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Post", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  //User.hasMany(Character);

  return User;
};
