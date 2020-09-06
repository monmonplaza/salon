var slider = tns({
    container: '.testimonial__slider',
    loop: true,
    items: 1,  
    // slideBy: 'page',
    nav: false,
    gutter: 50,
    // nav: true,    
    // mouseDrag: true,
    // lazyload: true,
    controlsContainer: "#customize-controls",
    responsive: {
        "415": {
            items: 3,
        },
        
    //     768: {
    //         items: 3,
    //     }
    // }
      }
  });


  //SERVICE 

  const services = document.querySelectorAll('.services__box__btn img');
  const serviceInfos = document.querySelectorAll('.services__box__info')
  
  services.forEach(service => {
    service.addEventListener('mouseenter', (e) => {
      let targetId = e.target.id;
      let serviceInfo = document.getElementById(`${targetId}-info`);
      removeActive()
      serviceInfo.classList.add('active-service');
    })
  })  

  function removeActive() {
    serviceInfos.forEach(info => {
      info.classList.remove('active-service')
    })
  }

  //MENU

  const toggleMenu = document.querySelector('.toggle-menu');
  const mobileMenu = document.querySelector('.mobile__menu')
  const closeMenu = document.querySelector('#menu-close')
  
  
  toggleMenu.addEventListener('click', () => {
    mobileMenu.style.right = 0;
    
  }) 

  closeMenu.addEventListener('click', () => {
    mobileMenu.style.right = -100 + '%';
  
  })



