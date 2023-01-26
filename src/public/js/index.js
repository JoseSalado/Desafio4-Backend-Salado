console.log("on");

const socket = io();

const cardsContainer = document.getElementById("cards-container");

const render = (array) => {
  const html = array.map((elem) => {
    return `<div class="cards">
            <p>Artículo: ${elem.title}</p>
            <p>Descripción: ${elem.description}</p>
            <p>Precio: $ ${elem.price}</p>
            <img src="${elem.thumbnails}">
            </div >`;
  });
  document.querySelector("#cards-container").innerHTML = html;
};

socket.on("message", (data) => {
  console.log(data);
  render(data);
});