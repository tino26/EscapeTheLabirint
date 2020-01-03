let template=document.getElementById('app');
let animation=document.getElementById('animation');
let myX=0, myY=0;

const grid=[
	['*', '*', '*', ' ', '*', '*', '*', '*', '*', '*'],
	['*', ' ', ' ', ' ', ' ', ' ', '*', ' ', '*', '*'],
	['*', ' ', ' ', ' ', ' ', '*', '*', ' ', '*', '*'],
	['*', ' ', ' ', ' ', ' ', '*', ' ', ' ', ' ', ' '],
	['*', ' ', ' ', '*', ' ', ' ', ' ', ' ', '*', ' '],
	['*', '*', ' ', ' ', ' ', '*', '*', '*', '*', '*'],
	[' ', '*', '*', ' ', ' ', ' ', ' ', ' ', '*', '*'],
	['*', '*', '*', '*', ' ', '*', ' ', '*', '*', '*'],
	[' ', ' ', ' ', ' ', ' ', '*', ' ', ' ', ' ', '*'],
	['*', ' ', '*', '*', ' ', '*', '*', ' ', '*', '*']
];
let size=40;
let height=grid.length;
let width=grid[0].lenght;
let s=10, t=1;
let dist=[];
let hasToMove=false;

let canvas=document.createElementNS('http://www.w3.org/2000/svg', 'svg');
canvas.setAttribute('width', '600');
canvas.setAttribute('height', '600');

let numExits=0;
let exits=[];
let visited=[];		
for(let i=0; i<10; i++){
	visited[i]=[];
	dist[i]=[];
	for(let j=0; j<10; j++){
		visited[i][j]=false;
	}
}

let start={row:7, col:4};
myX=start.row;
myY=start.col;
visited[start.row][start.col]=true;
let queue=[];
queue.push(start);

while(queue.length>0){
	let element=queue.shift();
	if(element.row+1<=9 && visited[element.row+1][element.col]==false && grid[element.row+1][element.col]!='*'){
		queue.push({row:element.row+1, col:element.col});
		visited[element.row+1][element.col]=true;
		if(element.row+1>=grid.length-1 || element.col==grid[0].length-1 || element.col<=0){
			numExits++;
			exits.push({row:element.row+1, col:element.col});
		}
	}
	if(element.row-1>=0 && visited[element.row-1][element.col]==false && grid[element.row-1][element.col]!='*'){
		queue.push({row:element.row-1, col:element.col});
		visited[element.row-1][element.col]=true;
		if(element.col>=grid[0].length-1 || element.row-1<=0 || element.col<=0){
			numExits++;
			exits.push({row:element.row-1, col:element.col});
		}
	}
	if(element.col+1<=9 && visited[element.row][element.col+1]==false && grid[element.row][element.col+1]!='*'){
		queue.push({row:element.row, col:element.col+1});
		visited[element.row][element.col+1]=true;
		if(element.col+1>=grid[0].length-1 || element.row>=grid.length-1 || element.row<=0){
			numExits++;
			exits.push({row:element.row, col:element.col+1});
		}
	}
	if(element.col-1>=0 && visited[element.row][element.col-1]==false && grid[element.row][element.col-1]!='*'){
		queue.push({row:element.row, col:element.col-1});
		visited[element.row][element.col-1]=true;
		if(element.row>=grid.length-1 || element.row<=0 || element.col-1<=0){
			numExits++;
			exits.push({row:element.row, col:element.col-1});
		}
	}
}

function calcDist(){
    for (let i=0; i<s; ++i){
        for (let j=0; j<s; ++j){
            dist[i][j] = 0;
        }
	}
	//for(let e=0; e<3; e++){
		dist[exits[3].row][exits[3].col] = 1;
		for (let d=1;; ++d){
			let flag = 0;
			for (let i=0; i<s; ++i){
				for (let j=0; j<s; ++j){
					if (dist[i][j] == d){
						if (i>0 && dist[i-1][j]==0 && grid[i-1][j]!='*'){
							dist[i-1][j]=d+1; 
							flag=1;
						}
						if (i<s-1 && dist[i+1][j]==0 && grid[i+1][j]!='*'){
							dist[i+1][j]=d+1; 
							flag=1;
						}
						if (j>0 && dist[i][j-1]==0 && grid[i][j-1]!='*'){
							dist[i][j-1]=d+1; 
							flag=1;
						}
						if (j<s-1 && dist[i][j+1]==0 && grid[i][j+1]!='*'){
							dist[i][j+1]=d+1; 
							flag=1;
						}
					}
				}
			}
			if (!flag){break;}
		}
	//}
}
calcDist();
console.log(dist);
	let player=document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	player.setAttribute('x', myY*40+1);
	player.setAttribute('y', myX*40+1);
	player.setAttribute('width', '40');
	player.setAttribute('height', '40');
	player.setAttribute('style', 'fill:rgb(255, 0, 242);stroke-width:1;stroke:rgb(0,0,0)');
	// canvas.appendChild(player);

    

	for(let i=0; i<grid.length; i++){
		for(let j=0; j<grid[0].length; j++){
			node=document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			node.setAttribute('x', i*size+1);
			node.setAttribute('y', j*size+1);
			node.setAttribute('width', '40');
			node.setAttribute('height', '40');
			if(grid[j][i]=='*'){
				node.setAttribute('style', 'fill:rgb(255,8,0);stroke-width:1;stroke:rgb(0,0,0)');
			}
			if(grid[j][i]==' '){
				node.setAttribute('style', 'fill:rgb(4,255,0);stroke-width:1;stroke:rgb(0,0,0)');
			}
			canvas.appendChild(node);
		}
	}
	
	onkeypress = function() {
		if(event.keyCode==115){
			hasToMove=true;
		}
	};
	setInterval(function (){ 
		if(hasToMove){
			if (t%11==0){
				if(dist[myX][myY]==0){
					console.log("no path");
				}else{
					if (myX>0 && dist[myX-1][myY] == dist[myX][myY]-1){--myX;}
					else if (myX<s-1 && dist[myX+1][myY] == dist[myX][myY]-1){++myX;}
					else if (myY>0 && dist[myX][myY-1] == dist[myX][myY]-1){--myY;}
					else if (myY<s-1 && dist[myX][myY+1] == dist[myX][myY]-1){++myY;}
				}
				player.setAttribute('x', myY*40+1);
				player.setAttribute('y', myX*40+1);
			}
			++t;
		}
		if(dist[myX][myY]==1){hasToMove=false;}
	}, 30);
	
	
canvas.appendChild(player);
template.appendChild(canvas);

// console.log(visited);
console.log(numExits);
console.log(exits);