/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if (!containerElement) return null

  const returnObject = {

    addGuest(name, side) {
      const div = document.createElement("div")
      div.classList.add("guest-item")
      div.dataset.name = name;
      div.dataset.side = side

      const span = document.createElement("span")
      span.textContent = name;
      const button = document.createElement("button")
      button.classList.add("remove-btn")
      button.textContent = "Remove"
      div.appendChild(span)
      div.appendChild(button)
      containerElement.appendChild(div)
      return div
    },

    removeGuest(name) {
      const guestItem = containerElement.querySelector(`.guest-item[data-name="${name}"]`)
      if (!guestItem) return false
      guestItem.remove()
      return true
    },

    getGuests() {
      const guests = []
      const items = containerElement.querySelectorAll(".guest-item")
      items.forEach((div) => {
        guests.push({
          name: div.dataset.name,
          side: div.dataset.side
        })
      })
      return guests
    }
  }

  const handler = (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const guestItem = event.target.closest(".guest-item")
      if (guestItem) {
        guestItem.remove()
      }
    }
  }

  containerElement.addEventListener("click", handler)
  return returnObject

}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here

  if (!containerElement || !previewElement) return null


  const button1 = document.createElement("button")
  button1.classList.add("theme-btn")
  button1.dataset.theme = "traditional"
  button1.textContent = "traditional"
  const button2 = document.createElement("button")
  button2.classList.add("theme-btn")
  button2.dataset.theme = "modern"
  button2.textContent = "modern"
  const button3 = document.createElement("button")
  button3.classList.add("theme-btn")
  button3.dataset.theme = "royal"
  button3.textContent = "royal"
  containerElement.appendChild(button1)
  containerElement.appendChild(button2)
  containerElement.appendChild(button3)

  const handler = (event) => {
    if (event.target.classList.contains("theme-btn")) {
      const theme = event.target.dataset.theme;
      previewElement.className = theme
      previewElement.setAttribute("data-theme", theme)
    }
  }
  containerElement.addEventListener("click", handler)

  const returnObject = {
    getTheme() {
      const theme = previewElement.getAttribute("data-theme")
      if (!theme) return null
      return theme
    }
  }

  return returnObject
}

export function setupCardEditor(cardElement) {
  // Your code here
  if (!cardElement) return null

  const handler = (event) => {
    const editable = cardElement.event.target.closest("[data-editable]");
    if (editable && cardElement.contains(editable)) {
      const current = cardElement.querySelector(".editing")
      if (current) {
        current.classList.remove(".editing")
        current.removeAttribute("contentEditable")
      }

      editable.contentEditable = "true"
      editable.classList.add("editing")
    } else if (event.target === cardElement) {

      const current = cardElement.querySelector(".editing")
      if (current) {
        current.classList.remove(".editing")
        current.removeAttribute("contentEditable")
      }
    }
  }

  cardElement.addEventListener("click", handler)

  return {
    getContent(field) {
      const el = cardElement.querySelector(`[data-editable="${field}"]`)
      if (!el) return null;
      return el.textContent;
    }
  }
}
