import Converter from './converterEngine.js'
import { makeToastNotification, makeError } from './helper.js'

let expression = new Converter()

let conversionResult = document.getElementById('conversion-result')
let conversionLog = document.getElementById('stack-log')
let logsContainer = document.createElement('ul')
logsContainer.setAttribute('id', 'logs')
let right = document.getElementById('right')
let occupied = false
let newExpression = document.getElementById('infix-input')

document.getElementById('submit').addEventListener("click", () => {
    let conversionLogs = expression.convert(newExpression.value)

    if (conversionLogs == "Expression is empty") {
        makeToastNotification(conversionLogs)
    } else if (occupied) {
        makeToastNotification("Press new for a new expression")
    } else if (occupied == false) {
        occupied = true
        right.appendChild(logsContainer)
        for (let index = 0; index < conversionLogs.length; index++) {
            let logs = document.createElement('li')
            logs.className = 'log'
            logs.setAttribute('log-expression', conversionLogs[index][0])
            logs.setAttribute('log-stack', conversionLogs[index][1])
            logs.innerHTML = conversionLogs[index][2]
            logsContainer.append(logs)
        }
        conversionResult.textContent = conversionLogs[conversionLogs.length - 1][0]
        conversionLog.textContent = conversionLogs[conversionLogs.length - 1][1]
        document.querySelectorAll('.log').forEach(log => {
            log.addEventListener("click", () => {
                occupied = true
                conversionLog.textContent = log.getAttribute('log-stack')
                conversionResult.textContent = log.getAttribute('log-expression')
            })
        })
    }
})

document.getElementById('new').addEventListener("click", () => {
    if (occupied) {
        window.location.href = '/'
    } else {
        return
    }
})

if (window.screen.availHeight > window.screen.availWidth) {
    document.getElementById('body').style.flexDirection = 'column'
    document.getElementById('submit').textContent = 'C'
    document.getElementById('left').style.width = '100vw'
    document.getElementById('right').style.width = '100vw'
    document.getElementById('left').style.height = '70%'
    document.getElementById('right').style.height = '30%'
    document.getElementById('left-bottom').style.marginBottom = '1em'
}