import request from 'superagent';

const server = 'http://localhost:8080/data';
const userId = 0;

request
  .get(server)
  .query({
    query: `{
      __type(name: "User") {
        name,
        description,
        kind,
        fields {
          name
          type {
            name
          }
        }
      },
      user(id: ${userId}) {
        name,
        formatted,
        friends {
          name
        }
      }
    }`
  })
  .end(function (err, res) {
    console.log(res.text);
    const response = JSON.parse(res.text);
    const user = response.data.user;
    const friends = user.friends.map(friend => friend.name).join('</li><li>');
    const text = `
      <h1>${user.name}'s friends</h1>
      <ul>
        <li>${friends}</li>
      </ul>
    `;
    document.querySelector('#root').innerHTML = text;
  });
