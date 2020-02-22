import { Component, Input, AfterViewInit, ViewChild, ElementRef,HostListener } from '@angular/core';
@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements AfterViewInit{
    @ViewChild('snake',{static: false}) snakeRef : ElementRef
    box = 32;
    ctx : CanvasRenderingContext2D;
    snakeLength = 6;
    snake = [];
    timer;
    status = false;
    snakeRender(){
        this.ctx.clearRect(0,0,this.snakeRef.nativeElement.width,this.snakeRef.nativeElement.height);
        for(let i = 0;i < this.snakeLength;i++){
            this.ctx.fillStyle = i == 0 ? 'red' : 'black';
            this.ctx.fillRect(this.snake[i].x,this.snake[i].y,this.box,this.box);
        }
    }
    snakeMovesUp(){
        const oldHeadPosition = this.snake[0];
        this.snake.pop();
        --this.snakeLength;
    }
    snakeMovesDown(){

    }
    snakeMovesRight(){

    }
    snakeMovesLeft(){
        if(this.snake[0].x > 2*this.box){
            for(let i = 0;i < this.snakeLength;i++){
                this.snake[i].x -= this.box;
            }
            this.snakeRender();
        }
    }
    @HostListener('document:keyup') onKeyUp(){
        clearInterval(this.timer);
        if(event.keyCode == 38){
            let snakeHeadObj = {
                x: this.snake[0].x,
                y: this.snake[0].y - this.box
            }
            this.snake.pop();
            this.snake.unshift(snakeHeadObj);
            this.snakeRender();
            snakeHeadObj.y -= this.box;
        }
    }
    animateLeft = () => {
        this.timer = setInterval(() => {
            this.snakeMovesLeft();
        },1000);
    }
    ngAfterViewInit(){
        console.log(this.snakeRef);
        this.ctx = this.snakeRef.nativeElement.getContext('2d');
        this.snakeRef.nativeElement.height = window.innerHeight;
        this.snakeRef.nativeElement.width = window.innerWidth;
        //console.log(this.snakeReference);
        for(let i = 0;i < this.snakeLength;i++){
            this.snake[i] = {
                x: this.box * 18 + i * this.box,
                y : this.box * 15
            }
        }
        for(let i = 0;i < this.snakeLength;i++){
            this.ctx.fillStyle = i == 0 ? 'red' : 'black';
            this.ctx.fillRect(this.snake[i].x,this.snake[i].y,this.box,this.box);
        }
        this.animateLeft();
    }
}