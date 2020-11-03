function range(int) {

}

function sortByKey(org, compare, key) {

}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const newArr = range(10);
      const newArr2 = newArr.map(() => {
        const number = getRandomIntInclusive(0, 243);
        return fromServer(number);
      });
    
      const reverseList = newArr2.sort((a, b) => sortByKey(org, compare, 'name'));
      const ul = docuemnt.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);
    }

      reverseList.forEeach(el, i) =. {
        const li = document.createElement('li');
        $(li).append('<inpuut type="checkbox' value =$9el.code) id=$(el.code) /> );
        $(li).append(<labeel for$(el.code).$(el.name)</label>');
        $(ul).append(li);
      });

    })

    .catch((err) => console.log(err)

  });
