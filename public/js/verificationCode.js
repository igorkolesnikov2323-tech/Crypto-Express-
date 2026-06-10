const verificationItem = document.querySelectorAll('.verification__item')
const verificationFlexbox = document.querySelector('.verification__flexbox')

verificationItem.forEach((input, index)=>{
    input.addEventListener('input', (event)=>{
        const value = event.target.value

        event.target.value = value.replace(/[^0-9]/g, '')

        if(event.target.value.length === 1 && index < verificationItem.length - 1){
            verificationItem[index + 1].focus();
        }
    })
    
    input.addEventListener('keydown', (event)=>{
        if(event.key === 'Backspace' && event.target.value.length === 0 && index > 0){
            verificationItem[index - 1].focus();
        } 
    })
})

verificationFlexbox.addEventListener('paste', (event)=>{
    event.preventDefault()
    const pastetData = event.clipboardData.getData('text').trim()
    const rgx = /[0-9]/g

    if(rgx.test(pastetData)){
        console.log(pastetData)
        verificationItem.forEach((input, index)=>{
            if (pastetData[index]) {
                input.value = pastetData[index];
            }
        })
    }
})