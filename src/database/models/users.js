module.exports = (sequelize, Datatypes) => {
    const Users = sequelize.define('users', {
        username: Datatypes.STRING,
        email: Datatypes.STRING
    }, {
        tableName: 'users'
    });
    Users.associate = function(models) {
        //Put associatoins here
    };
    return Users;
}

