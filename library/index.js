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

const authIcons = document.querySelectorAll('[data-profileiconVisible]')
const menuNoAuth = document.querySelector('[data-profileNoAuthVisible]')
// const menuNoAuth = document.querySelector('.menuProfileNoAuth')
const menuAuth = document.querySelector('[data-profileAuthenticatedVisible]')
const profileCardNumber = document.querySelector('[data-cardnumber]')
const myprofileCardNumber = document.querySelector('[data-myprofilecardnumber]')
const copyCard = document.getElementById('copy_card_id')

const shortName = document.querySelector('[data-shortname]')
const fullName = document.querySelector('[data-fullname]')

const buybtns = document.querySelectorAll('[data-buy-book]')

const cardCheck = document.querySelector('[data-card-check]')

const turnonProfileIcon = () => {
    document.querySelector('[icon-no-logo]').setAttribute('data-profileiconVisible','false')
    document.querySelector('[icon-with-logo]').setAttribute('data-profileiconVisible','true')
}
const turnoffProfileIcon = () => {
    document.querySelector('[icon-no-logo]').setAttribute('data-profileiconVisible','true')
    document.querySelector('[icon-with-logo]').setAttribute('data-profileiconVisible','false')
}

const getUser = () => {
    let user = JSON.parse(localStorage.getItem('loggedUser'))

    if(Object.keys(user).length){
        return user
    }

    return false
}

const setUserName = (localFirstName,localLastName) => {
    document.querySelector('.userName').textContent = (localFirstName[0]+localLastName[0]).toUpperCase()
    shortName.textContent = localFirstName[0] + localLastName[0]
    fullName.textContent = localFirstName + ' ' + localLastName
    getUser()?turnonProfileIcon():turnoffProfileIcon()
  }

const refreshProfileIcon = () => {
    let user = getUser()
    
    if(user)
    {
        setUserName(user.firstName,user.lastName)
        profileCardNumber.setAttribute('data-cardnumber',`ID:${user.cardNumber}`)
        myprofileCardNumber.textContent = user.cardNumber
    }
}

refreshProfileIcon()


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
    if(menuAuth.getAttribute('data-profileAuthenticatedVisible')=='true'){
        if(!e.composedPath().includes(registrationModal)&&popupTogled){
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


authIcons.forEach(l=>l.addEventListener('click', ()=>{

    getUser()?menuAuth.setAttribute('data-profileAuthenticatedVisible','true'):menuNoAuth.setAttribute('data-profileNoAuthVisible','true')
    // menuNoAuth.setAttribute('data-profileNoAuthVisible','true')
}))

function closeNoAuthPopup(){
    menuNoAuth.setAttribute('data-profileNoAuthVisible','false')
}

function closeAuthPopup(){
    menuAuth.setAttribute('data-profileAuthenticatedVisible','false')
}

copyCard.addEventListener('click',()=>{
    navigator.clipboard.writeText(myprofileCardNumber.textContent);
})

const showUserInfo = () => {
    cardCheck.style.display = 'block'
    document.querySelector('.user-info-container').setAttribute('data-user-info','false')
    
}

cardCheck.addEventListener('click',()=>{
    cardCheck.style.display = 'none'
    document.querySelector('.user-info-container').setAttribute('data-user-info','true')
    window.setTimeout(showUserInfo, 10000);
})

// registration and login forms

const modalLinks = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')
const closeModalButtons = document.querySelectorAll('[data-closemodalbutton]')
const imageVisits = document.querySelector('[data-visits]')
const imageBonuses = document.querySelector('[data-bonuses]')
const imageBooks = document.querySelector('[data-books]')


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

  const generateHex = () => [...Array(9)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

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
        registrationData.visits = 1
        imageVisits.setAttribute('data-visits','1')

        let users = JSON.parse(localStorage.getItem('users'))

        if(!users){
            users = []
        }
        let user = users.find(x=>x.email === registrationData['email'])
        if(user == undefined){
            registrationData.cardNumber = generateHex()
            users.push(registrationData)
            localStorage.setItem('loggedUser',JSON.stringify({cardNumber:registrationData.cardNumber,firstName:registrationData.firstName,lastName:registrationData.lastName}))
        }else{
            Object.keys(registrationData).forEach(key=>{
                user[key] = registrationData[key]
            })
            localStorage.setItem('loggedUser',JSON.stringify({cardNumber:user.cardNumber,firstName:registrationData.firstName,lastName:registrationData.lastName}))
        }
        localStorage.setItem('users',JSON.stringify(users))
        setUserName(registrationData['firstName'],registrationData['lastName'])
        profileCardNumber.setAttribute('data-cardnumber',`ID:${user == undefined?registrationData.cardNumber:user.cardNumber}`)
        myprofileCardNumber.textContent = user == undefined?registrationData.cardNumber:user.cardNumber
        closeAuthModals()
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
            imageVisits.setAttribute('data-visits',`${user.visits}`)
            localStorage.setItem('users',JSON.stringify(users))
            localStorage.setItem('loggedUser',JSON.stringify({cardNumber:user.cardNumber,firstName:user.firstName,lastName:user.lastName}))
            setUserName(user.firstName,user.lastName)
            profileCardNumber.setAttribute('data-cardnumber',`ID:${user.cardNumber}`)
            myprofileCardNumber.textContent = user.cardNumber
            closeAuthModals()
        }
    })

  })

  const logoutLink = document.getElementById('logout')
  logoutLink.addEventListener('click',()=>{
    localStorage.setItem('loggedUser',JSON.stringify({}))
    setUserName(' ',' ')
    closeAuthPopup()
    popupTogled = false
  })

  buybtns.forEach(buybtn=>{
    buybtn.addEventListener('click',()=>{
        let user = getUser()
        if(user){
            if(user?.libraryCard){

            }else{
                openModal(document.getElementById('cardpurchasemodal'))
            }

        }else{
            openModal(document.getElementById('login-modal'))
        }
    })
})


