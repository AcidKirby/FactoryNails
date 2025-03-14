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

// Dropdown of the world menu (for language selector)
document.getElementById("language-button").addEventListener("click", function () {
    document.getElementById("language-dropdown").classList.toggle("show");
});

// Close dropdown if the user clicks outside of it
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("language-dropdown");
    const button = document.getElementById("language-button");

    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});
