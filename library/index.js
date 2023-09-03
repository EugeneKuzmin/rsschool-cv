const navigation = document.querySelector('.navigation')
const mToggle = document.querySelector('.nav-toggle')
mToggle.addEventListener('click',switchNavigation)

function switchNavigation(){

    if (navigation.getAttribute("data-visible") === "false") {
        navigation.setAttribute("data-visible", true);
        mToggle.setAttribute("aria-expanded", true);
    } else {
        navigation.setAttribute("data-visible", false);
        mToggle.setAttribute("aria-expanded", false);
    }

}



//******************************************************/
const sectionSpring = document.getElementById("spring")
const sectionSummer = document.getElementById("summer")
const sectionAutumn = document.getElementById("autumn")
const sectionFavorites = document.getElementById("favorites")

const radioButtons = document.querySelectorAll('input[name="seasons"]');

for(const radioButton of radioButtons){
    radioButton.addEventListener('change', function(e){
        sectionFavorites
        .querySelectorAll('[role="radioBtnPage"]')
        .forEach((item) => item.setAttribute("hidden", true));

        const s = document.getElementById(e.target.id.slice(0,e.target.id.indexOf('-')))

        s.removeAttribute('hidden');
        
    });
} 

// const btnRight = document.getElementById('btnright')
// const btnLeft = document.getElementById('btnleft')
// const itemLeft = document.getElementById('items-left')
// const itemRight = document.getElementById('items-right')

// const carousel = document.getElementById('carousel')

// const moveRight = () => {
//     carousel.classList.add('transition-right')
//     btnRight.removeEventListener('click',moveRight)
//     btnLeft.removeEventListener('click',moveLeft)
// }

// btnRight.addEventListener('click',moveRight)

// carousel.addEventListener("animationend",()=>{
//     carousel.classList.remove("transition-right")
//     btnRight.addEventListener('click',moveRight)
// })

// const moveLeft = () => {
//     carousel.classList.add('transition-left')
//     btnLeft.removeEventListener('click',moveLeft)
//     btnRight.removeEventListener('click',moveRight)

// }

// btnLeft.addEventListener('click',moveLeft)

// carousel.addEventListener("animationend",(animation)=>{
//     if (animation.animationName === "move-left"){
//         carousel.classList.remove("transition-left")
//         const leftItems = itemLeft.innerHTML
//         document.querySelector('#items-active').innerHTML = leftItems
//         const card1 = document.createElement('div')
//         card1.classList.add("card")


//     }else{
//         carousel.classList.remove("transition-right")
//     }
//     carousel.classList.remove("transition-left")
//     btnLeft.addEventListener('click',moveLeft)
// })



// const picClass = document.querySelectorAll('.card__img')[0]
// const picWidth = picClass.clientWidth

// const btnLeft = document.querySelector('#btn-left')
// let btnClicked = btnLeft.id
// btnLeft.addEventListener('click',()=>{
//     carousel.scrollLeft -= carousel.scrollWidth
//     btnClicked = btnLeft.id
// })

// const btnCenter = document.querySelector('#btn-center')
// btnCenter.addEventListener('click',()=>{
//     if(btnClicked === 'btn-left'){
//         carousel.scrollLeft += picWidth + 25
//     }else if(btnClicked === 'btn-right'){
//         carousel.scrollLeft -= picWidth - 25
//     }
// })

// const btnRight = document.querySelector('#btn-right')
// btnRight.addEventListener('click',()=>{
//     carousel.scrollLeft += carousel.scrollWidth
//     btnClicked = btnRight.id
// })

const carousel = document.getElementById('carousel')

const picClass = document.querySelectorAll('.card__img')[0]
const picWidth = picClass.clientWidth

let activeIndex = 0

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth -1 
    arrowLeft.disabled = carousel.scrollLeft == 0 ? true : false
    if(carousel.scrollLeft + picWidth + 25 >= scrollWidth){
        arrowRight.disabled = true
        arrowRight.style.opacity = 0.3
    }else{
        arrowRight.disabled = false
        arrowRight.style.opacity = 1
    }
}

const arrowLeft = document.querySelector('#arrowleft')
arrowLeft.addEventListener('click',()=>{
    carousel.scrollLeft -= (picWidth + 25) 
    if(activeIndex>0){
        dots[activeIndex].classList.remove('active')
        activeIndex --
        dots[activeIndex].classList.add('active')
    }

    showHideIcons()
})

const arrowRight = document.querySelector('#arrowright')
arrowRight.addEventListener('click',()=>{
    // arrowLeft.disabled = carousel.scrollLeft == 0 ? true : false
    // arrowRight.disabled = carousel.scrollLeft + 25 >= scrollWidth ? true : false
    
    carousel.scrollLeft += picWidth + 25
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth -1 
    // if(carousel.scrollLeft + 35 <= scrollWidth){
    if(activeIndex< 5){
        dots[activeIndex].classList.remove('active')
        activeIndex ++ 
        dots[activeIndex].classList.add('active')
    }

    showHideIcons()
    
    // arrowRight.style.display = (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth))?"none":"block"
})

