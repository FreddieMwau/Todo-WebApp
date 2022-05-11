import cron from 'node-cron'
const runSchedule = () => {
    console.log('running ');
    // should initialy have 6 stars
    cron.schedule('* * * * *', async () => {
        console.log('running after every minute');
    })
}

runSchedule()