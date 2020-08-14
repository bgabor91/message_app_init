
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          firstName: "Nigel",
          lastName: "Smith",
          email: 'nigel@email.com',
          password: 'dorwssap'
        },
        {
          id: 2,
          firstName: "Nakaz",
          lastName: "Smith",
          email: 'nakaz@email.com',
          password: 'password1'
        },
        {
          id: 3,
          firstName: "Jaywon",
          lastName: "Smith",
          email: 'jaywon@email.com',
          password: 'password123'
        }
      ]);
    });
};
