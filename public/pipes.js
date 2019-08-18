function AllPipes() {
    function ran() {
        return (Math.floor(Math.random() * 310) - 410)
    }
    function pipeGenerator() {
        let num = ran()
        $('#container').append(`<div class="upper_pipe" style="left: 650px; top: ${num}px"></div>`)
        $('#container').append(`<div class="upper_pipe" style="left: 650px; top: ${num + 655}px"></div>`)
    }
    function distroyPipes(){
        let upperArray = $('.upper_pipe')
        if (upperArray.length > 8){
            for (let i = 0; i < 2; i++){
                $(upperArray[i]).remove()
            }
        }
    }
    function pipeMov() {
        let upperArray = $('.upper_pipe')
        for (let i = 0; i < upperArray.length; i++) {
            let positionUpper = parseInt($(upperArray[i]).css('left'))
            $(upperArray[i]).css('left', (positionUpper - 3) + 'px')
        }
    }
    function pipesXY(){
        let upperArray = $('.upper_pipe')
        let xyArray = []
        for (let i = 0; i < upperArray.length; i++) {
            let positionX = parseInt($(upperArray[i]).css('left'))
            let positionY = parseInt($(upperArray[i]).css('top'))
            xyArray.push({x: positionX, y: positionY})
        }
        return xyArray
    }
    function checkPipeCollision(arr, bird){
        let positionBirdY = parseInt(bird.css('top'))
        for (let i = 0; i < arr.length; i++){
            if (arr[i].x > 140 && arr[i].x < 230){
                if (i%2 == 1){
                    if (positionBirdY > (arr[i].y - 30)){
                        return true
                    }
                }
                else{
                    if (positionBirdY < (arr[i].y + 500)){
                        return true
                    }
                }
            }
        }
        return false
    }
    function getRelevantPipes(arr) {
        let relevantArr = []
        for (let pipe of arr){
            if (pipe.x >= 140 && pipe.x <= 410){
                relevantArr.push(pipe)
            }
        }
        return relevantArr
    }
    return {
        pipeGenerator,
        distroyPipes,
        pipeMov,
        pipesXY,
        checkPipeCollision,
        getRelevantPipes
    }
}