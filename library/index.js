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

document.addEventListener('click',(e)=>{
    const dsplayClick = e.composedPath().includes(navigation)
    const btnClick = e.composedPath().includes(mToggle)
    if(!dsplayClick&&!btnClick&&navigation.getAttribute("data-visible") === "true") switchNavigation()
})


