document.addEventListener('DOMContentLoaded', () => {
    const jokeText = document.getElementById('joke-text');
    const jokePunchline = document.getElementById('joke-punchline');
    const getJokeBtn = document.getElementById('get-joke-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    let selectedCategory = 'any';
    
    // Function to fetch a random joke from the API
    async function fetchJoke() {
        jokeText.textContent = 'Loading...';
        jokePunchline.classList.add('hidden');
        
        try {
            // Construct API URL based on selected category
            let apiUrl = 'https://v2.jokeapi.dev/joke/';
            
            if (selectedCategory === 'any') {
                apiUrl += 'Any';
            } else {
                apiUrl += selectedCategory;
            }
            
            // Add parameters
            apiUrl += '?safe-mode';
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }
            
            const data = await response.json();
            
            // Display the joke based on type
            if (data.type === 'single') {
                jokeText.textContent = data.joke;
                jokePunchline.classList.add('hidden');
            } else if (data.type === 'twopart') {
                jokeText.textContent = data.setup;
                jokePunchline.textContent = data.delivery;
                jokePunchline.classList.remove('hidden');
            }
        } catch (error) {
            jokeText.textContent = 'Oops! Failed to fetch a joke. Please try again.';
            console.error('Error fetching joke:', error);
        }
    }
    
    // Event listener for the "Get New Joke" button
    getJokeBtn.addEventListener('click', fetchJoke);
    
    // Event listeners for category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update selected category
            selectedCategory = btn.getAttribute('data-category');
            
            // Fetch a new joke with the selected category
            fetchJoke();
        });
    });
    
    // Fetch a joke when the page loads
    fetchJoke();
});