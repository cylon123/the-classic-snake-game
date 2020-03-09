import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SnakeComponent } from './snake-component/snake.component';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit,AfterViewInit{
    @ViewChild('canvas',{static: false}) canvasRef : ElementRef;
     ctx : CanvasRenderingContext2D;
    protected box : number;
    ngAfterViewInit(){
        this.box = 16;
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        this.canvasRef.nativeElement.height = window.innerHeight;
        this.canvasRef.nativeElement.width = window.innerWidth;
        const canvasWidth = this.canvasRef.nativeElement.width;
        const canvasHeight = this.canvasRef.nativeElement.height;
        let canvasWidthDiff = canvasWidth % this.box;
        let canvasHeightDiff = canvasHeight % this.box;
        for(let i = 0;i < canvasWidth - this.box;i = i + this.box){
            for(let j = 0;j < canvasHeight - this.box;j = j + this.box){
                if(i != canvasWidth - canvasWidthDiff - this.box && j != canvasHeight - canvasHeightDiff - this.box){
                    if(i <= this.box || i >= canvasWidth - canvasWidthDiff - 3*this.box || j <= this.box || j >= canvasHeight - canvasHeightDiff- 3*this.box ){
                        this.ctx.beginPath();
                        this.ctx.rect(i,j,this.box,this.box);
                        this.ctx.fillStyle = 'green';
                        this.ctx.fill();
                    }
                    else if((i / this.box) % 2 + (j / this.box) % 2 == 0){
                        this.ctx.beginPath();
                        this.ctx.rect(i,j,this.box,this.box);
                        this.ctx.strokeStyle= 'red';
                        this.ctx.stroke();
                        this.ctx.fillStyle = '#DBF7BD';
                        this.ctx.fill();
                    }
                    else{
                        this.ctx.beginPath();
                        this.ctx.rect(i,j,this.box,this.box);
                        this.ctx.strokeStyle= 'red';
                        this.ctx.stroke();
                        this.ctx.fillStyle = '#E7FAD1';
                        this.ctx.fill();                                 
                    }
                }
                else{
                    this.ctx.fillStyle = 'skyblue';
                    this.ctx.fillRect(i,j,this.box,this.box);
                    
                }
            }
        }
    }
    ngOnInit(){}
}