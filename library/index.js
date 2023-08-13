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



console.log("Общая оценка 94\n Вёрстка валидная +10\n Вёрстка семантическая +16\n Вёрстка соответствует макету +50\n блок <header> +8\n секция Welcome +4.\n секция About +6\n секция Favorites +6\n секция CoffeShop +6.\n секция Contacts +6\n секция LibraryCard +8/блок <footer> +6\n Общие требования к верстке +18")