import { executeFunctionForMultipleElements } from "./utilityFunctions"
import { showAlert } from "./alert.js"

const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const mask = "●"

export const selects = document.querySelectorAll(".select")

const checkIfEmpty = (value) => value.length > 0

const validateEmail = (value) => regexEmail.test(value)

const validatePassword = (value) => regexPassword.test(value)

const validateConfirmPassword = (passwordInputs) =>
  passwordInputs[0].value == passwordInputs[1].value

const validateInputs = (element, passwordInputs) => {
  return element.type === "text" &&
    !element.closest(".select") &&
    !checkIfEmpty(element.value)
    ? (element.closest(".form-item").classList.add("error"),
      showAlert("The field cannot be empty!"),
      false)
    : element.closest(".select") && !checkIfEmpty(element.value)
    ? (element.closest(".form-item").classList.add("error"),
      showAlert("You have to choose a nationality!"),
      false)
    : element.type === "email" && !validateEmail(element.value)
    ? (element.closest(".form-item").classList.add("error"),
      showAlert("Enter a valid email!"),
      false)
    : !validatePassword(element.value) && element.type === "password"
    ? (element.closest(".form-item").classList.add("error"),
      showAlert(
        "Password must contain at least eight characters, at least one number and both lower and uppercase letters and passwords must match"
      ),
      false)
    : !validateConfirmPassword(passwordInputs) && element.type === "password"
    ? (element.closest(".form-item").classList.add("error"),
      showAlert(
        "Password must contain at least eight characters, at least one number and both lower and uppercase letters and passwords must match"
      ),
      false)
    : (element.closest(".form-item").classList.add("valid"), true)
}

const validateForm = (inputs) => {
  let errors = 0
  const result = {}
  for (const element of inputs) {
    element.closest(".form-item").classList.remove("error")
    !validateInputs(element) ? errors++ : (result[element.name] = element.value)
  }
  return errors > 0 ? false : result
}

export const maskPassword = (element) => {
  element.addEventListener("input", (e) => {
    e.target.previousElementSibling.innerText = mask.repeat(
      e.target.value.length
    )
  })
}

export const selectInputListener = (element) => {
  const selectList = element.lastElementChild
  const selectInput = element.firstElementChild
  const selectPlaceholder = element.querySelector(".select-placeholder")
  selectList.addEventListener("click", (e) => {
    e.stopPropagation()
    selectInput.value = e.target.textContent
    selectPlaceholder.classList.remove("open")
    selectPlaceholder.textContent = e.target.textContent
    selectList.classList.add("hidden")
  })
  element.addEventListener("click", (e) => {
    executeFunctionForMultipleElements(selects, toggleSelectClass)
    selectPlaceholder.classList.add("open")
    selectList.classList.remove("hidden")
  })
}

export const formInputListener = (form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputs = e.target.querySelectorAll("input")
    const button = e.target.querySelector("button")
    if (validateForm(inputs)) {
      form.innerHTML =
        '<div> <h3 class="form-title">Thank you</h3><p class="form-subtitle">you registered!</p></div> <div class="form-bottom"><p class="login-text">Have an account?&nbsp;<a class="login-link" href="#">Login</a></p></div>'

      fetch("../assets/json/server.json")
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          alert(data.message)
        })
      return
    }
    button.classList.add("button-error")
    setTimeout(() => {
      button.classList.remove("button-error")
    }, 1000)
  })
}

const toggleSelectClass = (element) => {
  const selectList = element.lastElementChild
  const selectPlaceholder = element.childNodes[1]
  selectList.classList.add("hidden")
  selectPlaceholder.classList.remove("open")
}
