export function increaseHeadingLevels(){
    const headings = document.querySelectorAll('h1, h2, h3, h4,h5');
    headings.forEach(heading =>{
    
        if(heading.innerHTML !="OASIS+ buyers' ordering guide (printable)" && heading.innerHTML !="Table of Contents")
        {
            const currentTagName = heading.tagName;
            const currentLevel = parseInt(currentTagName.substring(1))
            const newLevel = currentLevel + 1; 
            const newTageName = `H${newLevel}`
            const newHeading = document.createElement(newTageName);
            newHeading.innerHTML = heading.innerHTML;
            Array.from(heading.attributes).forEach(attr=>{
                newHeading.setAttribute(attr.name,attr.value);
            })
            heading.parentNode.replaceChild(newHeading,heading);
        }
    })
}
