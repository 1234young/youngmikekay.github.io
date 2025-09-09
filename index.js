
    var tablinks = document.getElementsByClassName("tab-links")
    var tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname){
      for(tablink of tablinks){
        tablink.classList.remove("active-link");
      }
      for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
      }
      event.currentTarget.classList.add("active-link");
      document.getElementById(tabname).classList.add("active-tab");
    }

    
    var sidemenu = document.getElementById("sidemenu");
    function openmenu(){
      sidemenu.style.right = '0';

    }
  
    function closemenu(){
      sidemenu.style.right = "-200px";
      
    }

    document.addEventListener("DOMContentLoaded", function () {
    const sectionIds = ["header", "about", "services", "portfolio", "contact"];
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach((link, idx) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            if (idx === 0) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const section = document.getElementById(sectionIds[idx]);
                if (section) section.scrollIntoView({ behavior: "smooth" });
            }
            if (typeof closemenu === "function") closemenu();
        });
    });
});
  