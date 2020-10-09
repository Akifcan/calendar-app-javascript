const calendar = [
    {
        monthName: 'Ocak',
        monthIndex: 1,
        totalDay: 31,
        skipDay: 2
    },
    {
        monthName: 'Şubat',
        monthIndex: 2,
        totalDay: 29,
        skipDay: 5
    },
    {
        monthName: 'Mart',
        monthIndex: 3,
        totalDay: 31,
        skipDay: 6
    },
    {
        monthName: 'Nisan',
        monthIndex: 4,
        totalDay: 30,
        skipDay: 2
    },
    {
        monthName: 'Mayıs',
        monthIndex: 5,
        totalDay: 31,
        skipDay: 4
    },
    {
        monthName: 'Haziran',
        monthIndex: 6,
        totalDay: 30,
        skipDay: 0
    },
    {
        monthName: 'Temmuz',
        monthIndex: 7,
        totalDay: 31,
        skipDay: 2
    },
    {
        monthName: 'Ağustos',
        monthIndex: 8,
        totalDay: 31,
        skipDay: 5
    },
    {
        monthName: 'Eylül',
        monthIndex: 9,
        totalDay: 30,
        skipDay: 1
    },
    {
        monthName: 'Ekim',
        monthIndex: 10,
        totalDay: 31,
        skipDay: 3
    },
    {
        monthName: 'Kasım',
        monthIndex: 11,
        totalDay: 30,
        skipDay: 6
    },  {
        monthName: 'Aralık',
        monthIndex: 12,
        totalDay: 31,
        skipDay: 1
    }
]

const events = [
    {
        monthIndex: 10,
        day: 29,
        info: {
            title: 'Cumhuriyet bayramı',
            description: 'Bugün cumhuriyet bayramı'
        }
    },
    {
        monthIndex: 10,
        day: 29,
        info: {
            title: 'ikinci etkinlik',
            description: 'bu ikinci etkinliktir'
        }
    },
    {
        monthIndex: 10,
        day: 10,
        info: {
            title: 'Doğum Günü',
            description: 'Arkadaşımın doğum günü'
        }
    },
    {
        monthIndex: 11,
        day: 10,
        info: {
            title: 'Doğum Günü',
            description: 'Arkadaşımın doğum günü'
        }
    },
    {
        monthIndex: 12,
        day: 31,
        info: {
            title: 'Yıl sonu',
            description: 'bugün yıl sonu'
        }
    },
]

const calendar_el = document.querySelector('.calendar')
const calendar_month_name_el = calendar_el.querySelector('.calendar-month-name span')
const prev_button_el = document.getElementById('prev'),
        next_button_el = document.getElementById('next')
const events_el = document.querySelector('.events')
const event_list = events_el.querySelector('.event-list')
const total_event_count_el = events_el.querySelector('h3')

const date = new Date()

let currentMonth = date.getMonth()

prev_button_el.addEventListener('click', _ => {
    if(currentMonth == 0){
        currentMonth = calendar.length - 1
    }else{
        currentMonth--
    }
    initialCalendar()
})

next_button_el.addEventListener('click', _ => {
    if(currentMonth == calendar.length - 1){
        currentMonth = 0
    }else{
        currentMonth++
    }
    initialCalendar()
})

initialCalendar()
function initialCalendar(){

    const calendar_days_el = document.querySelectorAll('.calendar-days')
    const calendar_days_empty_el = document.querySelectorAll('.calendar-days-empty')


    if(calendar_days_el.length > 0){
        calendar_days_el.forEach(calendarDay => calendarDay.parentNode.removeChild(calendarDay))
        calendar_days_empty_el.forEach(calendarDayEmpty => calendarDayEmpty.parentNode.removeChild(calendarDayEmpty))
    }

    calendar_month_name_el.textContent = calendar[currentMonth].monthName
    for(let i = 0; i<calendar[currentMonth].skipDay; i++){
        const calendar_day_el = document.createElement('div')
        calendar_day_el.classList.add('calendar-days-empty')
        calendar_el.appendChild(calendar_day_el)
    }
    for(let i = 1; i<=calendar[currentMonth].totalDay; i++){
        const calendar_day_el = document.createElement('div')
        calendar_day_el.setAttribute('data-day', i)
        calendar_day_el.setAttribute('data-month', calendar[currentMonth].monthIndex)
        calendar_day_el.classList.add('calendar-days')
        calendar_el.appendChild(calendar_day_el)
        const totalEvent = events.filter(event => event.day == parseInt(calendar_day_el.dataset.day) && event.monthIndex == parseInt(calendar_day_el.dataset.month)).length
        calendar_day_el.innerHTML = `${i} <small>${totalEvent}</small> `
        
        calendar_day_el.addEventListener('click', _ => {
            event_list.innerHTML = ''
            const eventList = events.filter(event => event.day == parseInt(calendar_day_el.dataset.day) && event.monthIndex == parseInt(calendar_day_el.dataset.month))
            eventList.forEach(event => {
                const p = document.createElement('p')
                total_event_count_el.textContent = `Bugün ${totalEvent} etkinliğiniz var.`
                p.innerHTML = `<b>${event.info.title}:</b> ${event.info.description} `
                event_list.appendChild(p)
            })
        })
    }
    getEvents()
}

function getEvents(){
    const calendar_days_el = document.querySelectorAll('.calendar-days')
    calendar_days_el.forEach(calendarDay => {
        events.forEach(event => {
            if(event.day == parseInt(calendarDay.dataset.day) && event.monthIndex == parseInt(calendarDay.dataset.month)){
                calendarDay.classList.add('active')
            }
        })
    })
}

