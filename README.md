# NOCTVRE — Midnight Fashion E-Commerce Studio

An avant-garde, minimalist, single-page application (SPA) designed for modern streetwear drops. Built using raw semantic HTML5, localized layout structures, and pure vanilla JavaScript, NOCTVRE handles an entire interactive customer journey completely client-side.

---

## ✦ Key Features

* **Dynamic Client-Side Routing:** Instantly swaps site views (`Home/Catalog` ➔ `Checkout Form` ➔ `Printable Receipt` ➔ `Purchase History`) without refreshing the browser windows or losing memory states.
* **Intuitive Product Configuration Modal:** * Dynamic sizing and multi-color track matrix.
    * **Selection Highlight Fix:** Selected options instantly invert to a high-contrast white background with dark text, providing clear visual feedback.
* **Advanced Dynamic Cart Drawer:**
    * **Garment Thumbnail Previews:** Items are cleanly rendered along with their custom variant thumbnail cover (`pic1.jpg` through `pic7.jpg`).
    * **Granular Quantity Manipulators:** Inline mathematical increment and decrement controllers.
    * **Explicit Removal:** Clear a specific product style selection from the active queue using dedicated **Remove** anchors.
* **Smart Shipping Rules Calculator:** Automatically manages order parameters, waiving the standard `$9.99` delivery fee and shifting to **FREE SHIPPING** if the customer subtotal surpasses `$150.00`.
* **Data Masking Input Filters:** Automated regular expression tracking algorithms block alphanumeric formatting entries in crucial checkout fields, forcing patterns like Card Numbers (`XXXX XXXX XXXX XXXX`) and Expiries (`MM / YY`).
* **Persistent Storage Mechanism:** Leverages the browser's `localStorage` system API to save active carts and past order histories securely between sessions.

---

## ✦ Active Digital Catalog Architecture

The production environment comes preloaded with your custom product designs mapped into dynamic JavaScript catalog state rows:

1.  **Multi-Panel Cable Knit Sweater** (`pic1.jpg`) — $95.00
2.  **"Supra" Graphic Color-Block Knit** (`pic2.jpg`) — $98.00
3.  **Blaugrana Retro Collared Sweatshirt** (`pic3.jpg`) — $85.00
4.  **Seleção Quarter-Zip Club Pullover** (`pic4.jpg`) — $88.00
5.  **Galáctico Monochrome Polo Fleece** (`pic5.jpg`) — $82.00
6.  **Veridian Vertical Stripe Knit Polo** (`pic6.jpg`) — $65.00
7.  **Espresso V-Neck Contrast Polo** (`pic7.jpg`) — $60.00

---

## ✦ File Structure Layout

Ensure your current workspace layout is nested as follows so the assets route perfectly:

```text
├── index.html        # Main interface skeleton views and structural modal markup
├── style.css         # Minimalist color palette values and structural layout rules
├── script.js        # Core transactional engine, calculations, and UI updates
├── pic1.jpg          # Product asset image 1
├── pic2.jpg          # Product asset image 2
├── pic3.jpg          # Product asset image 3
├── pic4.jpg          # Product asset image 4
├── pic5.jpg          # Product asset image 5
├── pic6.jpg          # Product asset image 6
└── pic7.jpg          # Product asset image 7
