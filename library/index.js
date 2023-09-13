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

//**********************  Favorites  ***********************************/

const sectionSpring = document.getElementById("spring")
const sectionSummer = document.getElementById("summer")
const sectionAutumn = document.getElementById("autumn")
const sectionFavorites = document.getElementById("favorites")

const radioButtons = document.querySelectorAll('input[name="seasons"]');

for(const radioButton of radioButtons){
    radioButton.addEventListener('change', function(e){
        sectionFavorites
        .querySelectorAll('[role="radioBtnPage"]')
        .forEach((item) => {
            item.classList.remove('fadeout')
            item.classList.add('fadein')

            window.setTimeout(function() { 
                item.setAttribute("hidden", true)
                    const s = document.getElementById(e.target.id.slice(0,e.target.id.indexOf('-')))
                    s.removeAttribute('hidden');
                    window.setTimeout(function() {s.classList.add('fadeout')},100)
             }, 600);
        }
        );
    });
} 

//**********************  About  ***********************************/

const carousel = document.getElementById('carousel')

const picClass = document.querySelectorAll('.card__img')[0]
const picWidth = picClass.clientWidth

const arrowLeft = document.querySelector('#arrowleft')
const arrowRight = document.querySelector('#arrowright')
const arrowBtn = document.querySelector('.arrow-button')

let currScrollPosition = 0

let activeIndex = 0

const scrollWidth = carousel.scrollWidth - carousel.clientWidth

const showHideIcons = () => {
    
    if(currScrollPosition >= scrollWidth){
        arrowRight.disabled = true
        arrowRight.classList.remove('arrow-response')
        arrowRight.style.opacity = 0.3
    }else{
        arrowRight.disabled = false
        arrowRight.style.opacity = 1
        arrowRight.classList.add('arrow-response')
    }

    if(currScrollPosition === 0){
        arrowLeft.disabled = true
        arrowLeft.classList.remove('arrow-response')
        arrowLeft.style.opacity = 0.3
    }else{
        arrowLeft.disabled = false
        arrowLeft.style.opacity = 1
        arrowLeft.classList.add('arrow-response')
    }
    
}

//initial settings

showHideIcons()

const moveLeft = () => {
    if(!arrowLeft.disabled){
        carousel.scrollLeft -= (picWidth + 25)
        currScrollPosition -= (picWidth + 25)
        dots[activeIndex].classList.remove('active')
        activeIndex --
        dots[activeIndex].classList.add('active')
        showHideIcons()
    }
}

arrowLeft.addEventListener('click',moveLeft)

const moveRight = () =>{
    if(!arrowRight.disabled){
        carousel.scrollLeft += picWidth + 25
        currScrollPosition += picWidth + 25
        dots[activeIndex].classList.remove('active')
        activeIndex ++ 
        dots[activeIndex].classList.add('active')
        showHideIcons()
    }
}

arrowRight.addEventListener('click',moveRight)

const dots = document.querySelectorAll('.dot')

dots.forEach((dot,index)=>{
    dot.addEventListener('click',()=>{
        carousel.scrollLeft = (picWidth + 25)*index
        currScrollPosition = (picWidth + 25)*index
        dots[activeIndex].classList.remove('active')
        dot.classList.add('active')
        activeIndex = index
        showHideIcons()
    }
    )
})


//**********************  Authentification  ***********************************/

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

const imageVisits = document.querySelectorAll('[data-visits]')
const imageBonuses = document.querySelector('[data-bonuses]')
const imageBooks = document.querySelectorAll('[data-books]')

const rentedBooks = document.querySelector('[data-rentedbooks]')
const bookNames = document.querySelectorAll("[role='book-name']")
const bookAuthors = document.querySelectorAll("[role='book-author']")
const logoutLink = document.getElementById('logout')
const inputsData = document.querySelectorAll("[role='inputlibrarycardcheck']")
const nameLogo = document.querySelector("[icon-with-logo]")

const turnonProfileIcon = () => {
    document.querySelector('[icon-no-logo]').setAttribute('data-profileiconVisible','false')
    nameLogo.setAttribute('data-profileiconVisible','true')
}
const turnoffProfileIcon = () => {
    document.querySelector('[icon-no-logo]').setAttribute('data-profileiconVisible','true')
    nameLogo.setAttribute('data-profileiconVisible','false')
}

