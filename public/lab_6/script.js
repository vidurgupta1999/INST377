function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector(".flex-inner")) {
        document.querySelector(".flex-inner").remove();
      }
      const newArr = range(10);
      const newArr2 = newArr.map(() => {
        const number = getRandomIntInclusive(0, 243);
        return fromServer[number];
      });

      const reverseList = newArr2.sort((a, b) => sortFunction(b, a, "name"));
      const ul = document.createElement("ul");
      ul.className = "flex-inner";
      $("form").prepend(ul);
      reverseList.forEach((el, i) => {
        const li = document.createElement("li");
        $(li).append(
          `<input type="checkbox" value = ${el.code} id=${el.code}/> `
        );
        $(li).append(`<label for = ${el.code}>${el.name} </label>`);
        $(ul).append(li);
      });
    })
    .catch((err) => console.log(err));
});
