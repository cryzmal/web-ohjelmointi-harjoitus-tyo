# Price Checker Web app & RPSSL-Game
harjoitustyö

This project is a simple web application that includes two features:
1. A Rock-Paper-Scissors-Spock-Lizard (RPSSL) Game, where players can compete against a computer. (From TV-show "The Big Bang Theory".)
2. A Price Checker for fetching real-time prices for Old School RuneScape from an external API.

## Features
### RPSSL-Game
- Players can select between **Rock**, **Paper**, **Scissors**, **Spock**, or **Lizard**.
-  The application determines whether the player won, lost, or tied against a computer-generated choice.
- The current scores for the user and computer are displayed at the top.
#### Rules
1.  Scissors cuts Paper
2. Paper covers Rock
3. Rock crushes Lizard
4. Lizard poisons Spock
5. Spock smashes Scissors
6. Scissors decapitates Lizard
7. Lizard eats Paper
8. Paper disproves Spock
9. Spock vaporizes Rock
10. (And as it always has) Rock crushes Scissors

### Price Checker
- Users can input an item name to fetch its current price.
- Item prices are retrieved from the **[https://prices.runescape.wiki/api](https://prices.runescape.wiki/api/v1/osrs/latest)** (Pictures are fetched from official RuneScape-site for now)
- If the item is found, its price and an image are displayed. If not, an error message is shown.

---

## How to Run the App
1. Clone or download the repository files to your local system.
2. Open the `index.html` file in any modern web browser.
3. For the RPSSL-Game, navigate to the appropriate link from the hamburger-menu and start playing by selecting your choice.
4. For the Price Checker, type an item name into the input field and click the **Get Price** button.

---

## How the Code Works
- **HTML**: Provides the structure for the RPSSL-Game and the Price Checker interface.
- **CSS**: Styles both light and dark themes, as well as the layout of the game and price checker components.
- **JavaScript**:  
  - Fetches item data from the OSRS API and displays it.
  - Handles the logic for determining game outcomes in RPSSL.
  - Manages Dark Mode by adding or removing a CSS class based on user preference.

## Credits
- **API Source**: Old School RuneScape Wiki Prices API  
- **Inspiration for RPSSL Rules**: TV-show: The Big Bang Theory

---

## Future Improvements
- Adding more detailed error handling for API requests.
- Creating a custom API from which to fetch item images. (Official site seems to be changing address, so unless more reliable source is found, this would be the best option.)
- Enhancing the RPSSL game logic to include animations or visual feedback.
- Allowing users to list and save results of price checks with a timestamp for following price development.
