document.addEventListener("DOMContentLoaded", async () => {

    // pricechecker

    const userInput = document.getElementById("id");
    const getItemInfoButton = document.getElementById("button");
    const priceDisplay = document.querySelector(".price");
    const itemImage = document.querySelector(".item-image");

    let itemList = [];

    // darkmode

    const darkmodeToggle = document.getElementById("darkmodeToggle");
    const label = document.querySelector("label[for='darkmodeToggle']");
    const circle = label?.querySelector(".circle");
    const background = document.querySelector(".background");

    // hamburger + off-screen-menu

    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");

    //rock paper scissors spock lizzard

    let userScore = 0;
    let computerScore = 0;
    const userScore_span = document.getElementById("user-score");
    const computerScore_span = document.getElementById("computer-score");
    const result_p = document.querySelector(".result > p");
    const rock_div = document.getElementById("rock");
    const paper_div = document.getElementById("paper");
    const scissors_div = document.getElementById("scissors");
    const spock_div = document.getElementById("spock");
    const lizard_div = document.getElementById("lizard");


    // pricechecker

    try {
        const response = await fetch("https://prices.runescape.wiki/api/v1/osrs/mapping");
        if (!response.ok) throw new Error("Failed to fetch item list");
        itemList = await response.json();
    } catch (error) {
        console.error("Error fetching item list:", error);
        priceDisplay.textContent = "Error loading item data.";
        return;
    }

    if (getItemInfoButton) {
        getItemInfoButton.addEventListener("click", async () => {
            
            const itemName = userInput?.value.trim().toLowerCase();
        
            if (!itemName) {
                priceDisplay.textContent = "Please enter an item name.";
                return;
            }
            
            const item = itemList.find(i => i.name.toLowerCase() === itemName);

            if (!item) {
                priceDisplay.textContent = "Item not found.";
                if (itemImage) itemImage.src = "placeholder.png"; // Default image
                return;
            }

            const [price, imageUrl] = await Promise.all([
                fetchPriceData(item.id),
                fetchItemImage(item.id)
            ]);

            priceDisplay.textContent = price;

            if (itemImage) {
                itemImage.src = imageUrl || "placeholder.png";
                itemImage.alt = item.name;
                itemImage.style.display = imageUrl ? "block" : "none";
            }
        });
    }

    if (userInput) {
        userInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                getItemInfoButton.click();
            }
        });
    }

    async function fetchPriceData(itemId) {
        try {
            const response = await fetch(`https://prices.runescape.wiki/api/v1/osrs/latest?id=${itemId}`);
            if (!response.ok) throw new Error("Failed to fetch price data");

            const json = await response.json();
            const data = json.data[itemId];
            if (!data) return "Price data not available.";

            const averagePrice = ((data.high + data.low) / 2).toFixed(2);
            return `Average price: ${Number(averagePrice).toLocaleString()} GP`;
        } catch (error) {
            console.error("Error fetching price data:", error);
            return "An error occurred.";
        }
    }

    async function fetchItemImage(itemId) {
        try {
            const imageUrl = `https://secure.runescape.com/m=itemdb_oldschool/1741174183496_obj_big.gif?id=${itemId}`;
            return imageUrl;
        } catch (error) {
            console.error("Error fetching item image:", error);
            return "";
        }
    }

    // darkmode logiikka ja tallentaminen localstorageen
    let darkmode = localStorage.getItem('darkmode');

    const enableDarkmode = () => {
        document.body.classList.add('darkmode');
        if (background) background.style.backgroundColor = "#242424";
        if (label) label.style.backgroundColor = "#242424";
        if (circle) {
            circle.style.transform = "translateX(2.8vh)";
            circle.style.background = "linear-gradient(180deg, #777, #3a3a3a)";
        }
        localStorage.setItem('darkmode', 'active');
        if (darkmodeToggle) darkmodeToggle.checked = true;
    };

    const disableDarkmode = () => {
        document.body.classList.remove('darkmode');
        if (background) background.style.backgroundColor = "#fff";
        if (label) label.style.backgroundColor = "#ebebeb";
        if (circle) {
            circle.style.transform = "translateX(0.2vh)";
            circle.style.background = "linear-gradient(180deg, #ffcc89, #d8860b)";
        }
        localStorage.setItem('darkmode', null);
        if (darkmodeToggle) darkmodeToggle.checked = false;
    };

    if (darkmode === "active") enableDarkmode();

    if (darkmodeToggle) {
        darkmodeToggle.addEventListener("change", () => {
            darkmodeToggle.checked ? enableDarkmode() : disableDarkmode();
        });
    }

    // hamburger-menu logiikka
    if (hamMenu && offScreenMenu) {
        hamMenu.addEventListener("click", () => {
            hamMenu.classList.toggle("active");
            offScreenMenu.classList.toggle("active");
        });
    }

// arpoo tietokoneen valinnan
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'spock', 'lizard']; // = 0, 1, 2, 3, 4 arvot järjestyksessä
    const randomNumber = Math.floor(Math.random() * 5); // pyöristää luvut kokonaisluvuiksi (0-4) ja generoi satunnaisen arvon
    return choices [randomNumber]; // palauttaa arvoa vastaavan syötteen esim. 0 = rock
}

// muokkaa userChoice ja computerChoice teksteihin isot alkukirjaimet, jotka seuraavissa funktioissa
function convertToWord(letter) {
    if (letter === "rock") return "Rock";
    if (letter === "paper") return "Paper";
    if (letter === "scissors") return "Scissors";
    if (letter === "spock") return "Spock";
    return "Lizard";
}
    // jos käyttäjä voittaa
function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)}. You win!`;
   
}
    // jos tietokone voittaa
function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertToWord(userChoice)} loses to ${convertToWord(computerChoice)}. You lost...`;
}
    // jos tasapeli
function draw(userChoice, computerChoice) {
    result_p.innerHTML = `${convertToWord(userChoice)} equals ${convertToWord(computerChoice)}. It's a draw.`;
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rockscissors":
        case "rocklizard":
        case "paperspock":
        case "paperrock":
        case "scissorspaper":
        case "scissorslizard":         // näillä yhdistelmillä käyttäjä voittaa
        case "spockscissors":
        case "spockrock":
        case "lizardspock":
        case "lizardpaper":
            win(userChoice, computerChoice);
            break;
        case "rockpaper":
        case "rockspock":
        case "paperlizard":
        case "paperscissors":
        case "scissorsrock":            // näillä yhdistelmillä käyttäjä häviää
        case "scissorsspock":
        case "spocklizard":
        case "spockpaper":
        case "lizardscissors":
        case "lizardrock":
            lose(userChoice, computerChoice);
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":        // näillä yhdistelmillä tulee tasapeli
        case "spockspock":
        case "lizardlizard":
            draw(userChoice, computerChoice);
            break;
    }
}

function main() {
    rock_div.addEventListener('click', function() {
        game("rock");
        });

    paper_div.addEventListener('click', function() {
        game("paper");
        });

    scissors_div.addEventListener('click', function() {
        game("scissors");
        });

    spock_div.addEventListener('click', function() {
        game("spock");
        });

    lizard_div.addEventListener('click', function() {
        game("lizard");
        });

}

main();
});
