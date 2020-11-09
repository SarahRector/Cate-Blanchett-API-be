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

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM suits WHERE id=$1 RETURNING *',
      [id]
    );

    if(!rows[0]) return null;
    return new Suit(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM suits WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Suit(rows[0]);
  }

  static async update(id, suit) {
    const { rows } = await pool.query(
      `UPDATE suits
      SET color=$1,
      designer=$2,
      image=$3
      WHERE id=$4
      RETURNING *
      `,
      [suit.color, suit.designer, suit.image, id]
    );

    return new Suit(rows[0]);
  }
};
