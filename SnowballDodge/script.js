const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = innerHeight;
canvas.width = innerWidth;

let mouseX = 0
let mouseY = 0
let growing = false
let radius = 10
let santas = []
let level = 1

const santa = new Image();
santa.src = "./images/santa.png"

window.addEventListener('mousemove', function(e){
    mouseX = e.x
    mouseY = e.y
})
window.addEventListener('mousedown', function(){
    growing = true
    santas.push({ x: mouseX, y: mouseY, radius: radius, growing: true})
})
window.addEventListener('mouseup', dropSanta)

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    
    update() {
        this.draw()
        if(this.x - this.radius < 0 || this.x + this.radius > canvas.width){
            this.velocity.x = this.velocity.x * -1
        } else if (this.y - this.radius < 0 || this.y + this.radius > canvas.height){
            this.velocity.y = this.velocity.y * -1
        }
      
        this.x = this.x + (this.velocity.x)
        this.y = this.y + (this.velocity.y)
    }
}
  
const projectiles = []

projectiles.push(new Projectile(Math.random() * innerWidth, Math.random() * innerHeight, 10, 'white', {x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10}))
projectiles.push(new Projectile(Math.random() * innerWidth, Math.random() * innerHeight, 10, 'white', {x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10}))
projectiles.push(new Projectile(Math.random() * innerWidth, Math.random() * innerHeight, 10, 'white', {x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10}))

function dropSanta() {
    if(growing){
        santas[santas.length - 1] = {x: mouseX, y: mouseY, radius: radius, growing: false}
        growing = false
        radius = 10
    }
    return
}

function animate() {
    requestAnimationFrame(animate);

    let score = 0
    
    for(i = 0; i < santas.length; i++){
        score += Math.PI * santas[i].radius * santas[i].radius
    }

    if(mouseX - radius < 0 || mouseX + radius > canvas.width || mouseY - radius < 0 || mouseY + radius > canvas.height){
        dropSanta()
    }

    if((score/(innerWidth * innerHeight)) * 100 > 50){
        santas = []
        level++
        projectiles.push(new Projectile(Math.random() * innerWidth, Math.random() * innerHeight, 10, 'white', {x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 4}))
    }

    c.clearRect(0, 0, innerWidth, innerHeight)

    santas.forEach((ball) => {
        c.beginPath()
        c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false)
        c.fillStyle = 'red'
        c.fill()
    
        c.drawImage(santa, ball.x - ball.radius, ball.y - (ball.radius * 1.45), ball.radius * 2, (ball.radius * 2) * 1.2)
    })
    
    if(growing){
        c.beginPath()
        c.arc(mouseX, mouseY, radius, 0, Math.PI * 2, false) 
        c.fillStyle = 'red'
        c.fill()
        c.drawImage(santa, mouseX - radius, mouseY - (radius * 1.45), radius * 2, (radius * 2) * 1.2)

        radius += 1
        santas[santas.length - 1] = {x: mouseX, y: mouseY, radius: radius, growing: true}
            
        for(let i = 0; i < santas.length - 1; i++){
            // santa collide with santa or wall
            var a = santas[i].x - mouseX;
            var b = santas[i].y - mouseY;
            var distance = Math.sqrt( a*a + b*b );
            if(distance <  santas[i].radius + radius || mouseX + radius > innerWidth || mouseX - radius < 0 || mouseY + radius > innerHeight || mouseY - radius < 0){
                dropSanta()
            }
        }
    }

    projectiles.forEach((projectile) => {
        projectile.update()
    })

    c.font = "20px Arial";
    c.fillStyle = "black";
    c.fillText(`Level: ${level}`, 50, 50);
    c.fillText(`Score: ${(score/(innerWidth * innerHeight)) * 100}%`, 50, 80);

    for(let i = 0; i < projectiles.length; i++){
        // each projectile is i
        for(let j = 0; j < santas.length; j++){
            // each santa is j
            var collisionA = santas[j].x - projectiles[i].x 
            var collisionB = santas[j].y - projectiles[i].y
            var collisionDistance = Math.sqrt( collisionA*collisionA + collisionB*collisionB )
            // if particle collides with santa
            if(collisionDistance <  santas[j].radius + projectiles[i].radius){
                if(santas[j].growing == true){
                    santas.pop()
                    growing = false
                    radius = 10
                } else{
                    let vCollisionNorm = {x: collisionA / collisionDistance, y: collisionB / collisionDistance};
                    projectiles[i].velocity.x -= vCollisionNorm.x
                    projectiles[i].velocity.y -= vCollisionNorm.y
                }
            }
        }
    }
}

animate()