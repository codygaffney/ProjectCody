document.addEventListener("DOMContentLoaded", () => {
    // Hide loader after a brief delay
    const loader = document.querySelector(".loader");
    setTimeout(() => { loader.style.display = "none"; }, 2000);
  
    // Typewriter Effect
    const textElement = document.getElementById("typewriter");
    const text = "Just my Little Game Development Projects";
    let index = 0;
  
    function typeWriter() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
      }
    }
  
    textElement.textContent = "";
    setTimeout(typeWriter, 500);
  });
  