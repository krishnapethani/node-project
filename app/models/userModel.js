module.exports = (sequelize, Sequelize) => {
    return sequelize.define('users', {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
        gender: {
            type: Sequelize.STRING,
            enum: ['male', 'female', 'other']
        },
        profile: {
            type: Sequelize.STRING
        }

    }, { freezeTableName: true, timestamps: false });
}