window.addEventListener("DOMContentLoaded", () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Generic Fetching error");
      }
      return response.json();
    })
    .then((usersObj) => {
      console.dir(usersObj);
      const allCardsImg = document.querySelectorAll(".card>img");
      const allCardsTitle = document.querySelectorAll(".card .card-title");
      const allCardsP = document.querySelectorAll(".card p");
      const allDiscardButtons = document.querySelectorAll(
        ".card a:nth-of-type(2)"
      );
      const allBuyButtons = document.querySelectorAll(".card a:nth-of-type(1)");
      const listBooksToBuy = document.getElementById("books-to-buy");
      let titlesToBuy = [];

      Array.from(allCardsImg).forEach((img, i) => {
        allCardsImg[i].setAttribute("src", usersObj[i].img);
        allCardsTitle[i].innerHTML = usersObj[i].title;
        allCardsP[i].innerHTML = usersObj[i].price + "€";
        allDiscardButtons[i].onclick = (e) => {
          e.target.parentNode.parentNode.style.display = "none";
        };
        allBuyButtons[i].onclick = (e) => {
          const li = document.createElement("li");
          const allLi = document.getElementsByTagName("li");
          const closestH5 = e.target.closest(".card").querySelector("h5");
          let verifyDiversity = true;
          if (titlesToBuy.includes(closestH5.innerText)) {
            verifyDiversity = false;
          }
          if (verifyDiversity) {
            titlesToBuy.push(closestH5.innerText);
            console.log(titlesToBuy);
            localStorage.setItem("titlesToBuy", JSON.stringify(titlesToBuy));
          }
        };
      });
    });
});
