// JS function that is used to set current header on the side nav sub menus that leads to h2
export function setCurrentHeader(){
   
    // get all the side nav links that leads to h2 headers
    const sidenav_links = document.querySelectorAll('.usa-sidenav__sublist_header a')
    // Add click event listener to each sub menu link
    sidenav_links.forEach(link => {
        link.addEventListener('click', () => {
        // clear all
        sidenav_links.forEach(item => {
            item.classList.remove('usa-current');
        });
        // set the usa-current class to the clicked sub menu item link
        link.classList.add('usa-current');
        })
    });
    
}
 