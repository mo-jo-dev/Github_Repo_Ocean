const form = document.getElementById("form");
const search = document.getElementById("search");
const user_image = document.getElementById("user_image");
const user_info = document.getElementById("user_info");
const user_repo = document.getElementById("user_repo");
const more = document.getElementById("more");
const astr = document.getElementById("astr");
const pages = document.getElementById("pages");

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

const getRepo = async (user_name, page) => {
    const user_res = await fetch(`https://api.github.com/users/${user_name}`);
    const user_data = await user_res.json();
    user_image.innerHTML = 
    `
        <img src = "${user_data.avatar_url}" class="u_img"></img>
    `;
    user_info.innerHTML = 
    `
        <h2 class="repo_user_name">${user_data.name.toUpperCase()}</h2>
        <h3 class="repo_attribute">Username: <span class="repo_link">${user_data.login}</span><a href = "https://github.com/${user_data.login}" target = "_blank"><img style = "padding-left: 8px; width: 20px;" src="./assets/icons/link.png"></a></h3>
        <p><strong class="repo_attribute">Institution:</strong> ${user_data.company}</p>
        <p><strong class="repo_attribute">Public Repositories:</strong> ${user_data.public_repos}</p>
        <p><strong class="repo_attribute">Following:</strong> ${user_data.following}</p>
        <p><strong class="repo_attribute">Followers:</strong> ${user_data.followers}</p>
        <p style="display:flex; align-items:center;"><img style = "padding-right: 10px; width: 40px" src="./assets/icons/map.png"> ${user_data.location}</p>
    `

    const res = await fetch(`https://api.github.com/users/${user_name}/repos?per_page=10&page=${page}`);
    const data = await res.json();
    showRepo(data, user_data.login, user_data.public_repos);
}

var count_ = 1;
const showRepo = async (data, user_name, public_repos) => {
    // const lang_data = (await fetch(`https://api.github.com/repos/${user_name}/${repos.name}/languages`)).json().data;
    // <p><strong class="repo_attr"></strong> ${formatDate(repos.created_at)}</p>
    user_repo.innerHTML = 
    `    ${data.map(
        repos=>
            `
                <div class="repo">
                    <h4>${repos.name}</h4>
                    <p><strong class="repo_attr">Visibility:</strong> ${repos.visibility}</p>
                    <p><strong class="repo_attr">No. of Forks:</strong> ${repos.forks}</p>
                    <p><strong class="repo_attr">Watchers:</strong> ${repos.watchers}</p>
            
                    ${repos.language != null ? `<p class="repo_lang">${repos.language}</p>` : ''
                    }
                </div>
            `
        ).join('')}
    `
    pages.innerHTML = `<p class="show_page">${count_}</p>`;
    more.innerHTML = `
        ${count_ > 1 ? `<button class="btn" onclick="getMoreRepos('${user_name}','${public_repos}','prev')">Prev</button>` : ''}
        ${public_repos - 10*count_ > 0 ? `<button class="btn" onclick="getMoreRepos('${user_name}','${public_repos}','next')">Next</button>` : ''}
    `;

} 

async function getMoreRepos(user_name, public_repos, check){
    if(check == 'next') {
        count_ = count_ + 1;
    }
    else {
        count_ = count_ - 1;
    }
    const res = await fetch(`https://api.github.com/users/${user_name}/repos?per_page=10&page=${count_}`);
    const data = await res.json();
    showRepo(data, user_name, public_repos);
}



form.addEventListener("submit", async (e) => {
e.preventDefault();
    const user_name = search.value.trim();
    const check = await fetch(`https://api.github.com/users/${user_name}`);
    const data = await check.json();
    if (!user_name) {
        alert("Please type in a search term");
    }
    else if(data.message == 'Not Found'){
        // alert("Incorrect Username!! Try Again");
        user_image.innerHTML = ``;
        user_info.innerHTML = ``;
        user_repo.innerHTML = ``;
        more.innerHTML = ``;    
        astr.innerHTML =  
        `
            <div class="section1">
                <img src="./assets/img/404.png" alt="">
                <p class="one">looks like you are</p>
                <p class="two">lost somewhere in the space</p>
                <p style="color: white; font-size:25px">"recheck your username"<p>
            </div>
        `
    }
    else {
        astr.innerHTML = ``;
        getRepo(user_name,1);
    }
});
