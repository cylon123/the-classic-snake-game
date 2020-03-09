import { Component, Input, AfterViewInit, ViewChild, ElementRef,HostListener, OnChanges } from '@angular/core';
@Component({
    selector: 'app-snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements AfterViewInit,OnChanges{
    @ViewChild('snake',{static: false}) snakeRef : ElementRef
    box = 16;
    ctx : CanvasRenderingContext2D;
    snakeLength = 6;
    snake = [];
    timer;
    status = false;
    rightBoardExtreme;
    bottomBoardExtreme;
    snakeCurrentMovement;
    displayComponent = true;
    snakeRender(){
        this.ctx.clearRect(0,0,this.snakeRef.nativeElement.width,this.snakeRef.nativeElement.height);
        for(let i = 0;i < this.snakeLength;i++){
            this.ctx.fillStyle = i == 0 ? 'red' : 'black';
            this.ctx.fillRect(this.snake[i].x,this.snake[i].y,this.box,this.box);
        }
    }
    ngOnChanges(){
        console.log(this.snake);
    }
    snakeMovesUp(){
        if(this.snake[0].y > 2*this.box){
            let snakeHeadObj = {
                x: this.snake[0].x,
                y: this.snake[0].y - this.box
            }
            this.snake.pop();
            this.snake.unshift(snakeHeadObj);
            this.snakeRender();
            this.snakeCurrentMovement = 'UP'
        }
    }
    snakeMovesDown(){
        if(this.snake[0].y < this.bottomBoardExtreme){
            let snakeHeadObj = {
                x: this.snake[0].x,
                y: this.snake[0].y + this.box
            }
            this.snake.pop();
            this.snake.unshift(snakeHeadObj);
            this.snakeRender();
            this.snakeCurrentMovement = 'DOWN'
        }
    }
    snakeMovesRight(){
        console.log(this.rightBoardExtreme);
        if(this.snake[0].x < this.rightBoardExtreme){
            let snakeHeadObj = {
                x: this.snake[0].x + this.box,
                y: this.snake[0].y 
            }
            this.snake.pop();
            this.snake.unshift(snakeHeadObj);
            this.snakeRender();
        }
        this.snakeCurrentMovement = 'RIGHT';
    }
    snakeMovesLeft(){
        if(this.snake[0].x > 2*this.box){
            let snakeHeadObj = {
                x: this.snake[0].x - this.box,
                y: this.snake[0].y
            }
            this.snake.pop();
            this.snake.unshift(snakeHeadObj);
            this.snakeRender();
        }
        this.snakeCurrentMovement = 'LEFT';
    }
    animateUp(){
        this.timer = setInterval(() => {
            this.snakeMovesUp();
        },100)
    }
    animateRight(){
        this.timer = setInterval(() => {
            this.snakeMovesRight();
        },100)
    }
    animateDown(){
        this.timer = setInterval(() => {
            this.snakeMovesDown();
        },100)
    }
    @HostListener('document:keydown',['$event']) onKeyUp(event : KeyboardEvent){
        if(event.keyCode == 38 && this.snake[0].y !== 2 * this.box &&this.snakeCurrentMovement!== 'DOWN'){
            clearInterval(this.timer);
            this.animateUp();
        }
        if(event.keyCode == 37 && this.snakeCurrentMovement !== 'RIGHT'){
            clearInterval(this.timer);
            this.animateLeft();
        }
        if(event.keyCode == 39 && this.snakeCurrentMovement !== 'LEFT'){
            clearInterval(this.timer);
            this.animateRight();
        }
        if(event.keyCode == 40 && this.snakeCurrentMovement !== 'UP' ){
            clearInterval(this.timer);
            this.animateDown();
        }
    }
    animateLeft = () => {
        this.timer = setInterval(() => {
            this.snakeMovesLeft();
        },100);
    }
    ngAfterViewInit(){
        console.log(this.snakeRef);
        this.ctx = this.snakeRef.nativeElement.getContext('2d');
        this.snakeRef.nativeElement.height = window.innerHeight;
        this.snakeRef.nativeElement.width = window.innerWidth;
        //console.log(this.snakeReference);
        this.rightBoardExtreme = this.snakeRef.nativeElement.width - this.snakeRef.nativeElement.width%this.box - 4 * this.box;
        this.bottomBoardExtreme = this.snakeRef.nativeElement.height - this.snakeRef.nativeElement.height%this.box - 4*this.box;
        for(let i = 0;i < this.snakeLength;i++){
            this.snake[i] = {
                x: this.box * 18 + i * this.box,
                y : this.box * 12
            }
        }
        if(this.snake[0].x == 2*this.box || this.snake[0].x == this.rightBoardExtreme || this.snake[0].y == this.bottomBoardExtreme || this.snake[0].y == 2*this.box){
            this.displayComponent = false;
            console.log('jwenff');
        }
        console.log(this.snake);
        for(let i = 0;i < this.snakeLength;i++){
            this.ctx.fillStyle = i == 0 ? 'red' : 'black';
            this.ctx.fillRect(this.snake[i].x,this.snake[i].y,this.box,this.box);
        }
        this.animateLeft();
    }
}