const refreshBookList = (bookList) => {
    for (let index = 0; index < bookList.length; index++) {
        const li = document.createElement('li')
        const liContent = document.createTextNode(bookNames[bookList[index]].textContent + ', ' + bookAuthors[bookList[index]].textContent.replace('By ',''))
        li.appendChild(liContent)
        rentedBooks.appendChild(li)
    }
  }

const addBookToList = (indx) => {

    const nBook = document.createElement("li")
    const bookContent = document.createTextNode(bookNames[indx].textContent + ', ' + bookAuthors[indx].textContent)
    nBook.appendChild(bookContent)
    rentedBooks.appendChild(nBook);

  }

const getUser = () => {
    let user = JSON.parse(localStorage.getItem('loggedUser'))

    if(user&&Object.keys(user).length){
        return user
    }

    return false
}

const setUserName = (localFirstName,localLastName) => {

    nameLogo.textContent = (localFirstName[0]+localLastName[0]).toUpperCase()

    shortName.textContent = localFirstName[0] + localLastName[0]
    fullName.textContent = localFirstName + ' ' + localLastName
    getUser()?turnonProfileIcon():turnoffProfileIcon()
    nameLogo.setAttribute('title',localFirstName + ' ' + localLastName)
  }

const setButtonOwn = (indx) => {
    buybtns[indx].disabled = true
    buybtns[indx].textContent = 'Own'
}

const setCardLayoutLoggedin = (user) => {
    
    inputsData[0].value = user.firstName.trim()
    inputsData[1].value = user.lastName.trim()
    cardCheck.setAttribute('data-cardcheckshow','false')
    document.querySelector('#card-registration-out').setAttribute("hidden",true)
    document.querySelector('#card-registration-in').removeAttribute("hidden")
    document.querySelector('.user-info-container').setAttribute('data-user-info','true')
}

const setCardLayoutLoggedout = () => {
    inputsData[0].value = ''
    inputsData[1].value = ''
    cardCheck.setAttribute('data-cardcheckshow','true')
    document.querySelector('#card-registration-out').removeAttribute("hidden")
    document.querySelector('#card-registration-in').setAttribute("hidden",true)
    document.querySelector('.user-info-container').setAttribute('data-user-info','false')
}

const refreshProfile = () => {
    let user = getUser()
    
    if(user)
    {
        setUserName(user.firstName,user.lastName)
        profileCardNumber.setAttribute('data-cardnumber',`ID:${user.cardNumber}`)
        myprofileCardNumber.textContent = user.cardNumber
        if(user.hasOwnProperty('books')){
            user.books.forEach(l=>setButtonOwn(l))
            imageBooks.forEach(i=>i.setAttribute('data-books',user.books.length.toString()))
            refreshBookList(user.books)
        }
        imageVisits.forEach(i=>i.setAttribute('data-visits',user.visits))
        setCardLayoutLoggedin(user)
    }
}

refreshProfile()


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
    
})


