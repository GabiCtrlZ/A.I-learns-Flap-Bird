class FlappyBird {
    constructor(id) {
        this.speed = 0
        $('#container').append(`<div class="bird" id='${id}' style="left: 200px; top: 270px;"></div>`)
        this.bird = $(`#${id}`)
        this.notDead = true
        this.score = 0
    }
    distTopPipe(arr, positionBirdY) {
        return (positionBirdY - (arr[0].y + 500))
    }
    distBottomPipe(arr, positionBirdY) {
        return ((arr[1].y - 30) - positionBirdY)
    }
    distXPipe(arr) {
        return (arr[0].x - 140)
    }
    distBothPipes() {
        let arr = allPipes.getRelevantPipes(allPipes.pipesXY())
        let positionBirdY = parseInt(this.bird.css('top'))
        if (arr.length) {
            // return all dist as an array
            return [this.distXPipe(arr), this.distBottomPipe(arr, positionBirdY), this.distTopPipe(arr, positionBirdY)]
        }
        else {
            console.log('oopsy, theres a bug')
            return [0, 0, 0]
        }
    }
    gravity() {
        this.speed += 1.25
        this.speed = Math.min(this.speed, 15)
    }
    jumpPressed() {

        this.speed -= 30
        this.speed = Math.max(this.speed, -15)

    }
    jump(key) {
        if (key.keyCode == 13) {
            this.jumpPressed()
        }
    }
    mouseJump() {
        this.jumpPressed()
    }
    fly() {
        if (this.notDead) {
            this.alive()
            let positionBird = parseInt(this.bird.css('top'))
            if (positionBird >= 0 && positionBird <= 570) {
                let newPos = positionBird + this.speed
                this.bird.css('top', newPos + 'px')
                this.bird.css('transform', `rotate(${this.speed * 2}deg)`)
            }
        }
    }
    alive() {
        let positionBird = parseInt(this.bird.css('top'))
        if (!(positionBird >= 0 && positionBird <= 570)) {
            this.notDead = false
            this.bird.css('visibility', 'hidden')
            return false
        }
        else if (allPipes.checkPipeCollision(allPipes.pipesXY(), this.bird)) {
            this.notDead = false
            this.bird.css('visibility', 'hidden')
            return false
        }
        this.score = gameController.getScore()
        return true
    }
}