const dots = document.querySelectorAll('.dot')
dots.forEach((dot,index)=>{
    dot.addEventListener('click',()=>{
        carousel.scrollLeft = (picWidth + 25)*index
        dots[activeIndex].classList.remove('active')
        dot.classList.add('active')
        activeIndex = index
        showHideIcons()
    })
})

const authIcon = document.querySelector('.icon-profile-picture')
// const menuNoAuth = document.querySelector('[data-profileNoAuthVisible]')
const menuNoAuth = document.querySelector('.menuProfileNoAuth')
const menuAuth = document.querySelector('[data-profileAuthenticatedVisible]')

let popupTogled = false


document.addEventListener('click',(e)=>{
    const dsplayClick = e.composedPath().includes(navigation)
    const btnClick = e.composedPath().includes(mToggle)
    if(!dsplayClick&&!btnClick&&navigation.getAttribute("data-visible") === "true") switchNavigation()

    if(menuNoAuth.getAttribute('data-profileNoAuthVisible')=='true'){
        if(!e.composedPath().includes(loginModal)&&popupTogled){
            closeNoAuthPopup()
            popupTogled = false
        }else{
            popupTogled = true
        }
    }
    if(menuAuth.getAttribute('data-profileNoAuthVisible')=='true'){
        if(!e.composedPath().includes(registrationModalModal)&&popupTogled){
            closeAuthPopup()
            popupTogled = false
        }else{
            popupTogled = true
        }
    }
    // if(menuNoAuth.getAttribute('data-profileAuthenticatedVisible')=='true'&&!e.composedPath().includes(registrationModalModal)&&!e.composedPath().includes(menuAuth)){
    //     closeAuthPopup()
    // }
    // if(!e.composedPath().includes(registrationModal)&&!e.composedPath().includes(authIcon)){menuAuth.setAttribute('data-profileAuthenticatedVisible','true')}
    
})


authIcon.addEventListener('click', ()=>{
    menuNoAuth.setAttribute('data-profileNoAuthVisible','true')
})

function closeNoAuthPopup(){
    menuNoAuth.setAttribute('data-profileNoAuthVisible','false')
}

function closeAuthPopup(){
    menuAuth.setAttribute('data-profileAuthenticatedVisible','false')
}

// refistration and login forms

const modalLinks = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')
const closeModalButtons = document.querySelectorAll('[data-close-modal-button]')



modalLinks.forEach(link=>
    link.addEventListener('click', () => {
    
    closeAuthPopup()
    closeNoAuthPopup()
    closeAuthModals()

    openModal(document.querySelector(link.dataset.modalTarget))

}))

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
    closeNoAuthPopup()
  }

  function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    popupTogled = false

  }

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })

  function closeAuthModals(){
    const loginModals = document.querySelectorAll('.login-modal.active')
    
    loginModals.forEach(modal => {
        closeModal(modal)
    })
    
    const registrationModals = document.querySelectorAll('.registration-modal.active')
    registrationModals.forEach(modal => {
      closeModal(modal)
    })
  }

  overlay.addEventListener('click', () => {
    closeAuthModals()
  })

  const validation=()=>{
    return true
  }

  const setUserName = (lName) => {
    document.querySelector('.userName').textContent = lName
    document.querySelector('[data-show]').setAttribute('data-show','name')
  }

  const registrationModal = document.querySelector('.registration-modal')
  const registrationInputs = document.querySelectorAll('[role="registration-input"]')

  const registrationButtons = document.querySelectorAll('[role="registration-submit"]')
  registrationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        if(!validation){
            return
        }

        let registrationData = {}

        registrationInputs.forEach(e=>{
            registrationData[e.id] = e.value
        })
        registrationData.visits = 0

        let users = JSON.parse(localStorage.getItem('users'))

        if(!users){
            users = []
        }
        let email = users.find(x=>x.email === registrationData['email'])
        if(email == undefined){
            users.push(registrationData)
        }else{
            Object.keys(registrationData).forEach(key=>{
                email[key] = registrationData[key]
            }) 
        }
        localStorage.setItem('users',JSON.stringify(users))
        setUserName(registrationData['firstName'][0]+registrationData['lastName'][0])
    })

  })


  const loginModal = document.querySelector('.login-modal')
  const loginInputs = document.querySelectorAll('[role="login-input"]')

  const loginButtons = document.querySelectorAll('[role="login-submit"]')
  loginButtons.forEach(button => {
    button.addEventListener('click',()=>{

        let loginData = {}

        loginInputs.forEach(e=>{
            loginData[e.id] = e.value
        })

        let users = JSON.parse(localStorage.getItem('users'))

        if(!users){
            return
        }
        let user = users.find(x=>x.email === loginData['loginId'])
        if(user !== undefined&&user.password == loginData.loginPassword){
            user['visits']++
            localStorage.setItem('users',JSON.stringify(users))
            setUserName(user.firstName[0]+user.lastName[0])
        }


    })

  })

