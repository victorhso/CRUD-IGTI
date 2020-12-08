window.addEventListener("load", start);

var globalNames = ["Um", "Dois", "Tres", "Quatro"];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  inputName = document.querySelector("#inputName");
  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
    render();
  }

  function handleTyping(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function render() {
  function deleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }

    var button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "X";

    //Quando acontecer algo no botão, ele executará o comando de delete.
    button.addEventListener("click", deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;
    span.addEventListener("click", editItem);

    return span;
  }

  var divNames = document.querySelector("#names");
  divNames.innerHTML = "";

  //Criar UL
  //fazer n li's, conforme tamanho do vetor globalNames
  var ul = document.createElement("ul");

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement("li");
    var button = deleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();

  function clearInput() {
    inputName.value = "";
    inputName.focus();
  }
}
