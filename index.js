document.addEventListener("DOMContentLoaded", () => {
  let randomNums = null;
  const paragraphEl = document.querySelector(".display.numbers");
  const randomButtonEl = document.querySelector(".random.button");
  const firstButtonEl = document.querySelector(".first.button");
  const addNumberButtonEl = document.querySelector(".add.button");
  const bearButtonEl = document.querySelector(".bear.button");
  const reverseButtonEl = document.querySelector(".reverse.button");
  const highestButtonEl = document.querySelector(".highest.button");
  const fizzBuzzButtonEl = document.querySelector(".fizz.button");
  const heartButtonEl = document.querySelector(".heart.button");
  const selectEl = document.querySelector(".remove-number");
  const resetButtonEl = document.querySelector(".reset.button");

  randomButtonEl.addEventListener("click", () => {
    let hasBeenClicked = false;

    if (!hasBeenClicked) {
      hasBeenClicked = true;
      randomButtonEl.classList.add("hidden");
      document.querySelector(".button-wrapper").classList.add("visible");
    }

    randomNums = generateRandomNumbers();
    selectEl.innerHTML = "";

    addOptionsToSelect(selectEl, randomNums);
    updateDisplay(paragraphEl, randomNums);
  });

  firstButtonEl.addEventListener("click", () => {
    const firstNum = randomNums[0];

    paragraphEl.textContent = firstNum;
  });

  addNumberButtonEl.addEventListener("click", () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    const index = randomNums.length;
    selectEl.innerHTML = "";

    randomNums[index] = randomNum;

    addOptionsToSelect(selectEl, randomNums);
    updateDisplay(paragraphEl, randomNums);
  });

  bearButtonEl.addEventListener("click", () => {
    selectEl.innerHTML = "";
    let i = 0;

    while (i < randomNums.length) {
      randomNums[i] = "🐻";
      i++;
    }

    addOptionsToSelect(selectEl, randomNums);
    updateDisplay(paragraphEl, randomNums);
  });

  reverseButtonEl.addEventListener("click", () => {
    const reversedNums = [];
    selectEl.innerHTML = "";

    for (let i = randomNums.length - 1; i >= 0; i--) {
      reversedNums.push(randomNums[i]);
    }

    randomNums = reversedNums;

    addOptionsToSelect(selectEl, randomNums);
    updateDisplay(paragraphEl, randomNums);
  });

  highestButtonEl.addEventListener("click", () => {
    let highestNum = 0;

    for (let i = 0; i < randomNums.length; i++) {
      if (randomNums[i] > highestNum) {
        highestNum = randomNums[i];
      }
    }

    paragraphEl.textContent = highestNum ? highestNum : "Null";
  });

  fizzBuzzButtonEl.addEventListener("click", () => {
    selectEl.innerHTML = "";

    for (let i = 0; i < randomNums.length; i++) {
      if (randomNums[i] % 3 === 0 && randomNums[i] % 5 === 0) {
        randomNums[i] = "🫧✨";
      } else if (randomNums[i] % 3 === 0) {
        randomNums[i] = "🫧";
      } else if (randomNums[i] % 5 === 0) {
        randomNums[i] = "✨";
      }
    }

    addOptionsToSelect(selectEl, randomNums);
    updateDisplay(paragraphEl, randomNums);
  });

  heartButtonEl.addEventListener("click", () => {
    if (Array.isArray(randomNums)) {
      const validNums = [];

      for (const num of randomNums) {
        if (typeof num === "number") {
          validNums.push(num);
        }
      }

      const heartContainerEl = document.querySelector(".heart-container");
      let count = 0;
      const delay = 1000;
      for (const num of validNums) {
        let i = 0;
        let result = "";
        while (i < num) {
          result += `
          <span class="heart">
            ❤️
          </span>`;
          i++;
        }

        setTimeout(() => {
          heartContainerEl.innerHTML = result;
        }, delay * count++);
      }
      setTimeout(() => {
        heartContainerEl.innerHTML = "";
      }, delay * count++);
    }
  });

  selectEl.addEventListener("change", (event) => {
    const selectedNum = event.target.value;
    const filteredList = [];
    const selectedOptionEl = selectEl.querySelector(
      `option[value="${selectedNum}"]`,
    );
    selectedOptionEl.remove();

    for (const num of randomNums) {
      if (num !== Number(selectedNum)) {
        filteredList.push(num);
      }
    }

    randomNums = filteredList;
    updateDisplay(paragraphEl, randomNums);
  });

  resetButtonEl.addEventListener("click", () => {
    randomButtonEl.click();
  });

  function updateDisplay(element, nums) {
    element.textContent = `[ ${nums.join(", ")} ]`;
  }

  function generateRandomNumbers() {
    const randomNums = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 100) + 1;
      randomNums.push(randomNum);
    }
    return randomNums;
  }

  function addOptionsToSelect(selectElement, options) {
    function createOption(value, textContent) {
      const optionEl = document.createElement("option");
      optionEl.value = value;
      optionEl.textContent = textContent;
      return optionEl;
    }

    const optionEl = createOption("", "Remove a number!");
    selectElement.appendChild(optionEl);

    for (let i = 0; i < options.length; i++) {
      const option = options[i];

      if (typeof option !== "number") continue;

      const optionEl = createOption(options[i], options[i]);
      selectElement.appendChild(optionEl);
    }
  }
});
