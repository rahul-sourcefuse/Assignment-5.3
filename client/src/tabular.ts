import {User} from './app.js'
import {Role,UserAction} from './model/model.js'


// let env: { API_URL: string };
// (async function () {
//     console.log('a');
//     let fetchData = await fetch("../env.json");
//     env = await fetchData.json();
//   })();
export function api<T>(url: string): Promise<T> {
  return fetch(url).then((response) => {
    return response.json();
  });
}

let UsersData: Array<Array<string>> = [];

let user = new User(UsersData);


function hideTable() {
    document.getElementById("table")!.style.visibility = "hidden";
  }

document.getElementById('load')?.addEventListener('click',async()=>{
    // console.log(env.API_URL);
    let dataNew: Array<object> = await api('http://localhost:2900/users');
    console.log(dataNew);
    document.getElementById("load")!.innerText = "Refresh Data";
    document.getElementById("table")!.style.visibility = "visible";
  
    var placeholder = document.querySelector("#data-output");
    let out = "";
    let i = 1;
    let userItem: any;
    for (userItem of dataNew) {
      console.log(userItem);
      out += `
               <tr id="${userItem.id}">
                  <td>${userItem.firstname} </td>
                  <td>${userItem.middlename}</td>
                  <td>${userItem.lastname}</td>
                  <td>${userItem.email}</td>
                  <td>${userItem.phonenumber}</td>
                  <td>${userItem.role}</td>
                  <td>${userItem.address}</td>
                  <td>${userItem.doj}
                  </td>
                  <td id="buttons"><button onclick="user.buttons(this)">Edit</button> <button onclick="user.removeTr(this)">Delete</button></button></td>
               </tr>
            `;
      i++;
    }
    placeholder!.innerHTML = out;
    console.log("loaded");
})
// async function load() {
    
//   }



document.getElementById("form")?.addEventListener("submit", (e: any) => {
    e.preventDefault();
    if (e.target[5].value in Role) {
      user.addUser(e);
    } else {
      alert(
        e.target[5].value +
          " role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber"
      );
      return;
    }
  });
  export function cancelTr(p: any, e: any, btn: any, sbtn: any) {
    var index = p.rowIndex;
    console.log(UsersData[index]);
  
    // console.log(p.cells);
    console.log(UsersData);
  
    for (let i = 0; i < UsersData[index].length; i++) {
      p.cells[i].innerHTML = UsersData[index][i];
    }
    document.getElementById("btn")!.removeChild(sbtn);
    document.getElementById("btn")!.removeChild(btn);
  }

// export {cancelTr,api};
// module.exports = cancelTr,api;