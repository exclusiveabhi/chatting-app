// Faltu file hai yeh not attached anywhere in the project!

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

function saveSettings(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Load coverage settings from localStorage
function loadSettings(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Example usage: Save and load a setting
saveSettings('coverageView', 'detailed');
const coverageView = loadSettings('coverageView');
// console.log('Loaded coverage view setting:', coverageView);
// animation.js

// Function to animate the coverage percentage bars
function animateBars() {
    const bars = document.querySelectorAll('.chart .cover-fill');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Trigger animations on page load
window.onload = function () {
    prettyPrint(); // Initialize syntax highlighting
    animateBars(); // Animate coverage bars
};
// dynamicContent.js

// Function to update the coverage summary dynamically
function updateCoverageSummary(statements, branches, functions, lines) {
    document.querySelector('.coverage-summary .statements .strong').innerText = `${statements}% `;
    document.querySelector('.coverage-summary .branches .strong').innerText = `${branches}% `;
    document.querySelector('.coverage-summary .functions .strong').innerText = `${functions}% `;
    document.querySelector('.coverage-summary .lines .strong').innerText = `${lines}% `;
}
// keyShortcuts.js

// Navigate between uncovered blocks with keyboard shortcuts
function handleKeyShortcuts(event) {
    switch (event.key) {
        case 'n':
        case 'j':
            goToNextUncoveredBlock();
            break;
        case 'b':
        case 'p':
        case 'k':
            goToPreviousUncoveredBlock();
            break;
        default:
            break;
    }
}

// Example functions for navigation (replace with actual logic)
function goToNextUncoveredBlock() {
    // console.log('Going to the next uncovered block...');
}

function goToPreviousUncoveredBlock() {
    // console.log('Going to the previous uncovered block...');
}

// Add event listener for keydown events
document.addEventListener('keydown', handleKeyShortcuts);

