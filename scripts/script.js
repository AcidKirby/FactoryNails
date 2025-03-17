document.querySelectorAll('.lang-option').forEach(button => {
    button.addEventListener('click', function() {
        const selectedLang = this.getAttribute('data-lang'); // Get the language code
        document.documentElement.lang = selectedLang; // Update the lang attribute on <html>

        loadTranslations(selectedLang); // Function to update content based on language
    });
});

// Example of dynamically updating content
function loadTranslations(lang) {
    fetch(`../translations/${lang}.json`)  // Assuming separate JSON files for each language
        .then(response => response.json())
        .then(data => {
            // Update content for each element with the 'Lang-1001' attribute
            document.querySelectorAll('[Lang-1001]').forEach(element => {
                const key = element.getAttribute('Lang-1001');
                if (data[key]) {
                    element.textContent = data[key];
                }
            });

            // Dynamically update meta description and keywords from the translation file
            const metaDescription = document.querySelector('meta[name="description"]');
            const metaKeywords = document.querySelector('meta[name="keywords"]');

            if (metaDescription) {
                metaDescription.setAttribute('content', data.meta.description);
            }

            if (metaKeywords) {
                metaKeywords.setAttribute('content', data.meta.keywords);
            }
        })
        .catch(err => console.error('Error loading translations:', err));
}

// Toggle the language dropdown
document.getElementById("language-button").addEventListener("click", function () {
    const languageDropdown = document.getElementById("language-dropdown");
    
    // Toggle between 'show' and 'hide' classes
    if (languageDropdown.classList.contains("show")) {
        languageDropdown.classList.remove("show");
        languageDropdown.classList.add("hide");
    } else {
        languageDropdown.classList.remove("hide");
        languageDropdown.classList.add("show");
    }
});

// Toggle the hamburger menu dropdown
document.getElementById("menu-button").addEventListener("click", function () {
    const menuDropdown = document.getElementById("mobile-menu");

    // Check if it's not desktop before toggling
    if (window.innerWidth < 1150) {
        if (menuDropdown.classList.contains("show")) {
            menuDropdown.classList.remove("show");
            menuDropdown.classList.add("hide");
        } else {
            menuDropdown.classList.remove("hide");
            menuDropdown.classList.add("show");
        }
    }
});

// Toggle the hamburger menu dropdown (close button)
document.getElementById("close-menu-button").addEventListener("click", function () {
    const menuDropdown = document.getElementById("mobile-menu");

    // Check if it's not desktop before toggling
    if (window.innerWidth < 1150) {
        if (menuDropdown.classList.contains("show")) {
            menuDropdown.classList.remove("show");
            menuDropdown.classList.add("hide");
        } else {
            menuDropdown.classList.remove("hide");
            menuDropdown.classList.add("show");
        }
    }
});

document.addEventListener("click", function (event) {
    const languageDropdown = document.getElementById("language-dropdown");
    const menuDropdown = document.getElementById("mobile-menu");
    const languageButton = document.getElementById("language-button");
    const menuButton = document.getElementById("menu-button");
    const closeMenuButton = document.getElementById("close-menu-button"); // Close button

    // Close the language dropdown if clicked outside
    if (
        !languageDropdown.contains(event.target) &&
        !languageButton.contains(event.target)
    ) {
        languageDropdown.classList.remove("show");
        languageDropdown.classList.add("hide");
    }

    // Close the hamburger menu if clicked outside or on the close button (except on desktop)
    if (
        !menuDropdown.contains(event.target) &&
        !menuButton.contains(event.target) &&
        !closeMenuButton.contains(event.target) && // Also close when clicking the close button
        window.innerWidth < 1150 // Only close if on mobile (not desktop)
    ) {
        menuDropdown.classList.remove("show");
        menuDropdown.classList.add("hide");
    }
});

function handleClassChange() {
    const menuDropdown = document.getElementById("mobile-menu");
    if (!menuDropdown) return; // Exit if element is not found

    const isDesktop = window.innerWidth >= 1150;

    if (isDesktop) {
        // Switch to desktop mode
        menuDropdown.classList.remove("show", "hide");
        menuDropdown.classList.add("desktopON");
    } else {
        // Switch to mobile mode but KEEP IT OPEN if it's already open
        menuDropdown.classList.remove("desktopON");

        if (!menuDropdown.classList.contains("show")) {
            menuDropdown.classList.add("hide"); // Only add "hide" if not already "show"
        }
    }
}

// Run function on load and on resize
window.addEventListener("resize", handleClassChange);
window.addEventListener("DOMContentLoaded", handleClassChange);
//loader being hidden after page loads

window.addEventListener("load", () => {
    const loader = document.querySelector(".loading-screen");

    // Delay before starting fade-out animation
    setTimeout(() => {
        loader.classList.add("loading-screen-hidden");
    },1000); // 2000ms = (2 seconds) delay


    loader.addEventListener("transitionend", () => {
        loader.remove(); // Instead of `document.body.removeChild(loader)`
    });
});