authIcons.forEach(l=>l.addEventListener('click', ()=>{
    getUser()?menuAuth.setAttribute('data-profileAuthenticatedVisible','true'):menuNoAuth.setAttribute('data-profileNoAuthVisible','true')
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
    inputsData.forEach(l=>l.value = '')
    
}

cardCheck.addEventListener('click',()=>{

    let users = JSON.parse(localStorage.getItem('users'))
    let nameStr = inputsData[0].value.replaceAll('  ',' ').trim()
    nameStr = nameStr.replaceAll('  ',' ')
    let nameArray = nameStr.split(' ')
    let user = users.find(x=>(x.firstName == nameArray[0])&&(x.lastName == nameArray[1])&&(x.cardNumber == inputsData[1].value))
    if (user){
            cardCheck.style.display = 'none'
            document.querySelector('.user-info-container').setAttribute('data-user-info','true')
            window.setTimeout(showUserInfo, 10000);

    }
    
        
})

// registration and login forms

const modalLinks = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')
const closeModalButtons = document.querySelectorAll('[data-closemodalbutton]')
const cardpurchaseInput = document.querySelectorAll("[role='cardpurchase-input']")
const buycardButton = document.querySelector('[data-buy-card]')
const registerFromLoginLink = document.getElementById('registerfromloginlink')
const loginFromRegisterLink = document.getElementById('loginfromregisterlink')

let clickedBuyButton = null


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

function nullifyVars(mForm) {
    if(mForm.id === 'cardpurchasemodal'){
        cardpurchaseInput.forEach(inpt=>{
            inpt.value = ''
            if([...inpt.classList].includes('input-error')){
                inpt.classList.remove('input-error')
            }
        })
    }

    if(mForm.id === 'registration-modal'){
        registrationInputs.forEach(inpt=>{
            inpt.value = ''
            if([...inpt.classList].includes('input-error')){
                inpt.classList.remove('input-error')
            }
            if([...inpt.classList].includes('input-mail-error')){
                inpt.classList.remove('input-mail-error')
            }
            if([...inpt.classList].includes('input-pswrd-error')){
                inpt.classList.remove('input-pswrd-error')
            }
        })
    }

    if(mForm.id === 'login-modal'){
        loginInputs.forEach(inpt=>{
            inpt.value = ''
            if([...inpt.classList].includes('input-error')){
                inpt.classList.remove('input-error')
            }
        })
    }
}

const generateHex = () => [...Array(9)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();

const registrationModal = document.querySelector('.registration-modal')
const registrationInputs = document.querySelectorAll('[role="registration-input"]')

const registrationButtons = document.querySelectorAll('[role="registration-submit"]')

const loginModal = document.querySelector('.login-modal')
const loginInputs = document.querySelectorAll('[role="login-input"]')
const loginButtons = document.querySelectorAll('[role="login-submit"]')

const inputCvc = document.getElementById('cvc')
const cardNumberInput = document.getElementById('cardNumber')


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
      nullifyVars(modal)
    })
  })

  function closeAuthModals(){

    const activeModals = [
        'login',
        'registration',
        'myprofile',
        'cardPurchase',
    ]
    activeModals.forEach(modalName=>{
        const modal = document.querySelector(`.${modalName}-modal.active`)
        closeModal(modal)
        
    })
    nullifyVars(document.getElementById('cardpurchasemodal'))
    nullifyVars(registrationModal)
    nullifyVars(loginModal)
  }

  overlay.addEventListener('click', () => {
    closeAuthModals()
  })

  registerFromLoginLink.addEventListener('click',()=>{
    nullifyVars(loginModal)
  })

  loginFromRegisterLink.addEventListener('click',()=>{
    nullifyVars(registrationModal)
  })

  const validationFields = (inputSet) => {
    let valid = true;
    inputSet.forEach(inpt=>{
        if(!inpt.value.length){
            valid = false
            let spanError = inpt.parentNode.querySelector('[data-error-msg]')
            if(spanError){
                spanError.setAttribute('data-error-msg','Fill the field')
                inpt.classList.add('input-error')
            } 
        }else{
            inpt.classList.remove('input-error')
        }
    })

    let validEmail = true
    let validPassword = true

    if([...inputSet].find(x=>x.id === 'email') != undefined){
        emailInput = document.getElementById('email')
        let emailStr = emailInput.value
        if(emailStr.length){
            let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            validEmail = emailStr.match(pattern)
            if(!validEmail){
                emailInput.parentNode.querySelector('[data-error-msg]').setAttribute('data-error-msg','Fill the email correctly')
                emailInput.classList.add('input-error')
            }else{
                emailInput.classList.remove('input-error')
            }
        }

        passwordInput = document.getElementById('password')
        let passwordStr = passwordInput.value
        if(passwordStr.length){
            validPassword = passwordStr.length>=8
            if(!validPassword){
                
                passwordInput.parentNode.querySelector('[data-error-msg]').setAttribute('data-error-msg','Password should be at least 8 symbols')
                passwordInput.classList.add('input-error')
            }else{
                passwordInput.classList.remove('input-error')
            }
        }
    }

    return valid&&validEmail&&validPassword
}

