const DATA = {
    SKILLS: [
        {
            name: 'HTML',
            experience: '2024-12-27',            
        },

        {
            name: 'CSS',
            experience: '2025-01-03',           
        },

        {
            name: 'JavaScript',
            experience: '2025-06-04',            
        },
    ]
}

const ui = {
    nav_list: document.querySelectorAll('.nav-list li'),

    skills_page: document.querySelector('.skills-page'),
    skill_card: document.querySelector('.skill'),

    skill_popup: document.querySelector('.skill-popup'),
}

ui.nav_list.forEach((nav)=>{
    nav.addEventListener('click',()=>{
        const targetSection = document.querySelector(`.${nav.id}`)

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
            })
        }
    })
})

const token = 'none'

async function fetchUser(params) {
    const username = 'stchll'
    const url = `https://api.github.com/users/${username}/repos`

    try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const user = await response.json();
        
        console.log(user);
        

      } catch (error) {
        console.error("Error fetching user info:", error);
        document.getElementById("user-info").innerHTML = `<p style="color: red;">${error.message}</p>`;
      }
}

function calculateExpirience(startDate, endDate = new Date()) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    if (days < 0) {
        months--;
        let lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return {
        years: years,
        months: months,
        days: days,
        toString() {
            let result = [];
            if (years > 0) result.push(years + ' y.');
            if (months > 0) result.push(months + ' m.');
            if (days > 0) result.push(days + ' d.');

            console.log(result);
            

            return result.join(' ') || ' Fail.';
        }
    };
}


function SyncSkills() {
    for (let skill of DATA.SKILLS) {
        const newSkill = ui.skill_card.cloneNode(true)
        newSkill.style.display = 'flex'
        ui.skills_page.append(newSkill)


        newSkill.querySelector('.skill-icon').src = './img/' + skill.name + '.png'
        newSkill.querySelector('.skill-name').textContent = skill.name 

        newSkill.addEventListener('click',()=>{
            ui.skill_popup.querySelector('.popup-skill-img').src = './img/' + skill.name + '.png'
            ui.skill_popup.querySelector('.popup-skill-name').textContent = skill.name

            ui.skill_popup.style.display = 'block'

            const experienceTime = calculateExpirience(skill.experience).toString()

            if (experienceTime) {
                ui.skill_popup.querySelector('.popup-skill-exp').textContent = 'Experience: ' + experienceTime
                ui.skill_popup.querySelector('.popup-skill-tyr-date').textContent = 'First tried: ' + skill.experience
            }
        })
    }
}

SyncSkills()

ui.skill_popup.querySelector('.popup-skill-close').addEventListener('click',()=>{
    ui.skill_popup.style.display = 'none'
})




// console.log(getTimeBetween('2011-01-09').toString());