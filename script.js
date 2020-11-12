setTimeout(() => {
  let preloader = document.getElementById('preloader');
  let wrap = document.getElementById('wrap');
  preloader.classList.add('hidden');
}, 3000);

let url = `https://api.github.com/users/DimkaVeselov`;
let currentDate = new Date().toLocaleDateString();

let getDate = new Promise((resolve, reject) => {
  setTimeout(() => currentDate ? resolve(currentDate) : reject('o_O'), 3000);
});

let getUser = new Promise((resolve, reject) => {
  setTimeout(() => url ? resolve(url) : reject('Упс =('), 3000)
});

Promise.all([getDate, getUser])
  .then(([currentDate, url]) => {
    let wrap = document.getElementById('wrap');
    let newDate = document.createElement('div');
    newDate.className = 'disc-date';
    newDate.innerHTML = currentDate;
    wrap.prepend(newDate);

    fetch(url)
      .then(response => response.json())
      .then(json => {
        
        let {avatar_url, name, company, html_url} = json;

        let avatarUser = document.createElement('img');
        avatarUser.className = 'img';
        avatarUser.src = json.avatar_url;
        document.body.append(avatarUser);

        let nameUser = document.createElement('h2');
        nameUser.className = 'name';
        nameUser.innerHTML = json.name;
        document.body.prepend(nameUser);

        let bioUser = document.createElement('p');
        bioUser.className = 'bio';
        bioUser.innerHTML = json.company;
        document.body.append(bioUser);

        let linkUser = document.createElement('a');
        linkUser.className = 'link';
        linkUser.innerHTML = json.html_url;
        linkUser.href = json.html_url;
        document.body.append(linkUser);

  })

  .catch(function (error) {
    document.body.innerHTML = `УПС o_O ${error}`  
  })
  })