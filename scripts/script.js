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
        document.querySelectorAll('[Lang-1001]').forEach(element => {
          const key = element.getAttribute('Lang-1001');
          if (data[key]) {
            element.textContent = data[key];
          }
        });
      })
      .catch(err => console.error('Error loading translations:', err));
  }

// dropdown of the world menu
document.getElementById("language-button").addEventListener("click", function () {
    document.getElementById("language-dropdown").classList.toggle("show");
  });
  
  // Close dropdown if user clicks outside of it
  document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("language-dropdown");
    const button = document.getElementById("language-button");
  
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  });