const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: true
  },
  profilepic: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: true
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false
})

const Match = db.define('match', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  timestamps: false
});

const Message = db.define('message', {
  text: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})

User.belongsToMany(User, {as: 'matchee', through: Match, unique: false});
Message.belongsTo(User, { as: 'user', through: Message, foreignKey: {name: 'userId', unique: false }})
Message.belongsTo(User, { as: 'recipient', through: Message, foreignKey: {name: 'recipientId', unique: false }})

User.sync();
Match.sync();
Message.sync();

module.exports = {
  User, 
  Match,
  Message
};