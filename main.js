const worksPage = document.getElementById("worksList");

const projectTemplate = document.querySelector(".projectTemplate");

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
            name: 'SCSS',
            experience: '2025-04-18',
        },

        {
            name: 'JavaScript',
            experience: '2025-06-04',
        },

        {
            name: 'GIT',
            experience: '2025-10-29',
        },

        {
            name: 'NodeJs',
            experience: '2026-03-01',
        },
    ]
}

const ui = {
    nav_list: document.querySelectorAll('.nav-list li'),

    skills_page: document.querySelector('.skills-page'),
    skill_card: document.querySelector('.skill'),

    skill_popup: document.querySelector('.skill-popup'),
}

ui.nav_list.forEach((nav) => {
    nav.addEventListener('click', () => {
        const targetSection = document.querySelector(`.${nav.id}`)

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',

            })
        }
    })
});

const token = "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";

async function fetchUser() {
    const username = 'stchll'
    const url = `https://api.github.com/users/${username}/repos`

    try {
        const response = await fetch(url,{
             headers: {
                Authorization: `earer: ${token}`
             }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const user = await response.json();

        for (const repo of user) {
            if (!repo.topics.includes("portfolio-site")) {
                continue
            }

            console.log(repo);
            

            console.log(repo);

            const imagePath = `https://raw.githubusercontent.com/${username}/${repo.name}/main/img/thumbnail.png`;

            const project = projectTemplate.cloneNode(true);
            project.className = "project";

            const title = project.querySelector(".project-name");
            title.textContent = repo.name

            const img = project.querySelector(".product-img");
            img.src = imagePath

            const linkBtn = project.querySelector(".link-btn");
            
            if (repo.homepage) {
                linkBtn.href = repo.homepage;
            } else {
                linkBtn.style.display = "none";
            }
            
            const githubBtn = project.querySelector(".github-btn");

            if (repo.html_url) {
                githubBtn.href = repo.html_url;
            } else {
                githubBtn.style.display = "none";
            }

            worksPage.appendChild(project);
        }



    } catch (error) {
        console.error("Error fetching user info:", error);
    }
}

fetchUser()

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

        newSkill.addEventListener('click', () => {
            ui.skill_popup.querySelector('.popup-skill-img').src = './img/' + skill.name + '.png'
            ui.skill_popup.querySelector('.popup-skill-name').textContent = skill.name

            ui.skill_popup.style.top = "50%"

            const experienceTime = calculateExpirience(skill.experience).toString()

            if (experienceTime) {
                ui.skill_popup.querySelector('.popup-skill-exp').textContent = 'Experience: ' + experienceTime
                ui.skill_popup.querySelector('.popup-skill-tyr-date').textContent = 'First tried: ' + skill.experience
            }
        })
    }
}

SyncSkills()

ui.skill_popup.querySelector('.popup-skill-close').addEventListener('click', () => {
    ui.skill_popup.style.top = "-200%"
})

const typingText = Typify('#typify-text', {
    text: [`Hi , I'm Chepil Stepan`, `I'm a front-end developer!`, `Welcome to my Protfolio!`],
    delay: 100,
    loop: false,
    cursor: true,
    stringDelay: 1000,
});