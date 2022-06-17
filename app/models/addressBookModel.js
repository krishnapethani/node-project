module.exports = (sequelize, Sequelize) => {
    return sequelize.define('addressBook', {
        title: Sequelize.STRING,
        addressLine1: Sequelize.STRING,
        addressLine2: Sequelize.STRING,
        country: {
            type: Sequelize.STRING,
            enum: ['india', 'us', 'uk', 'pakistan', 'japan']
        },
        state: {
            type: Sequelize.STRING,
            enum: ['gujarat', 'punjab', 'bihar', 'rajasthan', 'assam']
        },
        city: {
            type: Sequelize.STRING,
            enum: ['rajkot', 'surat', 'mumbai', 'jaipur', 'ranchi']
        },
        pinCode: {
            type: Sequelize.STRING
        }

    }, { freezeTableName: true, timestamps: false });
}