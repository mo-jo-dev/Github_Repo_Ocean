const result = document.getElementById("result");
const more = document.getElementById("more");

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
// const apiURL = "https://clist.by";

async function getData() {
    const res = await fetch(`https://clist.by:443/api/v1/contest/?username=mo-jo-dev&api_key=0965da70e684b0485eedc5cf7209098afe12519a&limit=15&offset=0&start__gte=${formatDate(new Date())}&order_by=start&duration__lt=999999`);
    const data = await res.json();
    // console.log(data);
    showData(data);
}

function findPlatform(data){
  if(data == 'codeforces.com'){
    return 'assets/img/codeforces.png'
  }
  if(data == 'codingninjas.com/codestudio'){
    return 'assets/img/codingninjas.png'
  }
  if(data == 'atcoder.jp'){
    return 'assets/img/atcoder.png'
  }
  if(data == 'codechef.com'){
    return 'assets/img/codechef.png'
  }
  if(data == 'dmoj.ca'){
    return 'assets/img/dmoj.png'
  }
  if(data == 'cups.online'){
    return 'assets/img/allcup.svg'
  }
  if(data == 'yukicoder.me'){
    return 'assets/img/yukicoder.png'
  }
  if(data == 'hackerearth.com'){
    return 'assets/img/HackerEarth.png'
  }
  if(data == 'topcoder.com'){
    return 'assets/img/topcoder.png'
  }
  if(data == 'geeksforgeeks.org'){
    return 'assets/img/GeeksforGeeks.png'
  }
  if(data == 'tlx.toki.id'){
    return 'assets/img/tlx.png'
  }
  if(data == 'leetcode.com'){
    return 'assets/img/LeetCode.png'
  }
  if(data == 'ctftime.org'){
    return 'assets/img/ctf_time.svg'
  }
  if(data == 'hackerrank.com'){
    return 'assets/img/hackerrank.svg'
  }
  if(data == 'robocontest.uz'){
    return 'assets/img/hackerrank.svg'
  }
}

function findPlatformTitle(data){
  if(data == 'codeforces.com'){
    return 'CodeForces'
  }
  if(data == 'codingninjas.com/codestudio'){
    return 'CodingNinjas'
  }
  if(data == 'atcoder.jp'){
    return 'AtCoder'
  }
  if(data == 'codechef.com'){
    return 'Codechef'
  }
  if(data == 'dmoj.ca'){
    return 'DMOJ'
  }
  if(data == 'cups.online'){
    return 'All Cups'
  }
  if(data == 'yukicoder.me'){
    return 'YukiCoder'
  }
  if(data == 'hackerearth.com'){
    return 'HackerEarth'
  }
  if(data == 'topcoder.com'){
    return 'TopCoder'
  }
  if(data == 'geeksforgeeks.org'){
    return 'GeeksForGeeks'
  }
  if(data == 'tlx.toki.id'){
    return 'TLX'
  }
  if(data == 'leetcode.com'){
    return 'LeetCode'
  }
  if(data == 'ctftime.org'){
    return 'CTF Time'
  }
}

function showData(data){
    result.innerHTML = `
    <div class="box">
      <ul class="test">
          ${data.objects.map(
              code => `
              <li class="list"><span>
              <strong>${code.event.toUpperCase()}</strong>
              - <span class="comp_name">${findPlatformTitle(code.resource.name)}</span> 
                  <span id="myBtn" class="comp_date"><img src = "./assets/icons/calender.jpg"></span>
                    <div id="myModal" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <p>Some text in the Modal..</p>
                        </div>
                    </div>
              </span>
              <h3><a href="${code.href}" target="_blank"><img class = "comp_icon" src = "${findPlatform(code.resource.name)}"></a></h3>
              </li>
              `
          ).join('')}
      </ul>
      </div>
    `;
    // if(data.meta.offset - 15 >= 0) {
    //   const url_off_g = data.meta.offset - 15;
    // } else {
    //   alert("No Data Found");
    // }
    // if(data.meta.offset + 15 <= 45) {
    //   const url_off_l = data.meta.offset + 15;
    // } else {
    //   alert("No Data Found");
    // }
    if(true){
    more.innerHTML = `
      ${data.meta.offset - 15 >= 0 ? `<button class="btn" onclick="getMoreTests('${data.meta.offset - 15}')">Prev</button>` : ''}
      ${data.meta.offset + 15 <= 45 ? `<button class="btn" onclick="getMoreTests('${data.meta.offset + 15}')">Next</button>` : ''}
      `;
    }
}


async function getMoreTests(url_offset){
  const res = await fetch(`https://clist.by:443/api/v1/contest/?username=mo-jo-dev&api_key=0965da70e684b0485eedc5cf7209098afe12519a&limit=15&offset=${url_offset}&start__gte=${formatDate(new Date())}&order_by=start&duration__lt=999999`);
  const data = await res.json();
  showData(data);
}

getData();