const validationLibCardFields = (inputSet) => {
    let valid = true;
    if(inputCvc.value.length<3){
        valid = false
        inputCvc.parentNode.querySelector('[data-libcard-error-msg]').setAttribute('data-libcard-error-msg','CVC at least 3 symbols')
        inputCvc.classList.add('input-error')
    }else{
        inputCvc.classList.remove('input-error')
    }
    if(cardNumberInput.value.length<19){
        valid = false
        cardNumberInput.parentNode.querySelector('[data-libcard-error-msg]').setAttribute('data-libcard-error-msg','Card number at least 16 symbols')
        cardNumberInput.classList.add('input-libcard-error')
    }else{
        cardNumberInput.classList.remove('input-libcard-error')
    }
    return valid
}


  registrationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        if(!validationFields(registrationInputs)){
            return
        }

        let registrationData = {}

        registrationInputs.forEach(e=>{
            registrationData[e.id] = e.value
        })
        registrationData.visits = 1
        imageVisits.forEach(l=>l.setAttribute('data-visits','1'))

        let users = JSON.parse(localStorage.getItem('users'))

        if(!users){
            users = []
        }
        let user = users.find(x=>x.email === registrationData['email'])
        if(user == undefined){
            registrationData.cardNumber = generateHex()
            users.push(registrationData)
            localStorage.setItem('loggedUser',JSON.stringify({cardNumber:registrationData.cardNumber,firstName:registrationData.firstName,lastName:registrationData.lastName,visits:registrationData.visits}))
        }else{
            alert('User with such email already exists! Make up a new one!')
            return
        }
        localStorage.setItem('users',JSON.stringify(users))
        setUserName(registrationData['firstName'],registrationData['lastName'])
        profileCardNumber.setAttribute('data-cardnumber',`ID:${user == undefined?registrationData.cardNumber:user.cardNumber}`)
        myprofileCardNumber.textContent = user == undefined?registrationData.cardNumber:user.cardNumber
        setCardLayoutLoggedin(registrationData)
        imageBooks.forEach(i=>i.setAttribute('data-books',0))
        closeAuthModals()
    })

  })


  loginButtons.forEach(button => {
    button.addEventListener('click',()=>{

        if(!validationFields(loginInputs)){
            return
        }

        let loginData = {}

        loginInputs.forEach(e=>{
            loginData[e.id] = e.value
        })

        let users = JSON.parse(localStorage.getItem('users'))

        if(!users){
            return
        }
        let user = users.find(x=>x.email === loginData['loginId'])||users.find(x=>x.cardNumber === loginData['loginId'])
        if(user !== undefined&&user.password == loginData.loginPassword){
            user['visits']++
            imageVisits.forEach(i=>i.setAttribute('data-visits',`${user.visits}`) ) 
            localStorage.setItem('users',JSON.stringify(users))
            localStorage.setItem('loggedUser',JSON.stringify({
                cardNumber:user.cardNumber,
                firstName:user.firstName,
                lastName:user.lastName,
                books:user.books,
                libraryCard:user.libraryCard,
                visits:user['visits'],
            }))
            setUserName(user.firstName,user.lastName)
            profileCardNumber.setAttribute('data-cardnumber',`ID:${user.cardNumber}`)
            myprofileCardNumber.textContent = user.cardNumber
            if(user.hasOwnProperty('books')){
                user.books.forEach(l=>setButtonOwn(l))
                refreshBookList(user.books)
                imageBooks.forEach(i=>i.setAttribute('data-books',user.books.length.toString()))
            }else{
                imageBooks.forEach(i=>i.setAttribute('data-books',0))
            }
            setCardLayoutLoggedin(user)
            closeAuthModals()
        }else{
            alert('There is no any user with such email or ID and password.')
        }
    })
  })

    const buyBook = (indx) => {
        let user = getUser();
        user.books.push(indx)
        localStorage.setItem('loggedUser',JSON.stringify(user))
        let users = JSON.parse(localStorage.getItem('users'))
        users.find(x=>x.cardNumber == user.cardNumber).books = [...user.books]
        localStorage.setItem('users',JSON.stringify(users))
        setButtonOwn(indx)
        //refresh my profile modal
        imageBooks.forEach(i=>i.setAttribute('data-books',user.books.length.toString()))

        addBookToList(indx)
        
    }

    const cleanOwnBooks = () => {
        let user = getUser()
        if(user.hasOwnProperty('books')){
            user.books.forEach(l=>{
                buybtns[l].disabled = false
                buybtns[l].textContent = 'Buy'
            })
        }
    }

  logoutLink.addEventListener('click',()=>{
    cleanOwnBooks()
    localStorage.setItem('loggedUser',JSON.stringify({}))
    setUserName(' ',' ')
    closeAuthPopup()
    rentedBooks.innerHTML = ''
    setCardLayoutLoggedout()
    popupTogled = false
  })

  buybtns.forEach((buybtn,index)=>{
    buybtn.addEventListener('click',()=>{
        clickedBuyButton = index
        let user = getUser()
        if(user){
            if(user.hasOwnProperty('libraryCard')&&user.libraryCard){
                buyBook(index)
            }else{
                openModal(document.getElementById('cardpurchasemodal'))
            }
        }else{
            openModal(loginModal)
        }
    })
})

