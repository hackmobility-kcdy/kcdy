export const login = () => {
  fetch("http://localhost:3000/api/smartcar/login", {
    mode: "cors"
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log("login err: ", err));
};
