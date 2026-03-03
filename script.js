document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerText;
      btn.innerText = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(contactForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
      .then(() => {
        btn.innerText = 'Message Sent!';
        btn.style.backgroundColor = '#4caf50';
        
        // Show toast
        if (toast) {
            toast.innerText = "Thanks for reaching out! I'll get back to you soon.";
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Reset form
        contactForm.reset();
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
        }, 3000);
      })
      .catch((error) => {
        console.error('Form submission error:', error);
        btn.innerText = 'Error!';
        btn.style.backgroundColor = '#f44336';
        if (toast) {
            toast.innerText = "Oops! Something went wrong. Please try again.";
            toast.classList.add('show');
             setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
         setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
        }, 3000);
      });
    });
  }
});