//inputs


inputCvc.addEventListener('input',()=>{
    inputCvc.value = inputCvc.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
})


const expirationCode1 = document.querySelector('#expirationcode1')
const expirationCode2 = document.querySelector('#expirationcode2')
const inputPlace = document.querySelector('#place')

expirationCode1.addEventListener('input',()=>{
    expirationCode1.value = expirationCode1.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
})


expirationCode2.addEventListener('input',()=>{
    expirationCode2.value = expirationCode1.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1')
})


inputPlace.addEventListener('input',()=>{
    inputPlace.value = inputPlace.value.replace(/[^a-zA-Z]/g, '').replace(/(\..*)\./g, '$1')
})

//inputMask

let cardNumber = document.getElementById('cardNumber'),
		cardNumberPuttern = /^\d{0,16}$/g,
		numberInputOldValue,
		numberInputOldCursor,
		
		mask = (value, limit, separator) => {
			var output = [];
			for (let i = 0; i < value.length; i++) {
				if ( i !== 0 && i % limit === 0) {
					output.push(separator);
				}
				
				output.push(value[i]);
			}
			
			return output.join("");
		},
		unmask = (value) => value.replace(/[^\d]/g, ''),
		checkSeparator = (position, interval) => Math.floor(position / (interval + 1)),
		ccNumberInputKeyDownHandler = (e) => {
			let el = e.target;
			numberInputOldValue = el.value;
			numberInputOldCursor = el.selectionEnd;
		},
		ccNumberInputInputHandler = (e) => {
			let el = e.target,
					newValue = unmask(el.value),
					newCursorPosition;
			
			if ( newValue.match(cardNumberPuttern) ) {
				newValue = mask(newValue, 4, ' ');
				
				newCursorPosition = 
					numberInputOldCursor - checkSeparator(numberInputOldCursor, 4) + 
					checkSeparator(numberInputOldCursor + (newValue.length - numberInputOldValue.length), 4) + 
					(unmask(newValue).length - unmask(numberInputOldValue).length);
				
				el.value = (newValue !== "") ? newValue : "";
			} else {
				el.value = numberInputOldValue;
				newCursorPosition = numberInputOldCursor;
			}
			
			el.setSelectionRange(newCursorPosition, newCursorPosition);
			
			highlightCC(el.value);
		},
		highlightCC = (ccValue) => {
			let ccCardType = '',
					ccCardTypePatterns = {
						visa: /^4/,
					};
			
			for (const cardType in ccCardTypePatterns) {
				if ( ccCardTypePatterns[cardType].test(ccValue) ) {
					ccCardType = cardType;
					break;
				}
			}
			
		
		}
		

cardNumber.addEventListener('keydown', ccNumberInputKeyDownHandler);
cardNumber.addEventListener('input', ccNumberInputInputHandler);

const buyBookFirst = () => {
    let user = getUser()
    user.books = []
    user.libraryCard = true
    localStorage.setItem('loggedUser',JSON.stringify(user))
    let users = JSON.parse(localStorage.getItem('users'))
    let fUser = users.find(x=>x.cardNumber == user.cardNumber)
    fUser.books = [...user.books]
    fUser.libraryCard = true
    localStorage.setItem('users',JSON.stringify(users))
    buyBook(clickedBuyButton)

}

const buyLibraryCard = () => {
    if(validationLibCardFields(cardpurchaseInput)){
        closeModal(document.getElementById('cardpurchasemodal'))
        buyBookFirst()
    }
}

cardpurchaseInput.forEach(inpt=>{
    inpt.addEventListener('input',()=>{
        if(validationFields(cardpurchaseInput)){
            buycardButton.removeAttribute('disabled')
        }else{
            if(!buycardButton.disabled){
                buycardButton.disabled = true
            }
            
        }
    })

})

buycardButton.addEventListener('click',buyLibraryCard)
