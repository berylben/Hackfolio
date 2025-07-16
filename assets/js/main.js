

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

// Portfolio items
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isPortfolioDetails = path.includes("portfolio-details.html");

  if (isPortfolioDetails) {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    const projects = {
      malware: {
        title: "Malware Analysis Environment Setup with FLARE VM",
        category: "Malware Analysis",
        date: "01 March, 2025",
        client: "Personal project",
        pdf: "assets/docs/Flare_Lab_Setup.pdf",
        description: `This project involved setting up a dedicated malware analysis virtual machine using FLARE VM, a popular open-source Windows-based analysis platform developed by FireEye. The lab environment was designed to safely analyze malware samples in a controlled and isolated setup, using both static and dynamic analysis techniques`,
        images: [
          "assets/img/portfolio/malware-1.png",
          "assets/img/portfolio/malware-2.jpg",
          "assets/img/portfolio/malware-3.jpg"
        ]
      },
      siem: {
        title: "SIEM Integration Project",
        category: "Security Monitoring",
        date: "10 April, 2025",
        client: "Personal project",
        pdf: "https://github.com/berylben/Hacking_tools/blob/main/siem_anomaly_demo.py",
        description: `This project involved simulating login activity and used machine learning to detect unsual login bursts that identifies when login attempts are suspicious and plots the anomalies in red. The script helps spot potential brute-force attacks by finding sudden spikes in login attempt.`,
        images: [
          "assets/img/portfolio/Siem-1.png",
          "assets/img/portfolio/siem-2.jpg"
        ]
      },
      osint: {
        title: "OSINT for Threat Intel",
        category: "Threat Intelligence",
        date: "15 May, 2025",
        client: "Personal project",
        pdf: "assets/docs/THREAT INTELLIGENCE USING OSINT.docx.pdf",
        description: `Showcased how to use open-source tools such as Shodan and Splunk to identify vulnerabilities in IoT devices connected to the internet, gather and analyze system logs, and provide actionable recommendations to enhance network security.`,
        images: [
          "assets/img/portfolio/osint-1.jpg",
          "assets/img/portfolio/osint-2.jpg"
        ]
      },
      mitre: {
        title: "Mitre-Framework",
        category: "Threat Intelligence",
        date: "15 May, 2025",
        client: "Personal project",
        pdf: "assets/docs/Mitre_lab.pdf",
        description: `Demonstrated the use of tools like Maltego and Spiderfoot for attacker infrastructure mapping.`,
        images: [
          "assets/img/portfolio/mitre-1.jpg",
          "assets/img/portfolio/mitre-2.jpg"
        ]
      },
      nmapScanner: {
        title: "Simple nmap Scanner",
        category: "Threat Intelligence",
        date: "15 May, 2025",
        client: "Personal project",
        pdf: "https://github.com/berylben/Hacking_tools/blob/main/simple_nmap_scan.py",
        description: `Nmap scans local machine (127.0.0.1) for open ports in the range of 1 to 1074. For each port it report its status (open or closed) and the protocol it's using (e.g., TCP).`,
        images: [
          "assets/img/portfolio/nmap-1.jpg",
          "assets/img/portfolio/nmap-2.webp"
        ]
      },
      pass: {
        title: "Password cracking",
        category: "Threat Intelligence",
        date: "15 May, 2025",
        client: "Personal project",
        pdf: "assets/docs/pass.pdf",
        description: `Demonstrates password cracking techniques within Parrot OS, utilizing online tools like CrackStation and the command-line utility John the Ripper`,
        images: [
          "assets/img/portfolio/pass-1.png",
          "assets/img/portfolio/pass-2.jpg"
        ]
      },
      netScanner: {
        title: "Network Scanner",
        category: "Pentesting",
        date: "16 May, 2025",
        client: "Personal project",
        pdf: "https://github.com/berylben/Hacking_tools/blob/main/network_scan.py",
        description: `This script checks your local network (192.168.0.0/24) for open TCP ports, such as 22 and 80. It works by attempting to connect to each IP address and specified port, and if a connection is successful, it indicates that the port is open`,
        images: [
          "assets/img/portfolio/net-1.png",
          "assets/img/portfolio/net-2.png"
        ]
      },
      dpi: {
        title: "Deep Packet Inspection",
        category: "Threat Intelligence",
        date: "15 May, 2025",
        client: "Personal project",
        pdf: "assets/docs/DeepPacketInspectionTrafficAnalysis.pdf",
        description: `This lab documented packet analysis from a pcap file using wirehsark. The traffic and packets were analysed to look for malicious files, the attackers ip address and indicators of compromise. The lab also provided insights on how to look for patterns in traffic and link them with known C2 IP addresses. Additionally it covered ways of identifying unusual protocols and methods used to exiltrate data.`,
        images: [
          "assets/img/portfolio/dpi-1.jpg",
          "assets/img/portfolio/dpi-2.jpg"
        ]
      },
      yara: {
        title: "  Yara Rules",
        category: "Threat Intelligence",
        date: "15 May, 2025",
        client: "Personal project",
        pdf: "assets/docs/IntroductionToYara",
        description: `This lab focused on how to write, optimize and test YARA rules using practical scenarios and sample files. It also focused on YARA rule creation and file analysis for malware detection`,
        images: [
          "assets/img/portfolio/yara-1.png",
          "assets/img/portfolio/yara-2.jpg"
        ]
      },
      
    };

    const project = projects[projectId];

    if (!project) return;

    // Fill in project info
    document.querySelector(".section-title p").textContent = project.title;
    document.querySelector(".portfolio-info ul").innerHTML = `
      <li><strong>Category</strong>: ${project.category}</li>
      <li><strong>Client</strong>: ${project.client}</li>
      <li><strong>Project date</strong>: ${project.date}</li>
      <li><strong>Project URL</strong>: <a href="${project.pdf}" target="_blank">Download Report</a></li>
    `;
    document.querySelector(".portfolio-description h2").textContent = project.title;
    document.querySelector(".portfolio-description p").textContent = project.description;

    // Update images in Swiper
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    swiperWrapper.innerHTML = "";
    project.images.forEach(img => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `<img src="${img}" alt="">`;
      swiperWrapper.appendChild(slide);
    });
  }
});
