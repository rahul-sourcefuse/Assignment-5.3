"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var tabular_js_1 = require("./tabular.js");
// let env: { API_URL: string };
// (async function () {
//   let fetchData = await fetch("./env.json");
//   env = await fetchData.json();
// console.log(env);
// })();
// function api<T>(url: string): Promise<T> {
//   return fetch(url).then((response) => {
//     return response.json();
//   });
// }
var dat;
function userCreatedDate() {
    return function (target, propertyKey, descriptor) {
        var d = new Date();
        var dt = d.getDate() +
            " " +
            d.toLocaleString("en-US", { month: "long" }) +
            " " +
            d.getFullYear() +
            " Time: " +
            d.getHours() +
            ":" +
            d.getMinutes();
        dat = dt.toString();
    };
}
var User = /** @class */ (function () {
    function User(UsersData) {
        this.UsersData = UsersData;
    }
    User.prototype.addUser = function (arr) {
        var newUser = [];
        for (var i = 0; i < arr.target.length - 1; i++) {
            newUser.push(arr.target[i].value);
        }
        newUser.push(dat);
        //newUser have all details of form data
        var data = {
            firstName: newUser[0],
            middleName: newUser[1],
            lastName: newUser[2],
            email: newUser[3],
            phoneNumber: newUser[4],
            Role: newUser[5],
            Address: newUser[6],
            Doj: newUser[7]
        };
        // console.log(JSON.stringify(data));
        fetch("http://localhost:2900/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(function (response) {
            return response.json();
        });
        this.UsersData.push(newUser);
        var placeholder = document.querySelector("#data-output");
        var out = "";
        var r = document.getElementById("table");
        // let i=r.rows[r.rows.length-1];
        var t = r.getElementsByTagName("TR");
        var id = t[t.length - 1].getAttribute("id");
        // console.log(i);
        id++;
        out = "<tr id=\"" + id + "\">\n<td>" + newUser[0] + " </td>\n<td>" + newUser[1] + "</td>\n<td>" + newUser[2] + "</td>\n<td>" + newUser[3] + "</td>\n<td>" + newUser[4] + "</td>\n<td>" + newUser[5] + "</td>\n<td>" + newUser[6] + "</td>\n<td>" + dat + "</td>\n\n<td id=\"buttons\"><button onclick=\"buttons(this)\">Edit</button> <button onclick=\"removeTr(this)\">Delete</button></button></td>\n</tr>";
        placeholder.innerHTML += out;
        console.log(out);
        // console.log(user);
    };
    User.prototype.buttons = function (e) {
        var ide = e.parentNode.parentNode;
        var prevData = ide;
        var updatedArr = [];
        // console.log(ide);
        // console.log(ide.rowIndex+"qwertyui");
        updatedArr.push(ide.rowIndex);
        var len = ide.parentNode.parentNode.rows[0].cells.length;
        // var a=document.getElementById("table")!.rows[ide.rowIndex].cells[0].innerText;
        // console.log(a);
        var id = ide.getAttribute("id");
        // console.log(id + "idddddddddddddddddddd");
        ide.contentEditable = "true";
        ide.id = "edit+" + 1;
        console.log("edit");
        document.getElementById("buttons").contentEditable = "false";
        //  var editElem = document.getElementById("edit");
        var saveBtn = document.getElementById("saveid");
        if (!saveBtn) {
            //#myElementID element DOES NOT exist
            var savebutton = document.createElement("button");
            savebutton.innerHTML = "Save";
            savebutton.className = "save";
            savebutton.id = "saveid";
            document.getElementById("btn").appendChild(savebutton);
            savebutton.onclick = function () {
                saveEdits();
                // console.log(updatedArr[0] + "refer id");
                for (var i = 0; i < len - 1; i++) {
                    var t = document.getElementById("table");
                    var a = t.rows[ide.rowIndex].cells[i].innerText;
                    // console.log(a);
                    updatedArr.push(a);
                }
                // console.log(updatedArr);
                var data = {
                    firstName: updatedArr[1],
                    middleName: updatedArr[2],
                    lastName: updatedArr[3],
                    email: updatedArr[4],
                    phoneNumber: updatedArr[5],
                    Role: updatedArr[6],
                    Address: updatedArr[7],
                    Doj: updatedArr[8]
                };
                fetch("http://localhost:2900/users/" + id, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
            };
        }
        var cancelBtn = document.getElementById("cancelid");
        if (!cancelBtn) {
            //#myElementID element DOES NOT exist
            var cancelButton = document.createElement("button");
            cancelButton.innerHTML = "Cancel";
            cancelButton.className = "cancel";
            cancelButton.id = "cancelid";
            document.getElementById("btn").appendChild(cancelButton);
            cancelButton.onclick = function () {
                tabular_js_1.cancelTr(prevData, this, cancelButton, savebutton);
            };
        }
        function saveEdits() {
            console.log("saveEdits");
            //get the editable element
            var editElem = document.getElementById("edit");
            //get the edited element content
            // var userVersion = editElem!.innerHTML;
            //save the content to local storage
            // localStorage.userEdits = userVersion;
            //write a confirmation to the user
            //   document.getElementById("update").innerHTML="Edits saved!";
            document.getElementById("btn").removeChild(savebutton);
            document.getElementById("btn").removeChild(cancelButton);
            savebutton.addEventListener("click", saveEdits);
        }
    };
    User.prototype.removeTr = function (e) {
        var ide = e.parentNode.parentNode;
        // let id=ide.rowIndex;
        var i = ide.getAttribute("id");
        // console.log(ide.getAttribute('id'),'iddddddddddddddddddddddddddddddd');
        // console.log(ide.rowIndex);
        var p = ide.parentNode;
        p.removeChild(ide);
        fetch("http://localhost:2900/users/" + i, {
            method: "DELETE",
            headers: { "Content-type": "applicaton/json;charset=UTF-8" }
        });
        // document.getElementById("btn").removeChild(savebutton);
    };
    __decorate([
        userCreatedDate()
    ], User.prototype, "addUser");
    return User;
}());
exports.User = User;
// export {User};
