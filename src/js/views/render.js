import { nationalities } from "../constants/nationalities"
import { months } from "../constants/months"

import { selectItems } from "./components/selectItems"
import { generateNumberArray } from "../functions/utilityFunctions"

export const render = () => {
  const dates = generateNumberArray(1, 28)
  const years = generateNumberArray(1917, 2023)

  selectItems(nationalities, "nationalityOptionList")
  selectItems(dates, "dateOfBirthOptionList")
  selectItems(months, "monthOptionList")
  selectItems(years, "yearOptionList")
}
