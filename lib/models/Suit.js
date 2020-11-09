const pool = require('../utils/pool');

module.exports = class Suit {
  id;
  color;
  designer;
  image;

  constructor(row) {
    this.id = row.id;
    this.color = row.color;
    this.designer = row.designer;
    this.image = row.image;
  }

  static async insert(suit) {
    const { rows } = await pool.query(
      'INSERT INTO suits (color, designer, image) VALUES ($1, $2, $3) RETURNING *',
      [suit.color, suit.designer, suit.image]
    );

    return new Suit(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM suits'
    );

    return rows.map(row => new Suit(row));
  }
};
