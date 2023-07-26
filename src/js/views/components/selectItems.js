export const selectItems = (array, id) => {
  let options = ""
  array.forEach((item) => {
    options += `<li class="select-item">${item}</li>`
  })
  document.getElementById(id).innerHTML = options
}
