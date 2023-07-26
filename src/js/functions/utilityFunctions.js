export const generateNumberArray = (firstNumber, lastNumber) => {
  let array = []
  for (let i = firstNumber; i <= lastNumber; i++) {
    array.push(i)
  }
  return array
}

export const executeFunctionForMultipleElements = (elements, inputFunction) => {
  for (const element of elements) {
    inputFunction(element)
  }
}
