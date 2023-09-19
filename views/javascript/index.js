const dropdownButton = document.getElementById('changeName');
    
        const dropdownItems = document.querySelectorAll('.dropdown-item');
    
        dropdownItems.forEach(item => {
            item.addEventListener('click', function () {
                const selectedValue = item.getAttribute('value');
                
                dropdownButton.innerHTML = selectedValue;
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
    const themeToggleCheckbox = document.querySelector("input[name=themeToggle]");

    if (document.body.classList.contains('dark-mode')) {
        themeToggleCheckbox.checked = true;
    } else {
        themeToggleCheckbox.checked = false;
    }

    themeToggleCheckbox.addEventListener('change', () => {
        const body = document.documentElement;

        if (themeToggleCheckbox.checked) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    });
    });

    const clockId = document.getElementById("clock");
    console.log("josh mama")
    let clock = 60;

    let timer = setInterval(()=>{
        if(clock == 0){
            clock = 60;
        }else{
            clock -= 1;
        }
        clockId.innerText = clock

    },1000)