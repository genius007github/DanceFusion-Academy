
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form.myForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(form);
        
        fetch('/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Handle the response from the server
            alert(data);
            form.reset(); // Optional: Reset the form fields after submission
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

