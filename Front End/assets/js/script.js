$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

      

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Brilliant Ads";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Brilliant Ads";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Advertising Agency", "Traffic Generator"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->





document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log("Form submitted");
    
    // Gather form data
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };
    console.log("Form data:", data);

    // Send the data to the backend using fetch
    fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the request content type as JSON
      },
      body: JSON.stringify(data), // Convert the form data to JSON format
    })
    .then(response => response.json()) // Handle the response
    .then(data => {
      console.log("Success:", data);
      // Optionally show a success message to the user
      alert("Message sent successfully!");

      // Reset the form after submission
      document.getElementById("contact-form").reset();  // Reset the form here
    })
    .catch((error) => {
      console.error("Error:", error);

      // Optionally show an error message to the user
      alert("There was an error sending your message. Please try again.");
    });
});
