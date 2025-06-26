document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Projects filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky contact bar
    const contactBar = document.querySelector('.contact-bar');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const heroHeight = heroSection.offsetHeight;
        
        if (window.pageYOffset > heroHeight - 100) {
            contactBar.classList.add('sticky');
        } else {
            contactBar.classList.remove('sticky');
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form values
    //         const name = this.querySelector('input[name="name"]').value;
    //         const email = this.querySelector('input[name="email"]').value;
    //         const subject = this.querySelector('input[name="subject"]').value;
    //         const message = this.querySelector('textarea[name="message"]').value;
            
    //         // Here you would typically send the form data to a server
    //         console.log('Form submitted:', { name, email, subject, message });
            
    //         // Show success message
    //         // alert('Thank you for your message! I will get back to you soon.');
            
    //         // Reset form
    //         // this.reset();
    //         // this.submit();

    //         setTimeout(() => {
    //     this.submit(); // submits to FormSubmit.co
    // }, 500);
    //     });
    // }

    if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const subject = this.querySelector('input[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value;

        const sendBtn = document.getElementById('sendBtn');
        const btnText = sendBtn.querySelector('.btn-text');
        const spinner = sendBtn.querySelector('.btn-spinner');
        const statusMessage = document.getElementById('form-status-message');

        // Show spinner
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';

        // Submit via fetch to avoid redirect
        fetch('https://formsubmit.co/kapillund29@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                name: name,
                email: email,
                subject: subject,
                message: message,
                _captcha: "false"
            })
        })
        .then(response => {
            if (response.ok) {
                statusMessage.textContent = "✅ Thank you, I will contact you soon.";
                statusMessage.style.display = "block";
                contactForm.reset();
            } else {
                statusMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
                statusMessage.style.display = "block";
            }
            setTimeout(() => {
    statusMessage.style.display = "none";
  }, 5000);
        })
        .catch(error => {
            statusMessage.textContent = "❌ Error sending message.";
            statusMessage.style.display = "block";
            console.error('FormSubmit Error:', error);
        })
        .finally(() => {
            // Hide spinner, show button text
            btnText.style.display = 'inline-block';
            spinner.style.display = 'none';
        });
    });
}
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-content, .skills-container, .project-card, .resume-item, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.about-content, .skills-container, .project-card, .resume-item, .contact-info, .contact-form');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});