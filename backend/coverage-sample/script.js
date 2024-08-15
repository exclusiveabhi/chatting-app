// script.js

// Function to toggle the visibility of detailed coverage information
function toggleCoverageDetails() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.classList.toggle('hidden');
    });
}

// Function to filter files based on user input
function filterFiles() {
    const searchInput = document.getElementById('fileSearch').value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const fileName = row.querySelector('.file').innerText.toLowerCase();
        if (fileName.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Event listener for the filter input
document.getElementById('fileSearch').addEventListener('input', filterFiles);

// Initial setup for the page
window.onload = function () {
    prettyPrint(); // Initialize syntax highlighting
    toggleCoverageDetails(); // Toggle details on page load
};
